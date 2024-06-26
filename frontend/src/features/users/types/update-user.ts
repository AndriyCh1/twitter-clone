import { IUserModel } from "./user-model";

export interface IUpdateUserPayload {
  fullName?: string;
  username?: string;
  email?: string;
  bio?: string;
  link?: string;
  coverImg?: File;
  profileImg?: File;
  newPassword?: string;
  currentPassword?: string;
}

export type IUpdateUserResponse = IUserModel;
