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
    this.editingList = new List();
    this.blacklistEditModal.show();
  }

  submitWhiteList(){
    if(this.editingList.Id !== undefined){
      this.listService.updateList(this.editingList)
        .subscribe(list =>{
          this.whitelistEditModal.hide()
        });
    }else {
      this.editingList.Type = "WHITELIST";
      this.listService.createList(this.editingList)
        .subscribe(list=>{
          this.whitelistEditModal.hide();
          this.whitelist.push(list);
        });

    }
  }

  submitBlackList(){
    if(this.editingList.Id !== undefined){
      this.listService.updateList(this.editingList)
        .subscribe(list =>{
          this.blacklistEditModal.hide()
        });
    }else {
      this.editingList.Type = "BLACKLIST";
      this.listService.createList(this.editingList)
        .subscribe(list=>{
          this.blacklistEditModal.hide();
          this.blacklist.push(list);
        });

    }
  }

  removeFromList(item){
    if(item.Type === "BLACKLIST"){
      this.listService.deleteList(item)
        .subscribe(list =>{
          this.blacklist.splice(this.blacklist.indexOf(item), 1);
        });
    }else if(item.Type === "WHITELIST") {
      this.listService.deleteList(item)
        .subscribe(list => {
          this.whitelist.splice(this.whitelist.indexOf(item), 1);
        });
    }
  }

  editItem(item){
    this.editingList = item;
    if(item.Type === "BLACKLIST"){
      this.blacklistEditModal.show();
    }else if(item.Type === "WHITELIST") {
      this.whitelistEditModal.show();
    }
  }

}
