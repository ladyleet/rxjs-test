import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { SpeechRecognition, SpeechRecognitionToken } from './speech-recognition.service';
import 'hammerjs';

import { AppComponent } from './app.component';
import { PunLookupComponent } from './pun-lookup/pun-lookup.component';

@NgModule({
  declarations: [
    AppComponent,
    PunLookupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot()
  ],
  providers: [
    { provide: SpeechRecognitionToken, useValue: SpeechRecognition }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
