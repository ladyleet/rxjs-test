import { Component, OnInit } from '@angular/core';
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
  providers: [ PunService ]
})
export class PunLookupComponent implements OnInit {

  suggestedKeywords: string[] = null;

  keywordsInputChange$ = new Subject<string>();

  suggestedKeyword$ = this.keywordsInputChange$
    .switchMap(text => this.puns.suggestKeywords(text));

  punsFound$ = this.suggestedKeyword$
      .do(keywords => this.suggestedKeywords = keywords)
      .switchMap(keywords => this.puns.getPuns(keywords))

  constructor(private puns: PunService) { 
  }

  ngOnInit() {
  }

}
