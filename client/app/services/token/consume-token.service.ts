import { Injectable } from '@angular/core';
import { RestError } from '../rest-error';
import {Headers, Http, Response} from '@angular/http';

import '../../rxjs-operators';
import {AlertService} from "../alert/alert.service";
import {Alert} from "../alert/alert";
import {Token} from "./token";
import {BackendCommunicatorService} from "../backend-communicator.service";

@Injectable()
export class ConsumeTokenService extends BackendCommunicatorService{
  private headers = new Headers({'Content-Type': 'application/json'});
  private tokenUrl = '/api/v1/tokens';  // URL to web api

  constructor(private http: Http, alertService: AlertService) {
    super(alertService);
  }

  consumeToken(token: Token): Promise<Token> {
    return this.http
      .post(`${this.tokenUrl}/consume`, JSON.stringify(token), {headers: this.headers})
      .map(this.extractData.bind(this, Token))
      .toPromise()
      .catch(this.handleError.bind(this));
  }

  getToken(tokenString: string): Promise<Token> {
    return this.http
      .get(`${this.tokenUrl}/${tokenString}`)
      .map(this.extractData.bind(this, Token))
      .toPromise()
      .catch(this.handleError.bind(this));
  }
}
