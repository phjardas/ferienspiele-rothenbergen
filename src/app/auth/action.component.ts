import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  template: `<reset-password [code]="code" *ngIf="mode === 'resetPassword'"></reset-password>`
})
export class ActionComponent {
  mode: string;
  code: string;

  constructor(router: Router, route: ActivatedRoute) {
    route.queryParams.subscribe(params => {
      this.mode = params.mode;
      this.code = params.oobCode;
    });
  }
}
