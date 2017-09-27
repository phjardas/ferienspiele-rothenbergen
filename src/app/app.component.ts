import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from 'firebase/app';

import { version } from '../environments/version';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  version = version;
}
