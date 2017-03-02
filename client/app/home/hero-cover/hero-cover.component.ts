import { Component, OnInit } from '@angular/core';
import {ConfigService} from "../../services/config/config.service";

@Component({
  selector: 'app-hero-cover',
  templateUrl: './hero-cover.component.html',
  styleUrls: ['./hero-cover.component.scss']
})
export class HeroCoverComponent implements OnInit {
  private bannerURL = null;
  private defaultBannerURL = "/assets/hero-cover-default.jpg";

  constructor(private configService: ConfigService) { }

  ngOnInit() {
    this.configService.getValue("BannerId")
      .subscribe(kvp => {
        this.bannerURL = `/api/v1/attachments/${kvp.Value}`;
      }, err => {
        this.bannerURL = this.defaultBannerURL;
      });
  }

  getBanner() {
    if (this.bannerURL)
      return `url(${this.bannerURL})`;
    return '';
  }

}
