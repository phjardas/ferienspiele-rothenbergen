import { Component } from '@angular/core';

@Component({
  selector: 'spinner',
  template: '<div><div class="dot1"></div><div class="dot2"></div></div>',
  host: { 'class': 'spinner' }
})
export class SpinnerComponent {
}
