import { IPost } from "./post";

export interface ICommentPostPayload {
  text: string;
}

export type ICommentPostResponse = IPost;
