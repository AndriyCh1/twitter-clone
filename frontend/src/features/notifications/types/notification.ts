import { IUserModel } from "../../../types/user";

export interface INotification {
  _id: string;
  from: IUserModel;
  to: string;
  type: "follow" | "like";
  read: boolean;
}
