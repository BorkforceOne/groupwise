import { Serializable } from "../../shared/serializable";

export class User extends Serializable{
  "Id": number;
  "Firstname": string;
  "Lastname": string;
  "Email": string;
  "Type": "ADMINISTRATOR" | "HOST" | "STUDENT";
  "Age": string;
  "Gender": "MALE" | "FEMALE" | "OTHER";
  "Phone": string;
  "Status": "ACTIVE" | "BANNED" | "PENDING_REVIEW";
  "ReceiveGeneralNotifications": boolean;
  "ReceiveNewMatchNotifications": boolean;
  "ReceiveMessageNotifications": boolean;
  "createdAt": string;
  "updatedAt": string;
}
