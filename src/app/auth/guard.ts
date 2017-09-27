import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthenticationService } from './authentication.service';


function hasAnyRole(roles: string[], requiredRoles: string[]): boolean {
  return roles.some(role => requiredRoles.indexOf(role) >= 0);
}


@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthenticationService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const roles = route.data.roles || [];
    return this.auth.user.first().map(user => user && hasAnyRole(user.roles, roles));
  }
}
