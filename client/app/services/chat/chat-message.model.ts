import { Serializable } from "../../shared/serializable";
import {User} from "../user/user";

export class ChatMessage extends Serializable{
  "User": User;
  "Message": string;
  "ReceivedAt": Date;
}
