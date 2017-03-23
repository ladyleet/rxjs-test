import { Component, Inject } from '@angular/core';
import { Subject, Observable } from '../app.rx';
import { PunService } from '../pun-service.service';
import { SpeechService } from '../speech.service';

@Component({
  selector: 'app-pun-lookup',
  template: `
    <span>
      <h3 class="primary-color">Search for Puns</h3>
    </span>
    <md-input-container>
      <input #keywords type="text" mdInput
        autofocus="true"
        placeholder="Enter keyword"
        (input)="keywordsInputChange$.next(keywords.value)"/>
    </md-input-container>
    
    <button md-raised-button color="primary" (click)="listenClick$.next()">Say something!</button>
    <h3 class="primary-color">Pun Arsenal...</h3>
    <span class="accent-color">{{keyword$ | async}}</span>
    
    <h3 class="primary-color">Puns Found</h3>
    <md-card *ngFor="let pun of (punsFound$ | async)">
      <md-card-content>
        {{pun?.pun}}
        {{pun?.answer}}
      </md-card-content>
    </md-card>
  `,
  styles: [],
  providers: [
    PunService, SpeechService
  ]
})
export class PunLookupComponent {
  keywordsInputChange$ = new Subject<string>();
  listenClick$ = new Subject<void>();

  keywordsFromText$ = this.keywordsInputChange$
    .do(x => console.log(x))
    .switchMap(text => this.puns.suggestKeywords(text));

  keywordsFromSpeech$ = this.listenClick$
    .switchMap(() => this.speechservice.listen());

  keyword$ = Observable.merge(
    this.keywordsFromText$,
    this.keywordsFromSpeech$
  ).share();
  
  punsFound$ = this.keyword$
      .switchMap(keywords => this.puns.getPuns(keywords))

  constructor(
    private puns: PunService, private speechservice: SpeechService
  ) {}
}
