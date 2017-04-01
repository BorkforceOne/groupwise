import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import {User} from "../services/user/user";
import {UserService} from "../services/user/user.service";
import {AttributeService} from "../services/attributes/attribute.service";
import {Attribute} from "../services/attributes/attribute.model";
import {AttributeEnum} from "../services/attributes/attribute-enum.model";
import {ConfigService} from "../services/config/config.service";
import {AuthService} from "../services/user/auth.service";
import {MatchService} from "../services/match/match.service";
import {Match} from "../services/match/match.model";
@Component({
  selector: 'app-my-matches-page',
  templateUrl: './my-matches-page.component.html',
  styleUrls: ['./my-matches-page.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default
})
export class MyMatchesPageComponent implements OnInit {
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
              private configService: ConfigService, private authService: AuthService, private matchService: MatchService) {}
  ngOnInit() {
    this.authService.getLoggedInUser()
      .subscribe((loggedInUser: User) => {
        this.matchService.getMatches()
          .subscribe((matches) => {
            matches = matches.filter((match: Match) => {
              if (loggedInUser.Type == 'HOST')
                return match.HostUserId == loggedInUser.Id;
              else
                return match.StudentUserId == loggedInUser.Id;
            });
            this.userService.getUsers()
              .subscribe(users => {
                this.users = matches.map((match: Match) => {
                  if (loggedInUser.Type == 'HOST')
                    return users.find((user) => match.StudentUserId == user.Id);
                  else
                    return users.find((user) => match.HostUserId == user.Id);
                });

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
          });
    });

    this.configService.getValue("FeaturedAttribute")
      .subscribe(value => {
        this.featuredAttribute = value;
      }, err => {
        this.featuredAttribute = "";
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
    if (this.filter != "") {
      let found = this.attributes.filter((entry) => {
        return String(this._getAttributeDisplay(entry)).toUpperCase().includes(this.filter.toUpperCase());
      });

      let foundUsers = found.map((entry) => {
        return this.users.find(user => user.Id == entry.Value.UserId);
      });

      this.filteredUsers = foundUsers.filter((user) => user != undefined);
    }
    else {
      this.filteredUsers = this.users;
    }

    this.currentUsers = this.filteredUsers.slice(this.itemsPerPage * (this.currentPage - 1), this.itemsPerPage * this.currentPage);
  }
}
