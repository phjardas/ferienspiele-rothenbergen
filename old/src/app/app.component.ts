import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from 'firebase/app';

import { version } from '../environments/version';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  host: { class: '' },
})
export class AppComponent {
  version = version;
}
