import {Component, OnInit, ViewChild} from '@angular/core';
import {List} from "../../../services/list/list.model";
import {ListService} from "../../../services/list/list.service";
import {ModalDirective} from "ng2-bootstrap";

@Component({
  selector: 'app-lists-editor',
  templateUrl: './lists-editor.component.html',
  styleUrls: ['./lists-editor.component.scss']
})
export class ListsEditorComponent implements OnInit {
  @ViewChild('whitelistEditModal') public whitelistEditModal:ModalDirective;
  @ViewChild('blacklistEditModal') public blacklistEditModal:ModalDirective;
  private whitelist: List [] = [];
  private blacklist: List [] = [];
  private editingList: List = new List();

  constructor(private listService: ListService) { }

  ngOnInit() {
    this.listService.getLists()
      .subscribe(lists => {
        this.whitelist = lists.filter((entry) => entry.Type == "WHITELIST");
        this.blacklist = lists.filter((entry) => entry.Type == "BLACKLIST");
      });
  }

  addWhitelist(){
    this.editingList = new List();
    this.whitelistEditModal.show();
  }

  addBlacklist(){
    this.blacklistEditModal.show();
  }

  submitWhiteList(){
    console.log("Submit Whitelist")
  }

  submitBlackList(){
    console.log("Submit Blacklist")
  }

  removeFromList(){
    console.log("Take off list")
  }

  editItem(){
    console.log("edit Item")
  }

}
