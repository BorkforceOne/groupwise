import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user/user.service';
import {AlertService} from "../services/alert/alert.service";
import {Alert} from "../services/alert/alert";
import {Router} from "@angular/router";
import {UserRegistrationService} from "../services/user/registration-service/user-registration.service";
import {UserRegistrationModel} from "../services/user/registration-service/user-registration.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [UserRegistrationService]
})
export class RegisterComponent implements OnInit {
  userRegistrationModel: UserRegistrationModel;
  registrationComplete: Boolean;

  constructor(private userService: UserService, private alertService: AlertService, private router: Router, private userRegistrationService: UserRegistrationService) { }

  ngOnInit() {
    if (this.router.url != '/register')
      this.router.navigateByUrl('/register');

    this.userRegistrationService.setSequence(['/register', '/register/host-personal', '/register/host-preferences']);
    this.userRegistrationModel = this.userRegistrationService.getUserRegistrationModel();
    this.registrationComplete = false;
  }

  getProgress() {
    return this.userRegistrationService.getProgress() * 100;
  }

  getSequenceLength() {
    return this.userRegistrationService.getLength();
  }

  getSequenceCurrent() {
    return this.userRegistrationService.getCurrent();
  }

  onNext() {
    if (this.getSequenceCurrent() == 1) {
      if (this.userRegistrationModel.Type == 'HOST') {
        this.userRegistrationService.setSequence(['/register', '/register/host-personal', '/register/host-preferences']);
      }
      else {
        this.userRegistrationService.setSequence(['/register', '/register/student-personal', '/register/student-preferences']);
      }
    }
    this.userRegistrationService.next();
  }

  onPrevious() {
    this.userRegistrationService.previous();
  }

  onRegister(user: UserRegistrationModel) {
    this.userService.create(user)
      .then(user => {
        console.log(user);
        const alert = new Alert();
        alert.Text = "Please check your email to complete registration";
        alert.Type = "success";
        this.alertService.addAlert(alert);
        this.router.navigateByUrl('');
      })
      .catch(error => {
        console.log(error);
      });
  }

}
