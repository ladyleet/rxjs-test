import { Component, Inject } from '@angular/core';
import { Subject, Observable } from '../app.rx';
import { PunService } from '../pun-service.service';
import { SpeechService } from '../speech.service';

@Component({
  selector: 'app-pun-lookup',
  template: `
    <span>
      <h3 class="primary-color">Search for puns by keyword</h3>
    </span>
    <md-input-container>
      <input #keywords type="text" mdInput
        autofocus="true"
        placeholder="Enter a keyword"
        (input)="keywordsInputChange$.next(keywords.value)"/>
    </md-input-container>

    <div *ngIf="speech.isSupported()"><button (click)="listenClick$.next()">Listen</button></div>
    
    <h3 class="primary-color">Some Punny Suggestions</h3>
    <span class="accent-color">{{suggestedKeywords}}</span>
    
    <h3 class="primary-color">Puns</h3>
    <md-card *ngFor="let pun of (punsFound$ | async)">
      <md-card-content>
        {{pun?.pun}}
        {{pun?.answer}}
      </md-card-content>
    </md-card>
  `,
  styles: [],
  providers: [
    PunService,
    SpeechService
  ]
})
export class PunLookupComponent {

  suggestedKeywords: string[] = null;

  keywordsInputChange$ = new Subject<string>();

  listenClick$ = new Subject<void>();

  spokenKeyword$ = this.listenClick$
    .switchMap(() => this.speech.listen())

  typedKeyword$ = this.keywordsInputChange$
    .switchMap(text => this.puns.suggestKeywords(text));

  keyword$ = Observable.merge(
    this.typedKeyword$,
    this.spokenKeyword$
  );

  punsFound$ = this.keyword$
      .do(keywords => this.suggestedKeywords = keywords)
      .switchMap(keywords => this.puns.getPuns(keywords))

  constructor(
    private puns: PunService, 
    private speech: SpeechService
  ) {}
}
