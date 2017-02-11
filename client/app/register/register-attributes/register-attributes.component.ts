import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import {UserRegistrationService} from "../../services/user/registration-service/user-registration.service";
import {UserRegistrationModel} from "../../services/user/registration-service/user-registration.model";
import {AttributeService} from "../../services/attributes/attribute.service";
import {Attribute} from "../../services/attributes/attribute.model";

@Component({
  selector: 'app-register-attributes',
  templateUrl: 'register-attributes.component.html',
  styleUrls: ['register-attributes.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default
})

export class RegisterAttributesComponent implements OnInit {
  userRegistrationModel: UserRegistrationModel;
  attributes: Array<Attribute> = [];

  constructor(private userRegistrationService: UserRegistrationService, private attributeService: AttributeService) { }

  ngOnInit() {
    this.userRegistrationModel = this.userRegistrationService.getUserRegistrationModel();
    this.attributes = this.userRegistrationService.getAttributes()
      .filter((attribute) => {
        return attribute.Type.ForType == this.userRegistrationModel.Type || attribute.Type.ForType == 'BOTH';
      });
  }

}
