import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {ConfigService} from "../services/config/config.service";

@Component({
  selector: 'app-remote-html-content',
  templateUrl: './remote-html-content.component.html',
  styleUrls: ['./remote-html-content.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default,
  inputs: ['ConfigEntry']
})
export class RemoteHtmlContentComponent implements OnInit {
  private ConfigEntry: string;
  private content: SafeHtml = "";
  private loaded: boolean = false;

  constructor(private configService: ConfigService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.configService.getValue(this.ConfigEntry)
      .subscribe((value) => {
        this.content = this.sanitizer.bypassSecurityTrustHtml(value);
        this.loaded = true;
      }, () => this.loaded = true);
  }

}
