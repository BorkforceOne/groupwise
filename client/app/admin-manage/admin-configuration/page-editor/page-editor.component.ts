import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import {ConfigService} from "../../../services/config/config.service";

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

  constructor(private configService: ConfigService) { }

  ngOnInit() {
    this.configService.getValue(this.ConfigEntry)
      .subscribe((value) => {
        this.content = value;
      });
  }

  onSubmitContent() {
    this.configService.setValue(this.ConfigEntry, this.content);
  }

  onTogglePreview() {
    this.isPreviewing = !this.isPreviewing;
  }

}
