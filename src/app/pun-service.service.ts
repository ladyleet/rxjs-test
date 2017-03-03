import { Injectable } from '@angular/core';
import { Observable, asap } from './app.rx';

const data = {
  keywords: {
    'pickle': [1, 2],
    'hat': [0, 2]
  },
  puns: {
    '0': 'this is a pun about a hat',
    '1': 'this is a pun about a pickle',
    '2': 'this is a pun about a pickle and a hat'
  },
}

@Injectable()
export class PunService {

  constructor() { }

  getPuns(keywords: string[]): Observable<string[]> {
    if (!keywords || keywords.length === 0) {
      return Observable.of([]);
    }

    const found = keywords.reduce((found, keyword) => {
      const ids = data.keywords[keyword];
      if (ids) {
        return ids.reduce((found, id) => {
          found[id] = data.puns[id];
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
      Object.keys(data.keywords)
        .filter(keyword => keyword.indexOf(partial) === 0)
    );
  }
}
