import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.subscription = authenticationService.user.subscribe(user => (this.user = user));
    this.authenticationProviders = authenticationService.providers;
  }

  signout() {
    this.authenticationService.signout();
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
