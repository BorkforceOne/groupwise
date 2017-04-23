import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import {AttributeService} from "../../../services/attributes/attribute.service";
import {Attribute} from "../../../services/attributes/attribute.model";
import {FormGroup} from "@angular/forms";
import {UserRegistrationService} from "../../../services/user/registration-service/user-registration.service";
import { IMultiSelectOption, IMultiSelectSettings } from 'angular-2-dropdown-multiselect';

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
  private options: IMultiSelectOption[] = [];
  private selectSettings: IMultiSelectSettings = {
    enableSearch: true,
    autoUnselect: true
  };

  constructor(private attributeService: AttributeService, private userRegistrationService: UserRegistrationService) {
    this.attributeRegistrationForm = this.userRegistrationService.getAttributeForm();
  }

  ngOnInit() {
    if (this.attributeService.getAttributeType(this.Attribute) === 'ENUM') {
      if (this.Attribute.Type.MaxSelect > 0)
        this.selectSettings.selectionLimit = this.Attribute.Type.MaxSelect;

      this.options = this.Attribute.Type.Options.map((option) => {
        return {
          id: option.Value,
          name: option.Display
        }
      });
    }
  }

  onNumberChange(event) {
    this.attributeRegistrationForm.controls[this.Attribute.Type.Name].setValue(event.target.valueAsNumber);
  }

}
