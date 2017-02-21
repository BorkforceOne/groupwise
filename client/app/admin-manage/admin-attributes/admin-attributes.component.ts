import {Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ViewChild} from '@angular/core';
import {Attribute} from "../../services/attributes/attribute.model";
import {AttributeService} from "../../services/attributes/attribute.service";
import {ModalDirective} from "ng2-bootstrap";
import {AttributeString} from "../../services/attributes/attribute-string.model";
import {AttributeDate} from "../../services/attributes/attribute-date.model";
import {AttributeRange} from "../../services/attributes/attribute-range.model";
import {AttributeEnum} from "../../services/attributes/attribute-enum.model";

class AttributeView {
  Name: string;
  Description: string;
  Type: string;
  ForType: "STUDENT" | "HOST" | "BOTH";
  StringMaxLen: number;
  ExistingAttribute: Attribute = null;
}

@Component({
  selector: 'app-admin-attributes',
  templateUrl: 'admin-attributes.component.html',
  styleUrls: ['admin-attributes.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default
})
export class AdminAttributesComponent implements OnInit {
  @ViewChild('attributeEditModal') public attributeEditModal:ModalDirective;
  private attributes: Attribute[] = [];
  private editingAttribute: AttributeView = new AttributeView();

  constructor(private attributeService: AttributeService) { }

  ngOnInit() {
    this.attributeService.getAllAttributes()
      .subscribe(attributes => {
        this.attributes = attributes;
      });
  }

  addAttribute() {
    this.editingAttribute = new AttributeView();
    this.attributeEditModal.show();
  }

  private getAttributeType(attribute: Attribute) {
    if (attribute.Type instanceof AttributeString)
      return "STRING";

    if (attribute.Type instanceof AttributeDate)
      return "DATE";

    if (attribute.Type instanceof AttributeRange)
      return "RANGE";

    if (attribute.Type instanceof AttributeEnum)
      return "ENUM";

    return null;
  }

  editAttribute(attribute: Attribute) {
    this.setEditingAttribute(attribute);

    this.attributeEditModal.show();
  }

  setEditingAttribute(attribute: Attribute) {
    this.editingAttribute = new AttributeView();

    this.editingAttribute.ExistingAttribute = attribute;
    this.editingAttribute.Name = attribute.Type.Name;
    this.editingAttribute.ForType = attribute.Type.ForType;
    this.editingAttribute.Description = attribute.Type.Description;
    this.editingAttribute.Type = this.getAttributeType(attribute);

    switch (this.editingAttribute.Type) {
      case 'STRING':
        this.editingAttribute.StringMaxLen = attribute.Type.MaxLength;
        break;
    }
  }

  deleteAttribute(attribute: Attribute) {
    let type = this.getAttributeType(attribute);

    switch (type) {
      case 'STRING':
        this.attributeService.deleteAttributeString(attribute.Type)
          .subscribe(() => {
            this.attributes.splice(this.attributes.indexOf(attribute), 1);
          })
    }
  }

  submitAttribute() {
    let isNew = this.editingAttribute.ExistingAttribute == null;

    switch (this.editingAttribute.Type) {
      case 'STRING':
        let attributeString = new AttributeString();

        if (!isNew)
          attributeString = this.editingAttribute.ExistingAttribute.Type;

        attributeString.Name = this.editingAttribute.Name;
        attributeString.Description = this.editingAttribute.Description;
        attributeString.ForType = this.editingAttribute.ForType;
        attributeString.MaxLength = this.editingAttribute.StringMaxLen;

        if (isNew) {
          this.attributeService.createAttributeString(attributeString)
            .subscribe((attributeString) => {
              this.attributes.push(this.attributeService.mapToAttribute(attributeString)[0]);
              this.attributeEditModal.hide();
            })
        }
        else {
          this.attributeService.updateAttributeString(attributeString)
            .subscribe((attributeString) => {
              this.attributeEditModal.hide();
            })
        }
    }
  }

  resetEditingAttribute() {
    if (this.editingAttribute.ExistingAttribute != null)
      this.setEditingAttribute(this.editingAttribute.ExistingAttribute);
    else
      this.editingAttribute = new AttributeView();
  }

}
