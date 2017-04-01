import { Component, OnInit } from '@angular/core';
import {User} from '../../services/user/user';
import {UserService} from '../../services/user/user.service';


@Component({
  selector: 'app-admin-approval-queue',
  templateUrl: './admin-approval-queue.component.html',
  styleUrls: ['./admin-approval-queue.component.scss']
})
export class AdminApprovalQueueComponent implements OnInit {
  private users: User[] = [];
  private bannedUsers:User[] = [];
  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe(users => {
        this.users = users.filter((entry) => entry.Status == "PENDING_REVIEW");
      });
    this.userService.getUsers()
      .subscribe(users => {
        this.bannedUsers = users.filter((entry) => entry.Status == "BANNED");
      });
  }

  approveUser(user:User){
    user.Status = "ACTIVE";
    this.users.splice(this.users.indexOf(user), 1);
  }

  banUser(user:User){
    user.Status = "BANNED";
    this.users.splice(this.users.indexOf(user), 1);
    this.bannedUsers.push(user);
  }

  approveUserFromBan(user:User){
    user.Status = "ACTIVE";
    this.bannedUsers.splice(this.bannedUsers.indexOf(user), 1);
  }

}
