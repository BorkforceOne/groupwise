import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

import {User} from "../services/user/user";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../services/user/user.service";
import {AttributeService} from "../services/attributes/attribute.service";
import {Attribute} from "../services/attributes/attribute.model";
import {AttributeString} from "../services/attributes/attribute-string.model";
//import {AttributeService} from "PATH";

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default
})
export class UserProfilePageComponent implements OnInit {
  private user: User = new User();
  private attributes: Attribute[] = [];
  private stringAttributes: Attribute[] = [];
  constructor(private route: ActivatedRoute, private userService: UserService,
              private attributeService: AttributeService) { }


  ngOnInit() {

    let id = +this.route.snapshot.params["id"];
    this.userService.getUserById(id)
      .subscribe((user: User) => {
        this.user = user;
        this.attributeService.getUserAttributesAndValues(this.user)
          .subscribe(attributes => {
            this.attributes = attributes.filter((entry: Attribute) => {
              return !(entry.Type instanceof AttributeString)
            });
            this.stringAttributes = attributes.filter((entry: Attribute) => {
              return entry.Type instanceof AttributeString
            });
            console.log(attributes);
          });
      });


  }

}
