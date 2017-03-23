import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import {AttributeService} from "../../../services/attributes/attribute.service";
import {Attribute} from "../../../services/attributes/attribute.model";
import {FormGroup} from "@angular/forms";
import {UserRegistrationService} from "../../../services/user/registration-service/user-registration.service";

@Component({
  selector: 'app-register-attribute-field',
  templateUrl: 'register-attribute-field.component.html',
  styleUrls: ['register-attribute-field.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default,
  inputs: ['Attribute', 'AttributeValue']
})

export class RegisterAttributeFieldComponent implements OnInit {
  public Attribute: Attribute;
  attributeRegistrationForm: FormGroup;

  constructor(private attributeService: AttributeService, private userRegistrationService: UserRegistrationService) {
    this.attributeRegistrationForm = this.userRegistrationService.getAttributeForm();
  }

  ngOnInit() {

  }

  onNumberChange(event) {
    this.Attribute.Value.Value = event.target.valueAsNumber;
  }

}
