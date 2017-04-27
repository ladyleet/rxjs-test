import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { asap } from 'rxjs/scheduler/asap';
import { Http } from '@angular/http';

export interface Pun {
  pun: string,
  answer: string
};

@Injectable()
export class PunService {

  constructor(private http: Http) { }

  suggestKeywords(partial: string): Observable<string[]> {
    return this.http.get(`https://localhost:4201/suggest-keywords?q=${partial}`)
      .map(res => res.json())
      .catch(err => {
        console.error(err);
        return Observable.empty();
      });;
  }

  getPuns(kwds: string[]): Observable<Pun[]> {
    const serialized = kwds.join(',');
    return this.http.get(`https://localhost:4201/puns?q=${serialized}`)
      .map(res => res.json())
      .catch(err => {
        console.error(err);
        return Observable.empty();
      });
  }
}