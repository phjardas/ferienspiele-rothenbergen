import { Component, Input } from '@angular/core';

@Component({
  selector: 'spinner',
  template: '<div class="dot1"></div><div class="dot2"></div>',
  host: {
    'class': 'spinner',
    '[class.inverse]': '!notInverse',
  }
})
export class SpinnerComponent {
  @Input('inverse') notInverse: boolean = true;
}
