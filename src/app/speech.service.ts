import { Injectable, Inject, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// TODO: get this injected properly
const SpeechRecognition = window && (
  (<any>window).SpeechRecognition || (<any>window).webkitSpeechRecognition || 
  (<any>window).mozSpeechRecognition || (<any>window).msSpeechRecogntion
);

@Injectable()
export class SpeechService {
  constructor(private zone: NgZone) {
  }

  listen(): Observable<string[]> {
    return new Observable<string[]>(observer => {
      const speech = new SpeechRecognition();

      const resultHandler = (e: any) => {
        console.log(e);
        const results: string[] = this.cleanSpeechResults(e.results);
        observer.next(results);
        observer.complete();
      };

      const errorHandler = (err) => {
        observer.error(err);
      };

      speech.addEventListener('result', resultHandler);
      speech.addEventListener('error', errorHandler);
      speech.start();

      return () => {
        speech.removeEventListener('result', resultHandler);
        speech.removeEventListener('error', errorHandler);
        speech.abort();
      };
    });
  }

  private cleanSpeechResults(results: any): string[] {
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
