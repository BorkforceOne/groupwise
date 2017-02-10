import {Injectable, sequence} from '@angular/core';
import {UserRegistrationModel} from "./user-registration.model";
import {Router} from "@angular/router";
import {User} from "../user";
import {Alert} from "../../alert/alert";
import {RestError} from "../../rest-error";
import {Response, Headers, Http} from "@angular/http";
import {AlertService} from "../../alert/alert.service";
import {AttributeService} from "../../attributes/attribute.service";
import {Attribute} from "../../attributes/attribute.model";

@Injectable()
export class UserRegistrationService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private usersUrl = '/api/v1/users';  // URL to web api
  private userRegistrationModel: UserRegistrationModel = new UserRegistrationModel();
  private attributes: Attribute[] = [];
  private current : number = 0;
  private sequence : string[] = [];

  constructor(private router : Router, private http: Http, private alertService: AlertService, private attributeService: AttributeService) {
    this.attributeService
      .getAllAttributes()
      .subscribe(a => {this.attributes = a});
  }

  getUserRegistrationModel() : UserRegistrationModel {
    return this.userRegistrationModel;
  }

  getAttributes() : Attribute[] {
    return this.attributes;
  }

  setSequence(sequence : string[]) : void {
    this.sequence = sequence;
  }

  getSequence() : String[] {
    return this.sequence;
  }

  getProgress() : number {
    if (this.getLength() > 0)
      return this.getCurrent()/this.getLength();
    return 0;
  }

  getLength() : number {
    return this.sequence.length;
  }

  getCurrent() : number {
    return this.current + 1;
  }

  next() : void {
    if (this.current < this.sequence.length - 1) {
      this.current += 1;
      this.router.navigateByUrl(this.sequence[this.current]);
      // Force scroll to top
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
  }

  previous() : void {
    if (this.current > 0) {
      this.current -= 1;
      this.router.navigateByUrl(this.sequence[this.current]);
      // Force scroll to top
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
  }

  register(): Promise<User> {
    return this.http
      .post(this.usersUrl, JSON.stringify(this.userRegistrationModel), {headers: this.headers})
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
    return new User().fromJSON(body.Payload);
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
