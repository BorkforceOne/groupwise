import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import {UserService} from "../services/user/user.service";
import {UserPhoto} from "../services/user/user-photo";

@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default
})
export class UploadPhotoComponent implements OnInit {
  private URL: string = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/api/v1/user-photos";

  private uploader:FileUploader;
  private hasBaseDropZoneOver:boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.uploader = new FileUploader({url: this.URL});

    this.uploader.onCompleteItem = (item: any , response: any, headers: any) => {
      response = JSON.parse(response);
    };

    this.uploader.onErrorItem = (item: any, response: any, headers: any) => {

    };

  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

}
