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
  private loaded: boolean = false;

  private options: Object = {
    placeholderText: "Enter page content here",
    heightMin: 250,
    toolbarButtons: ['fullscreen', 'print', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript',
      'fontFamily', 'fontSize', '|', 'specialCharacters', 'color', 'emoticons', 'inlineStyle', 'paragraphStyle', '|',
      'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', 'insertHR', '-', 'insertLink',
      'insertImage', 'insertVideo', 'insertTable', 'undo', 'redo', 'clearFormatting', 'selectAll'],
    toolbarButtonsMD: ['fullscreen', 'bold', 'italic', 'underline', 'fontFamily', 'fontSize', 'color', 'paragraphStyle',
      'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', 'insertHR', 'insertLink', 'insertImage',
      'insertVideo', 'insertTable', 'undo', 'redo', 'clearFormatting']
  };

  constructor(private configService: ConfigService) { }

  ngOnInit() {
    this.configService.getValue(this.ConfigEntry)
      .subscribe((value) => {
        this.content = value;
        this.loaded = true;
      }, () => this.loaded = true);
  }

  onSubmitContent() {
    this.configService.setValue(this.ConfigEntry, this.content);
  }

  onTogglePreview() {
    this.isPreviewing = !this.isPreviewing;
  }

}
