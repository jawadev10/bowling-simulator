import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from "@angular/forms";
import {BowlingSimulatorComponent} from './bowling-simulator/bowling-simulator.component';
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {CommonModule} from "@angular/common";
import {MatTableModule} from "@angular/material/table";
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from "@angular/material/dialog";
import { GameFinishedDialogComponent } from './bowling-simulator/game-finished-dialog/game-finished-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    BowlingSimulatorComponent,
    GameFinishedDialogComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
