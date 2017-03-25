import {Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Input} from '@angular/core';
import {UserRegistrationService} from "../../services/user/registration-service/user-registration.service";
import {UserRegistrationModel} from "../../services/user/registration-service/user-registration.model";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-register-general-information',
  templateUrl: 'register-general-information.component.html',
  styleUrls: ['register-general-information.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default
})
export class RegisterGeneralInformationComponent implements OnInit {
  userRegistrationForm: FormGroup;
  public phoneModel = '';
  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

  constructor(private userRegistrationService: UserRegistrationService) {
    this.userRegistrationForm = this.userRegistrationService.userRegistrationForm;
  }

  ngOnInit() {

  }

}
