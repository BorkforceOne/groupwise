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

  private _setLoggedInUser(user: User) {
    this.loggedInUser = user;
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    return user;
  }

  private _clearLoggedInUser(): void {
    this._setLoggedInUser(null);
  }

  private _getLocalLoggedInUser(): User {
    let user = localStorage.getItem("loggedInUser");
    if (user != null)
      return JSON.parse(user);
    return null;
  }

  private _loadLocalLoggedInUser(): User {
    this.loggedInUser = this._getLocalLoggedInUser();
    return this.loggedInUser;
  }

  login(user: UserLogin): Promise<User> {
    return this.http
      .post(`${this.authUrl}/login`, JSON.stringify(user), {headers: this.headers})
      .map(this.extractData)
      .map(this._setLoggedInUser)
      .toPromise()
      .catch(this.handleError.bind(this));
  }

  logout(): Promise<boolean> {
    return this.http
      .post(`${this.authUrl}/logout`, null, {headers: this.headers})
      .map(this.extractData)
      .map(this._clearLoggedInUser.bind(this))
      .toPromise()
      .catch(this.handleError.bind(this));
  }

  getLoggedInUser(): User {
    if (this.loggedInUser != null)
      return this.loggedInUser;
    this._loadLocalLoggedInUser();
    return this.loggedInUser;
  }

  isLoggedIn(): boolean {
    return this.getLoggedInUser() != null;
  }

  isAdmin(user: User): boolean {
    return user.Type === 'ADMINISTRATOR';
  }

  getUserDisplayName(user: User): string {
    return user.Firstname + " " + user.Lastname;
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
