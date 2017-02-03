import { Injectable } from '@angular/core';
import { Observable, asap } from './app.rx';

export interface Pun {
  keywords: string[],
  text: string
}

@Injectable()
export class PunService {

  constructor() { }

  getPuns(keywords: string[]): Observable<Pun> {
    return Observable.of({
      keywords: ['pickle', 'vegetable'],
      text: 'this is a pun about a pickle'
    }, asap);
  }

}
