import { Component, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AuthenticationService, AuthenticationProvider, User } from './auth';

@Component({
  selector: 'main-menu',
  templateUrl: './main-menu.component.html',
})
export class MainMenuComponent implements OnDestroy {
  subscription: Subscription;
  user: User;
  authenticationProviders: AuthenticationProvider[];
  visible: Observable<boolean>;

  constructor(private authenticationService: AuthenticationService, private router: Router, route: ActivatedRoute) {
    this.subscription = authenticationService.user.subscribe(user => (this.user = user));
    this.authenticationProviders = authenticationService.providers;
    this.visible = router.events.filter(evt => evt instanceof NavigationEnd).map((evt: NavigationEnd) => !evt.url.match(/^\/(#.+)?$/));
  }

  signout() {
    this.authenticationService.signout();
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
