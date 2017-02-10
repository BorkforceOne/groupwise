import { Serializable } from "../../shared/serializable";

export class AttributeRangeValue extends Serializable {
  "Id": string;
  "Value": number;
  "AttributeId": number;
  "UserId": number;
  "createdAt": string;
  "updatedAt": string;
}
