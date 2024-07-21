import { apiService } from "../../../app/api-service";
import { IPaginatedResponse } from "../../../types";
import {
  ICommentPostPayload,
  ICommentPostResponse,
  IGetPostsPayload,
  IPost,
  IPostCreatePayload,
  IPostCreateResponse,
} from "../types";

class PostsService {
  public async getAllPosts(data: IGetPostsPayload) {
    const res = await apiService.get<IPaginatedResponse<IPost>>(`/posts`, {
      params: data,
    });
    return res.data;
  }

  public async getFollowingPosts(data: IGetPostsPayload) {
    const res = await apiService.get<IPaginatedResponse<IPost>>(
      "/posts/following",
      { params: data }
    );
    return res.data;
  }

  public async getUserPosts(data: IGetPostsPayload & { username: string }) {
    const { username, ...params } = data;
    const res = await apiService.get<IPaginatedResponse<IPost>>(
      `/posts/user/${username}`,
      { params }
    );
    return res.data;
  }

  public async getLikedPosts(data: IGetPostsPayload & { userId: string }) {
    const { userId, ...params } = data;

    const res = await apiService.get<IPaginatedResponse<IPost>>(
      `/posts/liked/${userId}`,
      { params }
    );

    return res.data;
  }

  public async createPost(data: IPostCreatePayload) {
    const { text, img } = data;

    const formData = new FormData();
    if (img) formData.append("image", img);
    if (text) formData.append("text", text);

    const res = await apiService.post<IPostCreateResponse>("/posts", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data;
  }

  public async deletePost(id: string) {
    const res = await apiService.delete<boolean>(`/posts/${id}`);
    return res.data;
  }

  public async likePost(postId: string) {
    const res = await apiService.patch<string[]>(`/posts/like/${postId}`);
    return res.data;
  }

  public async commentPost(postId: string, data: ICommentPostPayload) {
    const res = await apiService.patch<ICommentPostResponse>(
      `/posts/comment/${postId}`,
      data
    );
    return res.data;
  }

  public async saveUnsavePost(postId: string) {
    await apiService.post("/posts/save", { postId });
  }

  public async getSavedPosts(data: IGetPostsPayload) {
    const res = await apiService.get<IPaginatedResponse<IPost>>(
      "/posts/saved",
      { params: data }
    );
    return res.data;
  }
}

export const postsService = new PostsService();
