import {Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ViewChild} from '@angular/core';

import {User} from "../services/user/user";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../services/user/user.service";
import {AttributeService} from "../services/attributes/attribute.service";
import {Attribute} from "../services/attributes/attribute.model";
import {AttributeString} from "../services/attributes/attribute-string.model";
import {Subscription} from "rxjs";
import {UserPhoto} from "../services/user/user-photo";
import {ModalDirective} from "ng2-bootstrap";
//import {AttributeService} from "PATH";

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default
})
export class UserProfilePageComponent implements OnInit {
  @ViewChild('inspectModal') public inspectModal:ModalDirective;
  private defaultPhotoURL: string = "/assets/profile-placeholder-default.png";
  private inspectingImage: string;
  private photoURL: string = "/api/v1/user-photos";
  private querySub: Subscription = null;
  private user: User = new User();
  private attributes: Attribute[] = [];
  private stringAttributes: Attribute[] = [];
  private userPhotos: string[] = [];

  constructor(private route: ActivatedRoute, private userService: UserService,
              private attributeService: AttributeService) {
    this.querySub = this.route.params.subscribe(params => {
      let id = +params["id"];

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
            });
        });

      this.userService.getUserPhotosByUserId(id)
        .subscribe((photos: UserPhoto[]) => {
          photos.map((photo) => {
            this.userPhotos.push(`${this.photoURL}/${photo.Id}`)
          })
        })
      }
    );
  }

  inspectImage(image: string) {
    this.inspectingImage = image;
    this.inspectModal.show();
  }


  ngOnInit() {

    let id = +this.route.snapshot.params["id"];


  }

}
