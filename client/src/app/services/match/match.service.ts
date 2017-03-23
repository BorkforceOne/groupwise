import { Injectable } from '@angular/core';
import {Headers, Http} from "@angular/http";
import {BackendCommunicatorService} from "../backend-communicator.service";
import {AlertService} from "../alert/alert.service";
import {Observable} from "rxjs";
import {Match} from "./match.model";

@Injectable()
export class MatchService extends BackendCommunicatorService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private remoteUrlBase = '/api/v1/matches';

  constructor(private http: Http, alertService: AlertService) {
    super(alertService);
  }

  getMatches(): Observable<Match[]> {
    return this.http.get(this.remoteUrlBase)
      .map(this.extractData.bind(this, Match))
      .catch(this.handleError.bind(this));
  }

  createMatch(match: Match): Observable<Match> {
    return this
      .http.post(this.remoteUrlBase, JSON.stringify(match), {headers: this.headers})
      .map(this.extractData.bind(this, Match))
      .catch(this.handleError.bind(this));
  }

  updateMatch(match: Match): Observable<Match> {
    return this
      .http.put(`${this.remoteUrlBase}/${match.Id}`, JSON.stringify(match), {headers: this.headers})
      .map(this.extractData.bind(this, Match))
      .catch(this.handleError.bind(this));
  }
}
