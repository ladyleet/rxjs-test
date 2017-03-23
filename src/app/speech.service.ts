import { Injectable, Inject } from '@angular/core';
import { Observable } from './app.rx';

const SpeechRecognition = window && (
  (<any>window).SpeechRecognition || (<any>window).webkitSpeechRecognition || 
  (<any>window).mozSpeechRecognition || (<any>window).msSpeechRecogntion
);

@Injectable()
export class SpeechService {
  listen(): Observable<string[]> {
    return new Observable<string[]>(observer => {
      const speech = new SpeechRecognition();
      speech.start();

      speech.addEventListener('result', (e: any) => {
        const results: string[] = this.speechResultsToArray(e.results);
        observer.next(results);
        observer.complete();
      });

      return () => {
        speech.abort();
      };
    });
  }

  speechResultsToArray(results: any): string[] {
    return <string[]>(
      Array.from(results)
        .reduce(
          (final: string[], result: any) =>
            final.concat(Array.from(result, (x: any) => x.transcript)),
          []
        )
    );
  }
}


// function initFn(observer) {
//   observer.next('push this out of our observable');
//   observer.complete(); // tell everyone the observable is done
// }

// return new Observable(initFn)
