import { Serializable } from "../../shared/serializable";

export class AttributeString extends Serializable {
  "Id": number;
  "Name": string;
  "Description": string;
  "ForType": "STUDENT" | "HOST" | "BOTH";
  "MaxLength": number;
}
