import { Component, OnInit } from '@angular/core';
import { StepsService } from '../steps.service';
import { Shapes } from '../../shapes';
import {MdDialog, MdDialogRef} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'sa-step1',
  template: `
    <h2>Step 1 : Select your Shape</h2>
    <p>Please select the shape that you would like to calculate the area of and press the button "Go to step 2"</p>
    <md-radio-group class="example-radio-group" [(ngModel)]="selectedShapeName">
      <md-radio-button class="example-radio-button" *ngFor="let shape of shapes" [value]="shape.name">
        {{shape.name}}
      </md-radio-button>
    </md-radio-group>
    <div class="button-row">
      <button md-raised-button (click)="goToNextStep(selectedShapeName)">Go to Step 2</button>
      <span class="or">or</span>
      <button md-raised-button (click)="selectedShapeName = undefined">Cancel</button>
    </div>
  `,
  styles : [`
  .example-radio-group {
    display: inline-flex;
    flex-direction: column;
  }

  .example-radio-button {
    margin: 5px;
    font-family: 'Josefin Sans', sans-serif;
  }
  .example-selected-value {
    margin: 15px 0;
  }
  
  `],
  providers : [StepsService]
})
export class Step1Component implements OnInit {
  private shapes : Shapes[];
  public selectedShapeName : string;
  constructor(private _stepsService : StepsService, public dialog: MdDialog, private router: Router) { }

  ngOnInit() {
    this._stepsService.getShapesData().subscribe(
      (res) => {
        this.shapes = res;
      }
    );
  }

  goToNextStep(selectedShapeName){
    this.selectedShapeName = selectedShapeName;
    if(this.selectedShapeName === undefined || this.selectedShapeName === '' || this.selectedShapeName == null){
      this.dialog.open(ValidationDialog);
    }else{
      this.router.navigate(['/step2',this.selectedShapeName]);
    }
  }
}

@Component({
  selector: 'validation-dialog',
  template: `
  <p>Please select Shape</p>
  `,
})
export class ValidationDialog {
  constructor(public dialogRef: MdDialogRef<ValidationDialog>) {}
}