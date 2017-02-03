import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from '../app.rx';

@Component({
  selector: 'app-pun-lookup',
  template: `
    <input #keywords type="text" 
      (input)="keywordsInputChange$.next(keywords.value)"/>
    <hr/>
    <div>{{foo$ | async}}</div>
  `,
  styles: []
})
export class PunLookupComponent implements OnInit {

  keywordsInputChange$ = new Subject<string>();

  foo$ = this.keywordsInputChange$
      .map(x => x[x.length - 1] === 'f' ? '' : x + '!')
      // .filter(x => x.indexOf('f') === -1)
      // .map(x => x + '!');


  constructor() { 
  }

  ngOnInit() {
  }

}
