import { Serializable } from "../../shared/serializable";

export class AttributeEnumValue extends Serializable {
  "Id": string;
  "Value": string[];
  "AttributeId": number;
  "UserId": number;
  "createdAt": string;
  "updatedAt": string;
}
