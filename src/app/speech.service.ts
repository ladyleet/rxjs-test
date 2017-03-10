import { Injectable } from '@angular/core';
import { Observable } from './app.rx';
import { SpeechRecognition } from './SpeechRecognition.service';

@Injectable()
export class SpeechService {
  constructor(private speechRecognition: SpeechRecognition) {

  }
  listen(): Observable<string[]> {
    return new Observable<string[]>(observer => {

    });
  }
}
