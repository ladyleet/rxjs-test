import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MatToolbarModule, MatIconModule, MatMenuModule, MatDialogModule, MatCardModule, MatInputModule, MatButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { PunLookupComponent } from './pun-lookup/pun-lookup.component';
import { SnapshotCameraComponent } from './snapshot-camera/snapshot-camera.component';
import { DialogSuggestionComponent } from './dialog-suggestion/dialog-suggestion.component';


@NgModule({
  declarations: [
    AppComponent,
    PunLookupComponent,
    SnapshotCameraComponent,
    DialogSuggestionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule
  ],
  entryComponents: [DialogSuggestionComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
