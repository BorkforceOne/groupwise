import { Injectable } from '@angular/core';
import { RestError } from '../rest-error';
import {Headers, Http, Response} from '@angular/http';

import '../../rxjs-operators';
import {AlertService} from "../alert/alert.service";
import {Alert} from "../alert/alert";
import {Token} from "./token";

@Injectable()
export class ConsumeTokenService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private tokenUrl = '/api/v1/tokens';  // URL to web api

  constructor(private http: Http, private alertService: AlertService) { }

  consumeToken(tokenString: string): Promise<Token> {
    let token = new Token();
    token.Token = tokenString;

    return this.http
      .post(`${this.tokenUrl}/consume`, JSON.stringify(token), {headers: this.headers})
      .map(this.extractData)
      .toPromise()
      .catch(this.handleError.bind(this));
  }

  private extractData(res: Response) {
    let body = res.json();
    if (Array.isArray(body.Errors) && body.Errors.length > 0)
      throw new RestError(body.Errors);
    if (body.Payload === undefined)
      throw new RestError(["Invalid response"]);
    return new Token().fromJSON(body.Payload);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    const alert = new Alert();
    alert.Text = error.Errors.concat('\n');
    alert.Type = "danger";
    this.alertService.addAlert(alert);
    return Promise.reject(error.message || error);
  }

}
