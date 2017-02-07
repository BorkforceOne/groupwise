import {Serializable} from "../../../shared/serializable";

export class StudentProfile extends Serializable{
  "UserId": number;
  "Smoke": boolean;
  "Alcohol": boolean;
  "Car": boolean;
  "Married": boolean;
  "AlreadyHosting": boolean;
  "Phone": string;
  "Allergies": string;
  "Distance": number;
  "ChildrenName": string;
  "ChildrenGender": string;
  "ChildrenAge": string;
  "Hobbies": string;
  "Citizenship": string;
  "Languages": string;
  "NAUStartDate": string;
  "Major": string;
  "StudentClassification": "PIE" | "UNDERGRADUATE" | "GRADUATE";
  "PreferredHostType": "FAMILY" | "COUPLE" | "SINGLE";
  "PreferredHostAlcohol": boolean;
  "PreferredHostSmoke": boolean;
  "ReceiveGeneralNotifications": boolean;
  "ReceiveNewMatchNotifications": boolean;
  "ReceiveMessageNotifications": boolean;
}
