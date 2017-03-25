import { Serializable } from "../../shared/serializable";

export class AttributeDateValue extends Serializable {
  "Id": string;
  "Value": string;
  "AttributeId": number;
  "UserId": number;
  "createdAt": string;
  "updatedAt": string;
}
