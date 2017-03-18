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

  private SpeechRecognition = SpeechRecognition;

  isSupported(): boolean {
    return Boolean(this.SpeechRecognition);
  }

  listen(): Observable<string[]> {
    const { SpeechRecognition } = this;

    return new Observable<string[]>(observer => {
      const speech = new SpeechRecognition();

      speech.onresult = (e: any) => {
        // since Angular doesn't wrap SpeechRecognition, we have to handle zones ourselves
        this.zone.run(() => {
          const results: string[] = <string[]>(
            Array.from(e.results)
              .reduce(
                (final: string[], result: any) =>
                  final.concat(Array.from(result, (x: any) => x.transcript)),
                []
              )
          );
          observer.next(results);
          observer.complete();
        });
      };

      speech.start();
      return () => {
        speech.abort();
      };
    });
  }
}
