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
import {FormGroup, FormBuilder, Form, Validators} from "@angular/forms";

@Injectable()
export class UserRegistrationService extends BackendCommunicatorService{
  private headers = new Headers({'Content-Type': 'application/json'});
  private usersUrl = '/api/v1/users';  // URL to web api
  public userRegistrationForm: FormGroup;
  public hostAttributeForm: FormGroup;
  public studentAttributeForm: FormGroup;

  private attributes: Attribute[] = [];

  private current : number = 0;
  private sequence : string[] = [];

  constructor(private router : Router, private http: Http, alertService: AlertService, private attributeService: AttributeService, private formBuilder: FormBuilder) {
    super(alertService);

    this.userRegistrationForm = this.formBuilder.group({
      Email: ['', [<any>Validators.required, <any>Validators.pattern("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$")]],
      Password: ['', [<any>Validators.required, <any>Validators.minLength(4)]],
      PasswordVerify: ['', [<any>Validators.required, <any>Validators.minLength(4)]],
      Firstname: ['', [<any>Validators.required]],
      Lastname: ['', [<any>Validators.required]],
      Birthday: ['', [<any>Validators.required]],
      Phone: ['', [<any>Validators.required, <any>Validators.pattern("[0-9]{10}")]],
      Gender: ['', [<any>Validators.required]],
      Type: ['', [<any>Validators.required]]
    }, {validator: this.matchingPasswords('Password', 'PasswordVerify')});

    this.attributeService
      .getAllAttributes()
      .subscribe((attributes: Attribute[]) => {
        this.attributes = attributes;
        let hostAttrs = attributes.filter((attr) => attr.Type.ForType == 'HOST' || attr.Type.ForType == 'BOTH');
        let studentAttrs = attributes.filter((attr) => attr.Type.ForType == 'STUDENT' || attr.Type.ForType == 'BOTH');
        let hostForm = {};
        let studentForm = {};

        this.processAttrs(hostForm, hostAttrs);
        this.processAttrs(studentForm, studentAttrs);

        this.hostAttributeForm = this.formBuilder.group(hostForm);
        this.studentAttributeForm = this.formBuilder.group(studentForm);
      });
  }

  processAttrs(form, attrs) {

    attrs.forEach((attr) => {
      switch (this.attributeService.getAttributeType(attr)) {
        case 'STRING':
          var validators = [];
          validators.push(<any>Validators.required);
          form[attr.Type.Name] = ['', validators];
          break;
        case 'DATE':
          var validators = [];
          validators.push(<any>Validators.required);
          form[attr.Type.Name] = ['', validators];
          break;
        case 'RANGE':
          var validators = [];
          validators.push(<any>Validators.required);
          form[attr.Type.Name] = ['', validators];
          break;
        case 'ENUM':
          var validators = [];
          validators.push(<any>Validators.required);
          form[attr.Type.Name] = ['', validators];
          break;
      }
    });
  }

  getAttributeForm() {
    switch (this.getType()) {
      case 'STUDENT':
        return this.studentAttributeForm;
      case 'HOST':
        return this.hostAttributeForm;
    }
  }

  getType() {
    return this.userRegistrationForm.controls['Type'].value;
  }

  matchingPasswords(passwordKey: string, passwordConfirmKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey];
      let passwordConfirmationInput = group.controls[passwordConfirmKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true})
      }
    }
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

  register(user: UserRegistrationModel): Promise<User> {
    return this.http
      .post(this.usersUrl, JSON.stringify(user), {headers: this.headers})
      .map(this.extractData.bind(this, User))
      .toPromise()
      .then((user: User) => {
        let attributeValues = this.getAttributeForm().value;
        let attributes = this.attributes.filter((attribute) => {
          return (attribute.Type.ForType === 'BOTH' || attribute.Type.ForType == user.Type)
        });

        attributes.map((attribute) => {
          attribute.Value.UserId = user.Id;
          if (this.attributeService.getAttributeType(attribute) == 'RANGE')
            attributeValues[attribute.Type.Name] = +attributeValues[attribute.Type.Name];
          attribute.Value.Value = attributeValues[attribute.Type.Name];
        });

        this.attributeService.updateAllAttributes(attributes);
        return user;
      })
      .catch(this.handleError.bind(this));
  }

}