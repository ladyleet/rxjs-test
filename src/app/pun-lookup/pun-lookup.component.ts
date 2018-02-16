import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { PunService } from '../pun-service.service';
import { SpeechService } from '../speech.service';
import { GoogleVisionService } from '../google-vision.service';
import { MatDialog } from '@angular/material';
import { DialogSuggestionComponent } from '../dialog-suggestion/dialog-suggestion.component';

import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/share';

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

  openDialog(){
    this.dialog.open(DialogSuggestionComponent)
  }

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
  ).share();

  punsFound$ = this.keyword$
      .switchMap(keywords => this.puns.getPuns(keywords))

  constructor(
    private puns: PunService,
    private speech: SpeechService,
    private googleVision: GoogleVisionService,
    public dialog : MatDialog
  ) {}
}
