import { Component, Inject } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { PunService } from '../pun-service.service';
import { SpeechService } from '../speech.service';

@Component({
  selector: 'app-pun-lookup',
  templateUrl: './pun-lookup.component.html',
  styles: [],
  providers: [
    PunService,
    SpeechService
  ]
})
export class PunLookupComponent {

  keywordsInputChange$ = new Subject<string>();

  listenClick$ = new Subject<void>();

  spokenKeyword$ = this.listenClick$
    .switchMap(() => this.speech.listen())

  typedKeyword$ = this.keywordsInputChange$
    .switchMap(text => this.puns.suggestKeywords(text));

  keyword$ = Observable.merge(
    this.typedKeyword$,
    this.spokenKeyword$
  ).share();

  punsFound$ = this.keyword$
      .switchMap(keywords => this.puns.getPuns(keywords))

  constructor(
    private puns: PunService, 
    private speech: SpeechService,
  ) {}
}
