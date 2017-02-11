import { Serializable } from "../../shared/serializable";

export class AttributeRange extends Serializable {
  "Id": number;
  "Name": string;
  "Description": string;
  "ForType": "STUDENT" | "HOST" | "BOTH";
  "Min": number;
  "Max": number;
  "isInt": boolean;
  "createdAt": string;
  "updatedAt": string;
}
