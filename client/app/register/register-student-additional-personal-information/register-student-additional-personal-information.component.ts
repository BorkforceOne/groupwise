import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import {UserRegistrationService} from "../../services/user/registration-service/user-registration.service";
import {UserRegistrationModel} from "../../services/user/registration-service/user-registration.model";

@Component({
  selector: 'app-register-student-additional-personal-information',
  templateUrl: 'register-student-additional-personal-information.component.html',
  styleUrls: ['register-student-additional-personal-information.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default
})
export class RegisterStudentAdditionalPersonalInformationComponent implements OnInit {
  userRegistrationModel: UserRegistrationModel;

  constructor(private userRegistrationService: UserRegistrationService) { }

  ngOnInit() {
    this.userRegistrationModel = this.userRegistrationService.getUserRegistrationModel();
  }

}
