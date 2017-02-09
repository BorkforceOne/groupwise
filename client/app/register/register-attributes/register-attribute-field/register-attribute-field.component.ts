import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import {AttributeString} from "../../../services/attributes/attribute-string.model";
import {AttributeStringValue} from "../../../services/attributes/attribute-string-value.model";

@Component({
  selector: 'app-register-attribute-field',
  templateUrl: 'register-attribute-field.component.html',
  styleUrls: ['register-attribute-field.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default,
  inputs: ['Attribute', 'AttributeValue']
})
export class RegisterAttributeFieldComponent implements OnInit {
  public Attribute: AttributeString;
  public AttributeValue: AttributeStringValue;

  constructor() { }

  ngOnInit() {
    console.log(this.Attribute);
  }

  getAttributeType() {
    if (this.Attribute instanceof AttributeString)
      return "STRING";

    return null;
  }

}
