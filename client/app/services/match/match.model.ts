import {Serializable} from "../../shared/serializable";

export class Match extends Serializable {
  Id: number;
  HostUserId: number;
  StudentUserId: number;
  Status: "PROPOSED" | "APPROVED" | "REJECTED";
  createdAt: string;
  updatedAt: string;
}
