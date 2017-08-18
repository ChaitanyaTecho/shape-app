import { ActivatedRoute, Route, Router } from '@angular/router';
import { Component, OnDestroy, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sa-step3',
  template: `
    <h2>Step 3 : Your Result</h2>
    <p>You have selected {{shapeName}}. Below is your result:</p>
    <div class="result-box">
      The area is {{areaCalculated}}.
    </div>
    <div class="button-row">
      <button md-raised-button (click)="goBack()">Start over</button>
    </div>
  `,
  styles: [`
  .result-box {
    display: flex;
    height: 200px;
    align-items: center;
    justify-content: center;
    font-size: 30px;
  }
  `]
})
export class Step3Component implements OnInit, OnDestroy {
  // @Input() private areaCalculated : number;
  private areaCalculated : number;
  private shapeName : string;
  private sub: any;
  constructor(private route: ActivatedRoute, private router : Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.areaCalculated = params['id1'];
       this.shapeName = params['id2'];
    });    
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  goBack(){
    this.router.navigate(['/step1']);
  }

}
