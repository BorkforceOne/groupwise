import { Injectable } from '@angular/core';
import {BackendCommunicatorService} from "../backend-communicator.service";
import {Headers, Http} from "@angular/http";
import {AlertService} from "../alert/alert.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ContactService extends BackendCommunicatorService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private remoteUrlBase = '/api/v1/contact';

  constructor(private http: Http, alertService: AlertService) {
    super(alertService);
  }

  createContact(content: any): Observable<any> {
    return this
      .http.post(this.remoteUrlBase, JSON.stringify(content), {headers: this.headers})
      .catch(this.handleError.bind(this));
  }
}
