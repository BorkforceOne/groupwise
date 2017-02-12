import { Injectable } from '@angular/core';
import { User } from "./user";
import { UserLogin } from "./user-login";
import { RestError } from '../rest-error';
import {Headers, Http, Response} from '@angular/http';

import '../../rxjs-operators';
import { Observable } from "rxjs";
import {AlertService} from "../alert/alert.service";
import {Alert} from "../alert/alert";
import {BackendCommunicatorService} from "../backend-communicator.service";

@Injectable()
export class UserService extends BackendCommunicatorService{
  private headers = new Headers({'Content-Type': 'application/json'});
  private usersUrl = '/api/v1/users';  // URL to web api
  private authUrl = '/api/v1/auth';  // URL to web api
  private loggedInUser : User;

  constructor(private http: Http, alertService: AlertService) {
    super(alertService);
    this.loggedInUser = null;
  }

  getUsers(): Observable<User[]> {
    return this.http.get(this.usersUrl)
      .map(this.extractData.bind(this, User))
      .catch(this.handleError.bind(this));
  }

  getUserById(userId: number): Observable<User>{
    return this.http.get(`${this.usersUrl}/${userId}`)
      .map(this.extractData.bind(this, User))
      .catch(this.handleError.bind(this));
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
      .map(this.extractData.bind(this, User))
      .map(this._setLoggedInUser)
      .toPromise()
      .catch(this.handleError.bind(this));
  }

  resetPassword(email: string): Promise<{}> {
    let query = {
      Email: email
    };

    return this.http
      .post(`${this.usersUrl}/forgot-password`, JSON.stringify(query), {headers: this.headers})
      .map(() => {
        const alert = new Alert();
        alert.Text = "Password reset request sent! Check your email to complete the request!";
        alert.Type = "success";
        this.alertService.addAlert(alert);
      })
      .toPromise()
      .catch(this.handleError.bind(this));
  }

  logout(): Promise<boolean> {
    return this.http
      .post(`${this.authUrl}/logout`, null, {headers: this.headers})
      .map(this.extractData.bind(this, User))
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

}
