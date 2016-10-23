import { Injectable } from '@angular/core';
import { RandomUser } from "./random-user";
import {Headers, Http, Response} from '@angular/http';

import './rxjs-operators';
import {Observable} from "rxjs";

@Injectable()
export class RandomUserService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private randomUsersUrl = 'app/random-users.json';  // URL to web api

  constructor(private http: Http) { }

  getUsers(): Observable<RandomUser[]> {
    return this.http.get(this.randomUsersUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
