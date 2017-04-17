import { Injectable } from '@angular/core';
import {BackendCommunicatorService} from "../backend-communicator.service";
import {Headers, Http} from "@angular/http";
import {AlertService} from "../alert/alert.service";
import {User} from "./user";
import {Observable, BehaviorSubject} from "rxjs";
import {UserLogin} from "./user-login";
import {Router} from "@angular/router";

@Injectable()
export class AuthService extends BackendCommunicatorService{
  private headers = new Headers({'Content-Type': 'application/json'});
  private authUrl = '/api/v1/auth';  // URL to web api
  private loggedInUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  private triedRemote: boolean = false;

  constructor(private http: Http, protected alertService: AlertService, private router: Router) {
    super(alertService);
  }

  private _setLoggedInUser(user: User) {
    this.loggedInUser.next(user);
    return user;
  }

  public getLoggedInUserOnce(): Observable<User> {
    return this.http.post(`${this.authUrl}`, JSON.stringify({}), {headers: this.headers})
      .map(this.extractData.bind(this, User))
      .map(this._setLoggedInUser.bind(this))
      .catch(this.handleAuthError.bind(this));
  }

  public getLoggedInUser(): Observable<User> {
    if (this.triedRemote == false) {
      this.triedRemote = true;
      return Observable.concat(this.http
        .post(`${this.authUrl}`, JSON.stringify({}), {headers: this.headers})
        .map(this.extractData.bind(this, User))
        .map(this._setLoggedInUser.bind(this))
        .catch(this.handleAuthError.bind(this)),
        this.loggedInUser.asObservable());
    }

    return this.loggedInUser.asObservable();
  }

  public login(user: UserLogin): Observable<User> {
    return this.http
      .post(`${this.authUrl}/login`, JSON.stringify(user), {headers: this.headers})
      .map(this.extractData.bind(this, User))
      .map(this._setLoggedInUser.bind(this))
      .catch(this.handleError.bind(this));
  }

  public logout(): Observable<boolean> {
    return this.http
      .post(`${this.authUrl}/logout`, null, {headers: this.headers})
      .map(this.extractData.bind(this, User))
      .do(() => {
        this.router.navigate(['/']);
      })
      .map(() => this._setLoggedInUser(null))
      .catch(this.handleError.bind(this));
  }

  private handleAuthError(error): Observable<User> {
    if (this.loggedInUser.getValue() != null)
      this.loggedInUser.next(null);
    return this.loggedInUser.asObservable();
  }
}
