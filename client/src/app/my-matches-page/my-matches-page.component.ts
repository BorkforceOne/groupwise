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
import {ChatService} from "../services/chat/chat.service";

class Result {
  User: User;
  Match: Match;
}

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
  private results: Result[] = [];
  private filteredResults: Result[] = [];
  private currentResults: Result[] = [];
  private attributes: Attribute[] = [];
  private currentPage: number = 1;
  private itemsPerPage: number = 20;
  private loggedInUser: User;
  private filter: string = "";

  constructor(private userService: UserService, private attributeService: AttributeService,
              private chatService: ChatService, private authService: AuthService, private matchService: MatchService) {}

  ngOnInit() {
    this.authService.getLoggedInUser()
      .subscribe((loggedInUser: User) => {
        this.loggedInUser = loggedInUser;

        this.matchService.getMatches()
          .subscribe((matches) => {
            matches = matches.filter((match: Match) => {
              if (this.loggedInUser.Type == 'HOST')
                return match.HostUserId == this.loggedInUser.Id;
              else
                return match.StudentUserId == this.loggedInUser.Id;
            });
            this.userService.getUsers()
              .subscribe((users) => {
                this.results = matches.map((match: Match) => {
                  let foundUser = null;
                  if (this.loggedInUser.Type == 'HOST')
                    foundUser = users.find((user) => match.StudentUserId == user.Id);
                  else
                    foundUser = users.find((user) => match.HostUserId == user.Id);

                  let result: Result = new Result();

                  result.User = foundUser;
                  result.Match = match;

                  return result;
                });

                this.results = this.results.filter((result: Result, i, ar) => {
                  let foundResults = this.results.filter((innerResult) => result.User === innerResult.User);
                  foundResults.sort((a, b) => a.Match.Id > b.Match.Id ? -1 : 1);
                  if (foundResults.length > 1)
                    return foundResults.indexOf(result) == 0;
                  return true;
                });

                this.results.map((result: any) => {
                  this.userService.getUserPhotosByUserId(result.User.Id)
                    .subscribe((photos) => {
                      if (photos.length > 0)
                        result.User.ProfileImage = this.photoURL + `/${photos[0].Id}`;
                      else
                        result.User.ProfileImage = this.defaultPhotoURL;
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
  }

  /**
   * Accept a match using the API
   */
  private acceptMatch(match: Match) {
    match.Status = "APPROVED";
    this.matchService.updateMatch(match)
      .subscribe();
  }

  /**
   * Reject a match using the API
   */
  private rejectMatch(match: Match) {
    match.Status = "REJECTED";
    this.matchService.updateMatch(match)
      .subscribe();
  }

  /**
   * Unmatch an existing match using the API
   */
  private unmatchMatch(match) {
    match.Status = "UNMATCHED";
    this.matchService.updateMatch(match)
      .subscribe();
  }

  private startChat(user) {
    this.chatService.addChat(user.Id);
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
    this.currentResults = this.filteredResults.slice(event.itemsPerPage * (event.page - 1), event.itemsPerPage * event.page);
  }

  private onFilterChanged(): void {
    if (this.filter != "") {
      let found = this.attributes.filter((entry) => {
        return String(this._getAttributeDisplay(entry)).toUpperCase().includes(this.filter.toUpperCase());
      });

      let foundUsers = found.map((entry) => {
        return this.results.find(result => result.User.Id == entry.Value.UserId);
      });

      this.filteredResults = foundUsers.filter((user) => user != undefined);
    }
    else {
      this.filteredResults = this.results;
    }

    this.currentResults = this.filteredResults.slice(this.itemsPerPage * (this.currentPage - 1), this.itemsPerPage * this.currentPage);
  }
}
