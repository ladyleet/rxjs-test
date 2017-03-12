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

    <div>
      <button md-raised-button color="primary" (click)="voiceInput$.next()">
        Say something!
      </button>
    </div>
    
    <h3 class="primary-color">Pun Arsenal...</h3>
    <span class="accent-color">{{suggestedKeywords}}</span>
    
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
    PunService, 
    SpeechService
  ]
})
export class PunLookupComponent {

  suggestedKeywords: string[] = null;

  keywordsInputChange$ = new Subject<string>();
  voiceInput$ = new Subject<void>();

  keywordsFromSpeech$ = this.voiceInput$
    .switchMap(() => this.speech.listen())
  
  keywordsFromTyping$ = this.keywordsInputChange$
    .switchMap(text => this.puns.suggestKeywords(text));

  keyword$ = Observable.merge(this.keywordsFromSpeech$, this.keywordsFromTyping$)
    .do(keywords => this.suggestedKeywords = keywords);

  punsFound$ = this.keyword$
      .switchMap(keywords => this.puns.getPuns(keywords))

  constructor(
    private puns: PunService, private speech: SpeechService
  ) {}
}
