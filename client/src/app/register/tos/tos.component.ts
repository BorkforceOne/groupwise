import { Component, OnInit } from '@angular/core';
import {UserRegistrationService} from "../../services/user/registration-service/user-registration.service";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-tos',
  templateUrl: './tos.component.html',
  styleUrls: ['./tos.component.scss']
})
export class TosComponent implements OnInit {
  public tosForm: FormGroup;

  constructor(private userRegistrationService: UserRegistrationService) { }

  ngOnInit() {
    this.tosForm = this.userRegistrationService.tosForm;
  }

}
