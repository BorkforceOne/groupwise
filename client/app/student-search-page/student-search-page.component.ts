import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import {User} from "../services/user/user";
import {UserService} from "../services/user/user.service";
import {AttributeService} from "../services/attributes/attribute.service";
import {Attribute} from "../services/attributes/attribute.model";
import {AttributeEnum} from "../services/attributes/attribute-enum.model";
import {ConfigService} from "../services/config/config.service";

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
  private filteredUsers: User[] = [];
  private currentUsers: User[] = [];
  private attributes: Attribute[] = [];
  private currentPage: number = 1;
  private itemsPerPage: number = 20;
  private featuredAttribute: string;
  private filter: string = "";

  constructor(private userService: UserService, private attributeService: AttributeService,
              private configService: ConfigService) {}

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

          this.attributeService.getAllAttributesAndValues()
            .subscribe(attributes => {
              this.attributes = attributes;
              this.onFilterChanged();
            });
        }
      );

    this.configService.getValue('FeaturedAttribute').subscribe((value) => {
      this.featuredAttribute = value;
    });
  }

  private getUserAttributeDisplay(name: String, user: User) {
    let found = this.getUserAttribute(name, user);
    if (found)
      return this._getAttributeDisplay(found);
    return "";
  }

  private _getAttributeDisplay(attribute) {
    if (attribute.Type instanceof AttributeEnum) {
      return attribute.Type.Options.filter((entry) => {
        return entry.Value == attribute.Value.Value
      })[0].Display;
    }
    return attribute.Value.Value;
  }

  private getUserAttribute(name: String, user: User) {
    let found = this.attributes.filter((entry) => {
      return (entry.Type.Name == name && entry.Value.UserId == user.Id);
    });

    if (found.length == 0)
      return null;

    return found[0];
  }

  private pageChanged(event: any): void {
    this.currentUsers = this.filteredUsers.slice(event.itemsPerPage * (event.page - 1), event.itemsPerPage * event.page);
  }

  private onFilterChanged(): void {
    let found = this.attributes.filter((entry) => {
      return String(this._getAttributeDisplay(entry)).toUpperCase().includes(this.filter.toUpperCase());
    });

    let foundUsers = found.map((entry) => {
      return this.users.find(user => user.Id == entry.Value.UserId);
    });

    this.filteredUsers = foundUsers.filter(function(item, i, ar){ return ar.indexOf(item) === i; });


    this.currentUsers = this.filteredUsers.slice(this.itemsPerPage * (this.currentPage - 1), this.itemsPerPage * this.currentPage);
  }

}
