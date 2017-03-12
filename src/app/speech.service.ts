import { Injectable, Inject, NgZone } from '@angular/core';
import { Observable } from './app.rx';

// TODO: get this injected properly
const SpeechRecognition = window && (
  (<any>window).SpeechRecognition || (<any>window).webkitSpeechRecognition || 
  (<any>window).mozSpeechRecognition || (<any>window).msSpeechRecogntion
);

function speechResultsToArray(results): string[] {
  return <string[]>(
    Array.from(results)
      .reduce(
        (final: string[], result: any) =>
          final.concat(Array.from(result, (x: any) => x.transcript)),
        []
      )
  );
}

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
      // create an instance of SpeechRecognition
      const speech = new SpeechRecognition();

      // set up a function to be called when speech recognition gives us results
      speech.onresult = (e: any) => {
        // since Angular doesn't wrap SpeechRecognition, we have to handle zones ourselves
        this.zone.run(() => {
          // scrub ugly result tree into an array of strings
          const listOfWhatGoogleThinksWeSaid = speechResultsToArray(e.results);
          // emit the array of strings from our observable
          observer.next(listOfWhatGoogleThinksWeSaid);
          
          // tell everyone our observable is done
          observer.complete();
        });
      };


      // start listening for talking
      speech.start();

      return () => {
        // if unsubscribe happens before speech responds, kill it.
        speech.abort();
      };
    });
  }
}
