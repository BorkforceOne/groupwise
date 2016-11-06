import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service.ts';
import { User } from '../user.ts';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  providers: [UserService]
})
export class ResultComponent implements OnInit {

  constructor(private randomUserService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.randomUserService.getUsers()
      .subscribe(
        items => this.users = items,
        error =>  this.errorMessage = <any>error);
  }

  private users: User[];
  private errorMessage: String;
}
