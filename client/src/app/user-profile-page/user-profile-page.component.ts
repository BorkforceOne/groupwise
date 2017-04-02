import {Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ViewChild} from '@angular/core';

import {User} from "../services/user/user";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../services/user/user.service";
import {AttributeService} from "../services/attributes/attribute.service";
import {Attribute} from "../services/attributes/attribute.model";
import {AttributeString} from "../services/attributes/attribute-string.model";
import {Subscription} from "rxjs";
import {UserPhoto} from "../services/user/user-photo";
import {ModalDirective, CarouselComponent} from "ng2-bootstrap";
import {FileUploader} from "ng2-file-upload";
import {AlertService} from "../services/alert/alert.service";
import {Alert} from "../services/alert/alert";
import {CookieService} from "angular2-cookie/services";
import {ChatService} from "../services/chat/chat.service";
import {AuthService} from "../services/user/auth.service";
import {MatchService} from "../services/match/match.service";
import {Match} from "../services/match/match.model";

class UserPhotoView {
  Id: number;
  isUploaded: boolean;
  File: any;
  URL: string;
}

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default
})

export class UserProfilePageComponent implements OnInit {
  @ViewChild('inspectModal') public inspectModal:ModalDirective;
  @ViewChild('inspectCarousel') public inspectCarousel: CarouselComponent;
  private defaultPhotoURL: string = "/assets/profile-placeholder-default.png";
  private hasBaseDropZoneOver: boolean = false;
  private uploader: FileUploader;
  private photoURL: string = "/api/v1/user-photos";
  private querySub: Subscription = null;
  private user: User = new User();
  private match: Match;
  private attributes: Attribute[] = [];
  private stringAttributes: Attribute[] = [];
  private userPhotos: UserPhotoView[] = [];
  private isLoggedInUser: boolean;
  private loggedInUser: User;
  private userId: number;

  constructor(private route: ActivatedRoute, private userService: UserService,
              private attributeService: AttributeService, private router: Router,
              private alertService: AlertService, private cookieService: CookieService,
              private chatService: ChatService, private authService: AuthService,
              private matchService: MatchService) {
    this.querySub = this.route.params.subscribe(params => {
      this.attributes = [];
      this.stringAttributes = [];
      this.user = new User();
      this.userPhotos = [];
      this.isLoggedInUser = false;
      this.userId = null;

      this.userId = +params["id"];

      this.authService.getLoggedInUser().subscribe((user) => {
        this.loggedInUser = user;

        if (user != null && user.Id == this.userId)
            this.isLoggedInUser = true;
        else
          this.isLoggedInUser = false;

        this.matchService.getMatches()
          .subscribe(matches => {
            let foundMatches = matches.filter((entry: Match) => (entry.HostUserId == this.loggedInUser.Id || entry.HostUserId == this.userId) && (entry.StudentUserId == this.userId || entry.StudentUserId == this.loggedInUser.Id));
            if (foundMatches.length > 0) {
              foundMatches.sort((a, b) => a.Id > b.Id ? -1 : 1);
              this.match = foundMatches[0];
            }
          });
      });

      this.userService.getUserById(this.userId)
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
            });
        },
          (err: any) => {
            this.router.navigate(['404']);
          });

      this.userService.getUserPhotosByUserId(this.userId)
        .subscribe((photos: UserPhoto[]) => {
          photos.map((photo) => {
            let viewPhoto = new UserPhotoView();
            viewPhoto.Id = photo.Id;
            viewPhoto.isUploaded = true;
            viewPhoto.URL = `${this.photoURL}/${photo.Id}`;
            this.userPhotos.push(viewPhoto);
          })
        })
      }
    );
  }

  ngOnInit() {
    this.uploader = new FileUploader({url: this.photoURL, autoUpload: true, authTokenHeader: 'X-XSRF-TOKEN', authToken: this.cookieService.get('XSRF-TOKEN')});

    this.uploader.onSuccessItem = (item: any , response: any, headers: any) => {
      // TODO: Add error checking!
      let photo = JSON.parse(response).Payload;
      let viewPhoto = new UserPhotoView();
      viewPhoto.Id = photo.Id;
      viewPhoto.isUploaded = true;
      viewPhoto.URL = `${this.photoURL}/${photo.Id}`;
      this.userPhotos.push(viewPhoto);
    };

    this.uploader.onErrorItem = (item: any, response: any, headers: any) => {
      let alert = new Alert();
      alert.Text = "File upload failed";
      alert.Type = "danger";
      this.alertService.addAlert(alert);
    };
  }

  /**
   * Propose a new match using the API
   */
  private proposeMatch() {
    let match = new Match();
    match.HostUserId = this.loggedInUser.Id;
    match.StudentUserId = this.userId;
    match.Status = "PROPOSED";

    this.match = match;

    this.matchService.createMatch(match).subscribe();
  }

  /**
   * Accept a match using the API
   */
  private acceptMatch() {
    this.match.Status = "APPROVED";
    this.matchService.updateMatch(this.match).subscribe();
  }

  /**
   * Reject a match using the API
   */
  private rejectMatch() {
    this.match.Status = "REJECTED";
    this.matchService.updateMatch(this.match).subscribe();
  }

  /**
   * Unmatch an existing match using the API
   */
  private unmatchMatch() {
    this.match.Status = "UNMATCHED";
    this.matchService.updateMatch(this.match).subscribe();
  }

  private inspectImage(index: number) {
    this.inspectCarousel.selectSlide(index);

    this.inspectModal.show();
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  private deleteUserPhoto(photoView: UserPhotoView) {
    this.userService.deleteUserPhoto(photoView.Id)
      .then(() => {
        this.userPhotos.splice(this.userPhotos.indexOf(photoView), 1)
      })
  }

  private startChat() {
    this.chatService.addChat(this.userId);
  }

}
