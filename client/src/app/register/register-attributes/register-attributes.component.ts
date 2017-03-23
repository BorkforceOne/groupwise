import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import {UserRegistrationService} from "../../services/user/registration-service/user-registration.service";
import {Attribute} from "../../services/attributes/attribute.model";

@Component({
  selector: 'app-register-attributes',
  templateUrl: 'register-attributes.component.html',
  styleUrls: ['register-attributes.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default
})

export class RegisterAttributesComponent implements OnInit {
  attributes: Array<Attribute> = [];

  constructor(private userRegistrationService: UserRegistrationService) {
  }

  ngOnInit() {
    let type = this.userRegistrationService.getType();
    this.attributes = this.userRegistrationService.getAttributes()
      .filter((attribute) => attribute.Type.ForType == type || attribute.Type.ForType == 'BOTH');
  }

}
