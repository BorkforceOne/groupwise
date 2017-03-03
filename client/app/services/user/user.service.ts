import { Injectable } from '@angular/core';
import { User } from "./user";
import { UserLogin } from "./user-login";
import {Headers, Http, Response} from '@angular/http';

import '../../rxjs-operators';
import { Observable } from "rxjs";
import {AlertService} from "../alert/alert.service";
import {Alert} from "../alert/alert";
import {BackendCommunicatorService} from "../backend-communicator.service";
import {UserPhoto} from "./user-photo";

@Injectable()
export class UserService extends BackendCommunicatorService{
  private headers = new Headers({'Content-Type': 'application/json'});
  private usersUrl = '/api/v1/users';  // URL to web api
  private userPhotoUrl = '/api/v1/user-photos'; // URL to web api

  constructor(private http: Http, protected alertService: AlertService) {
    super(alertService);
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

  isAdmin(user: User): boolean {
    return user.Type === 'ADMINISTRATOR';
  }

  getUserDisplayName(user: User): string {
    return user.Firstname + " " + user.Lastname;
  }

  addUserPhoto(userPhoto: UserPhoto): Promise<UserPhoto> {
    return this.http
      .post(`${this.userPhotoUrl}`, JSON.stringify(userPhoto), {headers: this.headers})
      .map(this.extractData.bind(this, UserPhoto))
      .toPromise()
      .catch(this.handleError.bind(this));
  }

  deleteUserPhoto(photoId: number): Promise<UserPhoto> {
    return this.http
      .delete(`${this.userPhotoUrl}/${photoId}`)
      .map(this.extractData.bind(this, UserPhoto))
      .toPromise()
      .catch(this.handleError.bind(this));
  }

  getUserPhotosByUserId(userId: number): Observable<UserPhoto[]> {
    return this.http
      .get(`${this.userPhotoUrl}/user/${userId}`)
      .map(this.extractData.bind(this, UserPhoto))
      .catch(this.handleError.bind(this));
  }
}
