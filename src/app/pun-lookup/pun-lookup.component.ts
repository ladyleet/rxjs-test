import { Component, Inject } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { PunService } from '../pun-service.service';
import { SpeechService } from '../speech.service';
import { HeatSensorService } from '../heat-sensor.service';
import { GoogleVisionService } from '../google-vision.service';
import { MdDialog } from '@angular/material';
import { DialogSuggestionComponent } from '../dialog-suggestion/dialog-suggestion.component';

@Component({
  selector: 'app-pun-lookup',
  templateUrl: './pun-lookup.component.html',
  styles: [],
  providers: [
    PunService,
    SpeechService,
    GoogleVisionService,
    HeatSensorService
  ]
})
export class PunLookupComponent {

  openDialog(){
    this.dialog.open(DialogSuggestionComponent)
  }

  keywordsInputChange$ = new Subject<string>();

  listenClick$ = new Subject<void>();

  snapshot$ = new Subject<{ dataURL: string }>();
  
  getDevice$ = new Subject<any>();

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

  temperature$ = this.getDevice$
    .switchMap((_, i) => i % 2 === 0 ? this.heatSensor.getTemperature() : Observable.empty())
    .share();
  
  tempKeyword$ = this.temperature$.map(t => t > 30 ? ['hot'] : ['cold']);

  keyword$ = Observable.merge(
    this.typedKeyword$,
    this.spokenKeyword$,
    this.googleVision$,
    this.tempKeyword$
  ).share();

  punsFound$ = this.keyword$
      .switchMap(keywords => this.puns.getPuns(keywords))


  constructor(
    private puns: PunService, 
    private speech: SpeechService,
    private googleVision: GoogleVisionService,
    private heatSensor:HeatSensorService,
    public dialog : MdDialog
  ) {}
}
