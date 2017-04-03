import { Injectable } from '@angular/core';
import {BackendCommunicatorService} from "../backend-communicator.service";
import {Headers, Http} from "@angular/http";
import {AlertService} from "../alert/alert.service";
import {Observable} from "rxjs";
import {List} from "./list.model";

@Injectable()
export class ListService extends BackendCommunicatorService{
  private headers = new Headers({'Content-Type': 'application/json'});
  private remoteUrlBase = '/api/v1/lists';

  constructor(private http: Http, alertService: AlertService) {
    super(alertService);
  }

  getLists(): Observable<List[]> {
    return this.http.get(this.remoteUrlBase)
      .map(this.extractData.bind(this, List))
      .catch(this.handleError.bind(this));
  }

  createList(list: List): Observable<List> {
    return this
      .http.post(this.remoteUrlBase, JSON.stringify(list), {headers: this.headers})
      .map(this.extractData.bind(this, List))
      .catch(this.handleError.bind(this));
  }

  updateMatch(list: List): Observable<List> {
    return this
      .http.put(`${this.remoteUrlBase}/${list.Id}`, JSON.stringify(list), {headers: this.headers})
      .map(this.extractData.bind(this, List))
      .catch(this.handleError.bind(this));
  }

  deleteMatch(list: List): Observable<List> {
    return this
      .http.delete(`${this.remoteUrlBase}/${list.Id}`)
      .map(this.extractData.bind(this, List))
      .catch(this.handleError.bind(this));
  }
}
