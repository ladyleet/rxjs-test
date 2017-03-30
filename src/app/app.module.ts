import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import 'hammerjs';

import { AppComponent } from './app.component';
import { PunLookupComponent } from './pun-lookup/pun-lookup.component';
import { SnapshotCameraComponent } from './snapshot-camera/snapshot-camera.component';

// add RxJS operators
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/empty';
import { DialogSuggestionComponent } from './dialog-suggestion/dialog-suggestion.component';

@NgModule({
  declarations: [
    AppComponent,
    PunLookupComponent,
    SnapshotCameraComponent,
    DialogSuggestionComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot()
  ],
  entryComponents: [DialogSuggestionComponent],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
