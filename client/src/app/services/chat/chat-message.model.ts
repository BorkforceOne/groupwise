import { Serializable } from "../../shared/serializable";

export class ChatMessage extends Serializable{
  "UserId": number;
  "Message": string;
  "ReceivedAt": Date;
}
