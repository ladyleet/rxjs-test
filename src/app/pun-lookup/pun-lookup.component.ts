import { Component, Inject } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { PunService } from '../pun-service.service';
import { SpeechService } from '../speech.service';
import { GoogleVisionService } from '../google-vision.service';

@Component({
  selector: 'app-pun-lookup',
  templateUrl: './pun-lookup.component.html',
  styles: [],
  providers: [
    PunService,
    SpeechService,
    GoogleVisionService
  ]
})
export class PunLookupComponent {

  suggestedKeywords: string[] = null;

  keywordsInputChange$ = new Subject<string>();

  listenClick$ = new Subject<void>();

  snapshot$ = new Subject<{ dataURL: string }>();

  googleVision$ = this.snapshot$
    .map(e => {
      const dataURLHeader = 'data:image/png;base64,';
      const base64Image = e.dataURL.substr(dataURLHeader.length);
      return base64Image;
    })
    .switchMap(base64Image => this.googleVision.annotateImage(base64Image));

  spokenKeyword$ = this.listenClick$
    .switchMap(() => this.speech.listen())

  typedKeyword$ = this.keywordsInputChange$
    .switchMap(text => this.puns.suggestKeywords(text));

  keyword$ = Observable.merge(
    this.typedKeyword$,
    this.spokenKeyword$,
    this.googleVision$
  );

  punsFound$ = this.keyword$
      .do(keywords => this.suggestedKeywords = keywords)
      .switchMap(keywords => this.puns.getPuns(keywords))

  constructor(
    private puns: PunService, 
    private speech: SpeechService,
    private googleVision: GoogleVisionService
  ) {}
}
