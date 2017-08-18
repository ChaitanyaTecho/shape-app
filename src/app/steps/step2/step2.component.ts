import { Shapes } from '../../shapes';
import { StepsService } from '../steps.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MdDialog, MdDialogRef} from '@angular/material';

@Component({
  selector: 'sa-step2',
  template: `
    <h2>Step 2 : Insert your Values</h2>
    <p>You have selected a <strong>{{shapeName}}</strong>, Please input the required variables.</p>
    <p>{{shapeName}} Area = <span [innerHTML]="areaFormula"></span></p>
    <div class="input-container">
      <div class="input-box" *ngFor="let inp of inputs; let ind= 'index'">
        <md-input-container class="example-full-width">
          <input id="ai{{ind}}" [(ngModel)]= "ai[ind]" mdInput placeholder="{{inp}}" type="number" required >
        </md-input-container>
      </div>
    </div>
    <div class="button-row">
      <button md-raised-button (click)="goToNextStep(ai)">Go to Step 3</button>
      <span class="or">or</span>
      <button md-raised-button (click)="ai = {}">Cancel</button>
      <span class="or">or</span>
      <button md-raised-button (click)="goBack()">Go to Step 1</button>
    </div>
    <!-- <sa-step3 [areaCalculated]="areaCalculated"></sa-step3> -->
  `,
  providers : [StepsService]
})
export class Step2Component implements OnInit, OnDestroy {

  private sub: any;
  public ai: any = {};
  private shapeName : string;
  private areaFormula : string;
  private areaCalculated : any;
  private selectedShape : any;
  private inputs : any;
  private shapes : Shapes[];

  constructor(private route: ActivatedRoute, private _stepsService : StepsService, public dialog: MdDialog, private router: Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.shapeName = params['id'];
    });
    
    this._stepsService.getShapesData().subscribe(
      (res) => {
        this.shapes = res;
        // checking key and value of name should be equal
        this.selectedShape = this.shapes.filter(shape => Object.keys(shape)[2] == this.shapeName);
        this.inputs = this.selectedShape[0][this.shapeName];
        this.areaFormula = this.selectedShape[0]['formula'];
        // console.log(this.inputs);
      });
  }

  goToNextStep(ai){
    if(Object.keys(ai).length === this.inputs.length ){
      this.areaCalculated = 1;
      let vals = this.areaFormula.split(' * ');
      for(let i =0; i < this.inputs.length; i++){
          if(this.shapeName === 'Circle' || this.shapeName === 'Square'){
            this.areaCalculated = this.areaCalculated*parseInt(ai[i])*parseInt(ai[i]);
            console.log(this.areaCalculated);
          }else{
            this.areaCalculated = this.areaCalculated*parseInt(ai[i]);
          }
      }
        
      if(vals[0] === 'pi'){
        this.areaCalculated = this.areaCalculated*Math.PI;
        console.log(this.areaCalculated);
        this.areaCalculated = this.areaCalculated.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
        console.log(this.areaCalculated);
      }
      this.router.navigate(['/step3', this.areaCalculated, this.shapeName]);
    }else{
      this.dialog.open(FieldsValidationDialog);
    }
    
  }
  goBack(){
    this.router.navigate(['/step1']);
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}


@Component({
  selector: 'fields-validation-dialog',
  template: `
  <p>Please fill all fields.</p>
  `,
})
export class FieldsValidationDialog {
  constructor(public dialogRef: MdDialogRef<FieldsValidationDialog>) {}
}