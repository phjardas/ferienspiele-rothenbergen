import { Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AuthenticationService, AuthenticationProvider, User } from './authentication.service';


@Component({
  selector: 'main-menu',
  templateUrl: './main-menu.component.html'
})
export class MainMenuComponent implements OnDestroy {
  subscription: Subscription;
  user: User;
  authenticationProviders: AuthenticationProvider[];

  constructor(private authenticationService: AuthenticationService) {
    this.subscription = authenticationService.user.subscribe(user => this.user = user);
    this.authenticationProviders = authenticationService.providers;
  }

  signout() {
    this.authenticationService.signout();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
