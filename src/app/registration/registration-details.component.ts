import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/fromPromise';

import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { environment } from '../../environments/environment';

import { RegistrationService } from '../registration.service';
import { Registration } from '../model';

@Component({
  templateUrl: 'registration-details.component.html',
})
export class RegistrationDetailsComponent implements OnDestroy {
  subscription: Subscription;
  loaded: boolean;
  reg: Registration;
  registrationDeadline: string;
  waiverDeadline: string;
  paypalConfig = environment.paypal;
  private paymentMethod = this.paypalConfig.enabled ? 'paypal' : 'transfer';
  private paypalButton: Observable<any>;
  private paypalButtonRendered = false;

  constructor(private route: ActivatedRoute, private registrationService: RegistrationService) {
    const regObs = route.paramMap.mergeMap(params => this.registrationService.getRegistration(params.get('id')));
    this.subscription = regObs.subscribe(reg => {
      this.reg = reg;
      this.loaded = true;
    });
    this.subscription.add(registrationService.registrationDeadline.subscribe(d => (this.registrationDeadline = d)));
    this.subscription.add(registrationService.waiverDeadline.subscribe(d => (this.waiverDeadline = d)));
    this.subscription.add(
      regObs
        .filter(reg => reg != null)
        .filter(reg => !reg.payment)
        .subscribe(_ => this.renderPaypalButton())
    );
  }

  printWaiver() {
    this.registrationService.getWaiver(this.reg).then(blob => {
      const { document } = window;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Einverständniserklärung ${this.reg.child.firstName} ${this.reg.child.lastName}.pdf`;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }

  private loadPaypalButton(url: string): Observable<any> {
    if (!this.paypalConfig.enabled) {
      return Observable.empty();
    }

    if (!this.paypalButton) {
      this.paypalButton = Observable.fromPromise(
        new Promise(resolve => {
          const el = document.createElement('script');
          el.src = url;
          el.onload = () => resolve((window as any).paypal);
          document.body.appendChild(el);
        })
      );
    }

    return this.paypalButton;
  }

  private renderPaypalButton() {
    if (this.paypalButtonRendered) return;
    this.paypalButtonRendered = true;

    this.loadPaypalButton('https://www.paypalobjects.com/api/checkout.js').subscribe(({ Button }) => {
      const env = this.paypalConfig.environment;

      Button.render(
        {
          env: env,
          client: {
            [env]: environment.paypal.clientId,
          },
          commit: true,
          locale: 'de_DE',
          style: {
            color: 'blue',
            shape: 'rect',
          },
          payment: (data, actions) => {
            const payment = {
              payment: {
                transactions: [
                  {
                    amount: { total: this.reg.price.total, currency: 'EUR' },
                    purchase_order: this.reg.id,
                    description: `Teilnahmebeitrag für ${this.reg.child.firstName} ${this.reg.child.lastName}`,
                  },
                ],
              },
            };
            return actions.payment.create(payment);
          },
          onAuthorize: (data, actions) => {
            return actions.payment.execute().then(payment => {
              this.registrationService.handlePaypalPayment(this.reg.id, payment);
            });
          },
        },
        '#paypal-button'
      );
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
