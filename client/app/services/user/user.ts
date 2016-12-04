import { Serializable } from "../../shared/serializable";

export class User extends Serializable{
  "Firstname": string;
  "Lastname": string;
  "Email": string;
  "Id": number;
  "Type": string;
  "updatedAt": string;
  "createdAt": string;

  public getDisplayName () {
    return this.Firstname + " " + this.Lastname;
  }
}
