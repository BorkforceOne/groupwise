import { Serializable } from "../../shared/serializable";

export class AttributeRange extends Serializable {
  "Id": number;
  "Name": string;
  "Description": string;
  "Question": string;
  "ForType": "STUDENT" | "HOST" | "BOTH";
  "Min": number;
  "Max": number;
  "isInt": boolean;
  "Required": boolean;
  "createdAt": string;
  "updatedAt": string;
}
