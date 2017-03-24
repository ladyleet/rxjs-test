import { Component, Inject } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { PunService } from '../pun-service.service';

@Component({
  selector: 'app-pun-lookup',
  templateUrl: './pun-lookup.component.html',
  styles: [],
  providers: [
    PunService
  ]
})
export class PunLookupComponent {

  keywordsInputChange$ = new Subject<string>();

  keyword$ = this.keywordsInputChange$
    .switchMap(text => this.puns.suggestKeywords(text))
    .share();

  punsFound$ = this.keyword$
      .switchMap(keywords => this.puns.getPuns(keywords))

  constructor(
    private puns: PunService
  ) {}
}
