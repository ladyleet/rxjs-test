import { Injectable } from '@angular/core';
import { Observable, asap } from './app.rx';

export interface Pun {
  pun: string,
  answer: string
};

const keywords = {
  'banana': [0, 13, 14, 15, 16],
  'cheese': [3, 4, 5, 6, 7, 8, 12],
  'bird': [3, 11, 12, 1],
  'hotel': [4, 9, 10, 11],
  'mexican': [6], 
  'cow': [12]
};


const puns = {
  '0': {
    pun: 'My wife has banana diet',
    answer: 'She hasnt lost weight, but you should see her climb trees now!'
  },
  '1': { 
    pun: 'Id make a pun about a chicken...', 
    answer: 'But it would be fowl'
  },
  '2': {
    pun: 'this is a pun about a pickle and a hat', 
    answer: 'answer'
  }
};

@Injectable()
export class PunService {

  constructor() { }

  getPuns(kwds: string[]): Observable<Pun[]> {
    if (!kwds || kwds.length === 0) {
      return Observable.of([]);
    }
    const found = kwds.reduce((found, keyword) => {
      const ids = keywords[keyword];
      if (ids) {
        return ids.reduce((found, id) => {
          found[id] = puns[id];
          return found;
        }, found);
      }
      return found;
    }, {});

    return Observable.of(Object.keys(found).map(key => found[key]));
  }

  suggestKeywords(partial: string): Observable<string[]> {
    if (!partial) {
      return Observable.of([]);
    }

    return Observable.of(
      Object.keys(keywords)
        .filter(keyword => keyword.indexOf(partial) === 0)
    );
  }
}
