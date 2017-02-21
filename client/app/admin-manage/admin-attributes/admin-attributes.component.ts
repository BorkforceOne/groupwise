import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import {Attribute} from "../../services/attributes/attribute.model";
import {AttributeService} from "../../services/attributes/attribute.service";

@Component({
  selector: 'app-admin-attributes',
  templateUrl: 'admin-attributes.component.html',
  styleUrls: ['admin-attributes.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default
})
export class AdminAttributesComponent implements OnInit {
  private attributes: Attribute[] = [];

  constructor(private attributeService: AttributeService) { }

  ngOnInit() {
    this.attributeService.getAllAttributes()
      .subscribe(attributes => {
        this.attributes = attributes;
        console.log(attributes);
      });
  }

}
