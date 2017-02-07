import { Injectable } from '@angular/core';
import { RestError } from '../../rest-error';
import {Http, Response} from '@angular/http';

import '../../../rxjs-operators';
import { Observable } from "rxjs";
import {AlertService} from "../../alert/alert.service";
import {Alert} from "../../alert/alert";
import {StudentProfile} from "./student-profile";

@Injectable()
export class StudentProfileService {
  private studentProfilesUrl = '/api/v1/student-profiles';  // URL to web api

  constructor(private http: Http, private alertService: AlertService) { }

  getStudentProfiles(): Observable<StudentProfile[]> {
    return this.http.get(this.studentProfilesUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    if (Array.isArray(body.Errors) && body.Errors.length > 0)
      throw new RestError(body.Errors);
    if (body.Payload === undefined)
      throw new RestError(["Invalid response"]);

    let data;

    if (Array.isArray(body.Payload)) {
      data = [];
      for (let profile in body.Payload) {
        data.push(new StudentProfile().fromJSON(body.Payload[profile]));
      }
    }
    else {
      data = new StudentProfile().fromJSON(body.Payload);
    }
    return data;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    const alert = new Alert();
    alert.Text = error.Errors.concat('\n');
    alert.Type = "danger";
    this.alertService.addAlert(alert);
    return Promise.reject(error.message || error);
  }

}
