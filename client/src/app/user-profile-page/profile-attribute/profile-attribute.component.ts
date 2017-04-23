import {Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ViewChildren} from '@angular/core';
import {AttributeService} from "../../services/attributes/attribute.service";
import {AttributeEnumValue} from "../../services/attributes/attribute-enum-value.model";
import {AttributeEnum} from "../../services/attributes/attribute-enum.model";
import {Attribute} from "../../services/attributes/attribute.model";
import {User} from "../../services/user/user";
import { IMultiSelectOption, IMultiSelectSettings } from 'angular-2-dropdown-multiselect';

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
  private options: IMultiSelectOption[];
  private optionsModel: number[] = [];
  private selectSettings: IMultiSelectSettings = {
    enableSearch: true,
    autoUnselect: true
  };
  private closedCount: number = 0;

  constructor(private attributeService: AttributeService) { }

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

  private renderSelectedOptions(type: AttributeEnum, value: AttributeEnumValue) {
    if (value.Value === undefined)
      return null;
    let names = value.Value
      .filter((value) => type.Options.find((option) => option.Value === value) !== undefined)
      .map((value) => type.Options.find((option) => option.Value === value).Display);
    return names.join(', ');
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
        })
        .catch(() => {
          this.isEditing = false;
        });
    }
    else {
      this.isEditing = false;
    }
  }

  private onDropdownClosed() {
    this.closedCount ++;

    if (this.closedCount > 1) {
      this.onBlur();
      this.closedCount = 0;
    }
  }

  onNumberChange(event) {
    this.Attribute.Value.Value = event.target.valueAsNumber;
  }

}
