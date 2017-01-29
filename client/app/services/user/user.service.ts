import { Injectable } from '@angular/core';
import { User } from "./user";
import { UserRegister } from "./user-register";
import { UserLogin } from "./user-login";
import { RestError } from '../rest-error';
import {Headers, Http, Response} from '@angular/http';

import '../../rxjs-operators';
import { Observable } from "rxjs";
import {AlertService} from "../alert/alert.service";
import {Alert} from "../alert/alert";

@Injectable()
export class UserService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private usersUrl = '/api/v1/users';  // URL to web api
  private authUrl = '/api/v1/auth';  // URL to web api
  private loggedInUser : User;

  constructor(private http: Http, private alertService: AlertService) {
    this.loggedInUser = null;
  }

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

  login(user: UserLogin): Promise<User> {
    return this.http
      .post(`${this.authUrl}/login`, JSON.stringify(user), {headers: this.headers})
      .map(this.extractData)
      .map((user) => {
        this.loggedInUser = user;
        return user;
      })
      .toPromise()
      .catch(this.handleError.bind(this));
  }

  getLoggedInUser(): User {
    return this.loggedInUser;
  }

  isLoggedIn(): boolean {

  }

  private extractData(res: Response) {
    let body = res.json();
    if (Array.isArray(body.Errors) && body.Errors.length > 0)
      throw new RestError(body.Errors);
    if (body.Payload === undefined)
      throw new RestError(["Invalid response"]);
    return new User().fromJSON(body.Payload);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    const alert = new Alert();
    alert.Text = error.Errors.concat('\n');
    alert.Type = "danger"
    this.alertService.addAlert(alert);
    return Promise.reject(error.message || error);
  }

}
