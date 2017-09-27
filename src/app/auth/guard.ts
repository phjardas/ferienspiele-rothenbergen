import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, Route, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthenticationService } from './authentication.service';


function hasAnyRole(roles: string[], requiredRoles: string[]): boolean {
  return roles.some(role => requiredRoles.indexOf(role) >= 0);
}


@Injectable()
export class RoleGuard implements CanActivate, CanLoad {
  constructor(private auth: AuthenticationService, private router: Router) {}

  private hasAnyRole(roles: string[]): Observable<boolean> {
    return this.auth.user
      .first()
      .map(user => user && hasAnyRole(user.roles, roles));
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.hasAnyRole(route.data.roles || [])
      .do(ok => {
        if (!ok) this.router.navigate(['/login'], { queryParams: { from: route.url }});
      });
  }

  canLoad(route: Route): Observable<boolean> {
    return this.hasAnyRole(route.data.roles || []);
  }
}
