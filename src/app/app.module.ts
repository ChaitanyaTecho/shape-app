import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdRadioModule, MdButtonModule, MdDialogModule, MdInputModule} from '@angular/material';
import { FormsModule }   from '@angular/forms';

import {Route, RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { Step1Component, ValidationDialog } from './steps/step1/step1.component';
import { Step2Component, FieldsValidationDialog } from './steps/step2/step2.component';
import { Step3Component } from './steps/step3/step3.component';

const routes: Routes = [
  {
    path: '',
    component: Step1Component,
  },
  {
    path: 'step2/:id',
    component: Step2Component
  },
  {
    path: 'step3/:id1/:id2',
    component: Step3Component
  },
  {
    path : '**',
    component: Step1Component,
  }
];


@NgModule({
  declarations: [
    AppComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    ValidationDialog,
    FieldsValidationDialog
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    MdRadioModule,
    MdButtonModule,
    MdDialogModule,
    MdInputModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  entryComponents: [ValidationDialog, FieldsValidationDialog],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
