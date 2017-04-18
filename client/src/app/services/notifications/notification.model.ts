import {Serializable} from "../../shared/serializable";

export class NotificationModel extends Serializable {
  Message: string;
  LinkTo: string;
  OnClick: () =>  void;
  createdAt: string;
  updatedAt: string;
}
