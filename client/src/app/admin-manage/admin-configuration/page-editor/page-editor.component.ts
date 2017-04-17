import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import {ConfigService} from "../../../services/config/config.service";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {AlertService} from "../../../services/alert/alert.service";
import {Alert} from "../../../services/alert/alert";

@Component({
  selector: 'app-page-editor',
  templateUrl: 'page-editor.component.html',
  styleUrls: ['page-editor.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default,
  inputs: ['ConfigEntry']
})
export class PageEditorComponent implements OnInit {
  private content: string = "";
  private isPreviewing: boolean = false;
  private ConfigEntry: string;
  private loaded: boolean = false;
  private contentHTML: SafeHtml = "";

  constructor(private configService: ConfigService, private sanitizer: DomSanitizer, private alertService: AlertService) { }

  ngOnInit() {
    this.configService.getValue(this.ConfigEntry)
      .subscribe((value) => {
        this.content = value;
        this.loaded = true;
      }, () => this.loaded = true);
  }

  onSubmitContent() {
    this.configService.setValue(this.ConfigEntry, this.content)
      .then(() => {
        const alert = new Alert();
        alert.Text = "Content updated!";
        alert.Type = "success";
        this.alertService.addAlert(alert);
      });
  }

  onTogglePreview() {
    this.contentHTML = this.sanitizer.bypassSecurityTrustHtml(this.content);
    this.isPreviewing = !this.isPreviewing;
  }

}
