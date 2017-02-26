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
import {AttributeEnum} from "../services/attributes/attribute-enum.model";
import {AttributeEnumValue} from "../services/attributes/attribute-enum-value.model";
import {CookieService} from "angular2-cookie/services/cookies.service";
//import {AttributeService} from "PATH";


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
  private attributes: Attribute[] = [];
  private stringAttributes: Attribute[] = [];
  private userPhotos: UserPhotoView[] = [];
  private isLoggedInUser: boolean;
  private userId: number;

  constructor(private route: ActivatedRoute, private userService: UserService,
              private attributeService: AttributeService, private router: Router,
              private alertService: AlertService, private cookieService: CookieService) {
    this.querySub = this.route.params.subscribe(params => {
      this.attributes = [];
      this.stringAttributes = [];
      this.user = new User();
      this.userPhotos = [];
      this.isLoggedInUser = false;
      this.userId = null;

      this.userId = +params["id"];

      if (this.userService.getLoggedInUser().Id == this.userId)
        this.isLoggedInUser = true;

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

  private findOption(type: AttributeEnum, value: AttributeEnumValue) {

    for (let i = 0; i < type.Options.length; i++) {
      let option = type.Options[i];
      if (option.Value == value.Value)
        return option;
    }

    return null;
  }

}
