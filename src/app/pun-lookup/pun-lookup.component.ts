import { Component, Inject } from '@angular/core';
import { Subject, Observable } from '../app.rx';
import { PunService } from '../pun-service.service';

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

    <md-input-container>
      <input #mykeywords type="text" mdInput 
      autofocus="true"
        placeholder="Enter keyword" 
        (input)="keywordsInputChange2$.next(mykeywords.value)"/>
    </md-input-container>
    
    <h3 class="primary-color">Pun Arsenal...</h3>
    <span class="accent-color">{{suggestedKeywords}}</span>

    <h3 class="primary-color">Pun Arsenal...</h3>
    <span class="accent-color">{{suggestedKeywords2}}</span>
    
    <h3 class="primary-color">Puns Found</h3>
    <md-card *ngFor="let pun of (punsFound$ | async)">
      <md-card-content>
        {{pun?.pun}}
        {{pun?.answer}}
      </md-card-content>
    </md-card>

    <md-card *ngFor="let pun of (punsFound2$ | async)">
      <md-card-content>
        {{pun?.pun}}
        {{pun?.answer}}
      </md-card-content>
    </md-card>
  `,
  styles: [],
  providers: [
    PunService
  ]
})
export class PunLookupComponent {

  suggestedKeywords: string[] = null;
  suggestedKeywords2: string[] = null;

  keywordsInputChange$ = new Subject<string>();
  keywordsInputChange2$ = new Subject<string>();

  keyword2$ = this.keywordsInputChange2$
    .switchMap(text => this.puns.suggestKeywords(text))
    .do(keywords => this.suggestedKeywords2 = keywords);

  punsFound2$ = this.keyword2$ 
    .switchMap(keywords => this.puns.getPuns(keywords))

  keyword$ = this.keywordsInputChange$
    .switchMap(text => this.puns.suggestKeywords(text))
    .do(keywords => this.suggestedKeywords = keywords);

  punsFound$ = this.keyword$
      .switchMap(keywords => this.puns.getPuns(keywords))

  constructor(
    private puns: PunService
  ) {}
}
