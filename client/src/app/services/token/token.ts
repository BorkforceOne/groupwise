import { Serializable } from "../../shared/serializable";

export class Token extends Serializable {
  "Id": number;
  "Token": string;
  "Type": "REGISTRATION" | "FORGOT_PASSWORD";
  "UserId": number;
  "createdAt": string;
  "updatedAt": string;
  "Password": string;
  "PasswordVerify": string;
}
