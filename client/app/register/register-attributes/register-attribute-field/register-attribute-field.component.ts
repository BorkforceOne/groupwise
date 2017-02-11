import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import {AttributeString} from "../../../services/attributes/attribute-string.model";
import {AttributeStringValue} from "../../../services/attributes/attribute-string-value.model";
import {AttributeDate} from "../../../services/attributes/attribute-date.model";
import {AttributeRange} from "../../../services/attributes/attribute-range.model";
import {AttributeRangeValue} from "../../../services/attributes/attribute-range-value.model";
import {AttributeDateValue} from "../../../services/attributes/attribute-date-value.model";
import {AttributeEnum} from "../../../services/attributes/attribute-enum.model";
import {AttributeEnumValue} from "../../../services/attributes/attribute-enum-value.model";

@Component({
  selector: 'app-register-attribute-field',
  templateUrl: 'register-attribute-field.component.html',
  styleUrls: ['register-attribute-field.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default,
  inputs: ['Attribute', 'AttributeValue']
})

export class RegisterAttributeFieldComponent implements OnInit {
  public Attribute: AttributeString | AttributeDate | AttributeRange | AttributeEnum;
  public AttributeValue: AttributeStringValue | AttributeDateValue | AttributeRangeValue | AttributeEnumValue;

  constructor() { }

  ngOnInit() {

  }

  getAttributeType() {
    if (this.Attribute instanceof AttributeString)
      return "STRING";
    if (this.Attribute instanceof AttributeDate)
      return "DATE";
    if (this.Attribute instanceof AttributeRange)
      return "RANGE";
    if (this.Attribute instanceof AttributeEnum)
      return "ENUM";

    return null;
  }

  onNumberChange(event) {
    this.AttributeValue.Value = event.target.valueAsNumber;
  }

}
