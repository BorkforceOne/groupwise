import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import {Headers, Http, Response} from "@angular/http";
import {RestError} from "../rest-error";

@Injectable()
export class ConfigService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private configUrl = '/api/v1/config';  // URL to web api

  constructor(private http: Http) { }

  getValue(key): Observable<any> {
    return this.http.get(`${this.configUrl}/${key}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  setValue(key: string, value: any): Promise<any> {
    return this.http
      .post(`${this.configUrl}/${key}`, JSON.stringify({Value: value}), {headers: this.headers})
      .map(this.extractData)
      .toPromise()
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    if (Array.isArray(body.Errors) && body.Errors.length > 0)
      throw new RestError(body.Errors);
    if (body.Payload === undefined)
      throw new RestError(["Invalid response"]);
    return body.Payload;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
