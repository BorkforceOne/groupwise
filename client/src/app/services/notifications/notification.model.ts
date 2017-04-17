import {Serializable} from "../../shared/serializable";

export class NotificationModel extends Serializable {
  Message: string;
  createdAt: string;
  updatedAt: string;
}
