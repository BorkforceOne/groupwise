import { Serializable } from "../../shared/serializable";

export class User extends Serializable{
  "Id": number;
  "Firstname": string;
  "Lastname": string;
  "Email": string;
  "Type": "ADMINISTRATOR" | "HOST" | "STUDENT";
  "Birthday": string;
  "Gender": "MALE" | "FEMALE" | "OTHER";
  "Phone": string;
  "ReceiveGeneralNotifications": boolean;
  "ReceiveNewMatchNotifications": boolean;
  "ReceiveMessageNotifications": boolean;
  "createdAt": string;
  "updatedAt": string;
}
