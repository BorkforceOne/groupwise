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
import {BackendCommunicatorService} from "../../backend-communicator.service";

@Injectable()
export class UserRegistrationService extends BackendCommunicatorService{
  private headers = new Headers({'Content-Type': 'application/json'});
  private usersUrl = '/api/v1/users';  // URL to web api
  private userRegistrationModel: UserRegistrationModel = new UserRegistrationModel();
  private attributes: Attribute[] = [];
  private current : number = 0;
  private sequence : string[] = [];

  constructor(private router : Router, private http: Http, alertService: AlertService, private attributeService: AttributeService) {
    super(alertService);

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
      .map(this.extractData.bind(this, User))
      .toPromise()
      .then((user: User) => {
        let attributes = this.attributes.filter((attribute) => {
          return (attribute.Type.ForType === 'BOTH' || attribute.Type.ForType == user.Type)
        });

        attributes.map((attribute) => {
          attribute.Value.UserId = user.Id;
        });

        this.attributeService.updateAllAttributes(attributes)
      })
      .catch(this.handleError.bind(this));
  }

}
