import { Component, OnInit } from '@angular/core';
import {ConfigService} from "../../services/config/config.service";

@Component({
  selector: 'app-hero-cover',
  templateUrl: './hero-cover.component.html',
  styleUrls: ['./hero-cover.component.scss']
})
export class HeroCoverComponent implements OnInit {
  private bannerURL = "/assets/hero-cover-default.jpg";
  private host: string = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;

  constructor(private configService: ConfigService) { }

  ngOnInit() {
    this.configService.getValue("BannerId")
      .subscribe(kvp => {
        this.bannerURL = `${this.host}/api/v1/attachments/${kvp.Value}`;
      });
  }

  getBanner() {
    if (this.bannerURL)
      return `url(${this.bannerURL})`;
    return '';
  }

}
