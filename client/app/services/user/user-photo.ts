import { Serializable } from "../../shared/serializable";

export class UserPhoto extends Serializable{
  Id: number;
  AttachmentId: number;
  UserId: number;
  createdAt: string;
  updatedAt: string;
}
