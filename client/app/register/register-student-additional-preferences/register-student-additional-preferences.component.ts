import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import {UserRegistrationService} from "../../services/user/registration-service/user-registration.service";
import {UserRegistrationModel} from "../../services/user/registration-service/user-registration.model";

@Component({
  selector: 'app-register-student-additional-preferences',
  templateUrl: 'register-student-additional-preferences.component.html',
  styleUrls: ['register-student-additional-preferences.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default
})
export class RegisterStudentAdditionalPreferencesComponent implements OnInit {
  userRegistrationModel: UserRegistrationModel;

  constructor(private userRegistrationService: UserRegistrationService) { }

  ngOnInit() {
    this.userRegistrationModel = this.userRegistrationService.getUserRegistrationModel();
  }

}
