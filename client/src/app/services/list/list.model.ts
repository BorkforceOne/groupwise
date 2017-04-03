import {Serializable} from "../../shared/serializable";

export class List extends Serializable {
  Id: number;
  Email: string;
  Type: "BLACKLIST" | "WHITELIST";
  createdAt: string;
  updatedAt: string;
}
