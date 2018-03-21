import { Component } from '@angular/core';

@Component({
  selector: 'page-not-found',
  template: `<div class="jumbotron jumbotron-fluid">
    <div class="container">
      <h2 class="display-3">
        <i class="fa fa-frown-o mr-1"></i>
        Hoppla…
      </h2>
      <p class="lead">Tut uns sehr leid, aber diese Seite gibt es nicht.</p>
    </div>
  </div>`,
})
export class PageNotFoundComponent {}
