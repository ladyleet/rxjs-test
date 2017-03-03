import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from '../app.rx';
import { PunService } from '../pun-service.service';

@Component({
  selector: 'app-pun-lookup',
  template: `
    <input #keywords type="text" 
      (input)="keywordsInputChange$.next(keywords.value)"/>
    <hr/>
    <h3>keywords suggested</h3>
    <span>{{suggestedKeywords}}</span>
    <h3>actual puns</h3>
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
