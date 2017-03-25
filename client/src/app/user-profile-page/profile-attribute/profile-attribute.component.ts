import {Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ViewChildren} from '@angular/core';
import {AttributeService} from "../../services/attributes/attribute.service";
import {AttributeEnumValue} from "../../services/attributes/attribute-enum-value.model";
import {AttributeEnum} from "../../services/attributes/attribute-enum.model";
import {Attribute} from "../../services/attributes/attribute.model";
import {User} from "../../services/user/user";

@Component({
  selector: 'app-profile-attribute',
  templateUrl: 'profile-attribute.component.html',
  styleUrls: ['profile-attribute.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default,
  inputs: ['Attribute', 'canEdit', 'forUser']
})
export class ProfileAttributeComponent implements OnInit {
  private Attribute: Attribute;
  private canEdit: boolean;
  private forUser: User;
  private isEditing: boolean;

  constructor(private attributeService: AttributeService) { }

  ngOnInit() {
  }

  private findOption(type: AttributeEnum, value: AttributeEnumValue) {

    for (let i = 0; i < type.Options.length; i++) {
      let option = type.Options[i];
      if (option.Value == value.Value)
        return option;
    }

    return null;
  }

  private onEdit() {
    if (this.canEdit)
      this.isEditing = true;
  }

  private onBlur() {
    if (this.Attribute.Value.Value != null) {
      if (this.Attribute.Value.UserId == null)
        this.Attribute.Value.UserId = this.forUser.Id;

      this.attributeService.updateAllAttributes([this.Attribute])
        .then(attribute => {
          this.isEditing = false;
        });
    }
    else {
      this.isEditing = false;
    }
  }

  onNumberChange(event) {
    this.Attribute.Value.Value = event.target.valueAsNumber;
  }

}
