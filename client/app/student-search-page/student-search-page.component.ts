import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import {User} from "../services/user/user";
import {UserService} from "../services/user/user.service";
import {AttributeService} from "../services/attributes/attribute.service";
import {Attribute} from "../services/attributes/attribute.model";
import {AttributeEnum} from "../services/attributes/attribute-enum.model";
import {UserPhoto} from "../services/user/user-photo";

@Component({
  selector: 'app-student-search-page',
  templateUrl: './student-search-page.component.html',
  styleUrls: ['./student-search-page.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default
})
export class StudentSearchPageComponent implements OnInit {
  private defaultPhotoURL: string = "/assets/profile-placeholder-default.png";
  private photoURL: string = "/api/v1/user-photos";
  private users: User[] = [];
  private attributes: Attribute[] = [];

  constructor(private userService: UserService, private attributeService: AttributeService) {}

  ngOnInit() {
    this.userService.getUsers()
      .subscribe(users => {
          this.users = users.filter((entry) => entry.Type == "STUDENT");
          this.users.map((user: any) => {
            this.userService.getUserPhotosByUserId(user.Id)
              .subscribe((photos) => {
                if (photos.length > 0)
                  user.ProfileImage = this.photoURL + `/${photos[0].Id}`;
                else
                  user.ProfileImage = this.defaultPhotoURL;
              })
          });
        }
      );

    this.attributeService.getAllAttributesAndValues()
      .subscribe(attributes => {
        this.attributes = attributes;
      });

  }

  getUserAttributeDisplay(name: String, user: User) {
    let found = this.getUserAttribute(name, user);
    if (found) {
      if (found.Type instanceof AttributeEnum) {
        return found.Type.Options.filter((entry) => {
          return entry.Value == found.Value.Value
        })[0].Display;
      }
      return found.Value.Value;
    }
  }

  getUserAttribute(name: String, user: User) {
    let found = this.attributes.filter((entry) => {
      return (entry.Type.Name == name && entry.Value.UserId == user.Id);
    });

    if (found.length == 0)
      return null;

    return found[0];
  }

}
