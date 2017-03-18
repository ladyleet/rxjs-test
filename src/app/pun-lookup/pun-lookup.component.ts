import { Component, Inject } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { PunService } from '../pun-service.service';
import { SpeechService } from '../speech.service';
import { GoogleVisionService } from '../google-vision.service';

@Component({
  selector: 'app-pun-lookup',
  template: `
    <span>
      <h3 class="primary-color">Search for Puns</h3>
    </span>
    <md-input-container>
      <input #keywords type="text" mdInput
        autofocus="true"
        placeholder="Enter keyword"
        (input)="keywordsInputChange$.next(keywords.value)"/>
    </md-input-container>

    <div *ngIf="speech.isSupported()">
      <button (click)="listenClick$.next()">Listen</button>
    </div>

    <div>
      <app-snapshot-camera [width]="400" [height]="400" (snapshot)="snapshot$.next($event)"></app-snapshot-camera>
    </div>
    
    <h3 class="primary-color">Pun Arsenal...</h3>
    <span class="accent-color">{{suggestedKeywords}}</span>
    
    <h3 class="primary-color">Puns Found</h3>
    <md-card *ngFor="let pun of (punsFound$ | async)">
      <md-card-content>
        {{pun?.pun}}
        {{pun?.answer}}
      </md-card-content>
    </md-card>
  `,
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
