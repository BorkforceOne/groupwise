import {Serializable} from "../../shared/serializable";

export class List extends Serializable {
  Id: number;
  Email: string;
  List: "BLACKLIST" | "WHITELIST";
  createdAt: string;
  updatedAt: string;
}
