import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from '../app.rx';
import { PunService } from '../pun-service.service';

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
    
    <h3 class="primary-color">Some Punny Suggestions</h3>
    <span>{{suggestedKeywords}}</span>
    
    <h3 class="primary-color">Puns</h3>
    <ul>
      <li *ngFor="let pun of (punsFound$ | async)">
        {{pun}}
      </li>
    </ul>
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
