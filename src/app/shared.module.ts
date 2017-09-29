import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';

import { PageNotFoundComponent } from './page-not-found.component';
import { SpinnerComponent } from './spinner.component';


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    PageNotFoundComponent,
    SpinnerComponent,
  ],
  exports: [
    PageNotFoundComponent,
    SpinnerComponent,
  ]
})
export class SharedModule {}
