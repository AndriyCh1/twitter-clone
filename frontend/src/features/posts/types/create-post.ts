import { IComment } from "./post";

export interface IPostCreatePayload {
  text: string;
  img?: File;
}

export interface IPostCreateResponse {
  _id: string;
  text: string;
  img?: string;
  user: string;
  comments: IComment[];
  likes: string[];
  createdAt: string;
  updatedAt: string;
}
