import { Injectable } from '@angular/core';
import { User } from "./user";
import { UserRegister } from "./user-register";
import { RestError } from '../rest-error';
import {Headers, Http, Response} from '@angular/http';

import '../../rxjs-operators';
import { Observable } from "rxjs";

@Injectable()
export class UserService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private usersUrl = '/api/v1/users';  // URL to web api

  constructor(private http: Http) { }

  getUsers(): Observable<User[]> {
    return this.http.get(this.usersUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  create(user: UserRegister): Promise<User> {
    return this.http
      .post(this.usersUrl, JSON.stringify(user), {headers: this.headers})
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