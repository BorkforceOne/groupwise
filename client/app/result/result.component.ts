import { Component, OnInit } from '@angular/core';

import { RandomUserService } from '../random-user.service.ts';
import { RandomUser } from '../random-user.ts';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  providers: [RandomUserService]
})
export class ResultComponent implements OnInit {

  constructor(private randomUserService: RandomUserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.randomUserService.getUsers()
      .subscribe(
        items => this.users = items,
        error =>  this.errorMessage = <any>error);
  }

  private users: RandomUser[];
  private errorMessage: String;
}
