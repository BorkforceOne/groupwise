import {Injectable, sequence} from '@angular/core';
import {UserRegistrationModel} from "./user-registration.model";
import {Router} from "@angular/router";

@Injectable()
export class UserRegistrationService {
  private userRegistrationModel: UserRegistrationModel = new UserRegistrationModel();
  private current : number = 0;
  private sequence : string[] = [];

  constructor(private router : Router) { }

  getUserRegistrationModel() : UserRegistrationModel {
    return this.userRegistrationModel;
  }

  setSequence(sequence : string[]) : void {
    this.sequence = sequence;
  }

  getSequence() : String[] {
    return this.sequence;
  }

  getProgress() : number {
    if (this.getLength() > 0)
      return this.getCurrent()/this.getLength();
    return 0;
  }

  getLength() : number {
    return this.sequence.length;
  }

  getCurrent() : number {
    return this.current + 1;
  }

  next() : void {
    if (this.current < this.sequence.length - 1) {
      this.current += 1;
      this.router.navigateByUrl(this.sequence[this.current]);
      // Force scroll to top
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
  }

  previous() : void {
    if (this.current > 0) {
      this.current -= 1;
      this.router.navigateByUrl(this.sequence[this.current]);
      // Force scroll to top
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
  }

}
