import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Shapes } from '../shapes';

@Injectable()
export class StepsService {

  constructor(private _http : Http) { }

  // Get Shape Data
  getShapesData() : Observable<Shapes[]>{

    const headers = new Headers();
    const options = new RequestOptions({ headers: headers });
    headers.append('content-type', 'application/json');

    const SHAPES : string = '../../assets/shapes.json';

    return this._http.get(SHAPES, options)
                     .map(this.extractData)
                     .catch(this.handleError);
  }

  // Data Extraction
  private extractData(res: Response | any) {
    let body = res.json();
    return body || {};
  }

  // Error Handling
  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
