import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import {Headers, Http, Response} from "@angular/http";
import {RestError} from "../rest-error";
import {BackendCommunicatorService} from "../backend-communicator.service";
import {AlertService} from "../alert/alert.service";

@Injectable()
export class ConfigService extends BackendCommunicatorService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private configUrl = '/api/v1/configs';  // URL to web api

  constructor(private http: Http, alertService: AlertService) {
    super(alertService);
  }

  getValue(key): Observable<any> {
    return this.http.get(`${this.configUrl}/${key}`)
      .map(this.extractData.bind(this, null))
      .map((config: any) => config.Value)
      .catch(this.handleError.bind(this));
  }

  setValue(key: string, value: any): Promise<any> {
    return this.http
      .post(`${this.configUrl}/${key}`, JSON.stringify({Value: value}), {headers: this.headers})
      .map(this.extractData.bind(this, null))
      .toPromise()
      .catch(this.handleError.bind(this));
  }

  handleError(error: any) {
    if (error instanceof Response)
      error = this.parseError(error);
    return Promise.reject(error.message || error);
  }
}
