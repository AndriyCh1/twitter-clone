import { apiService } from "../../../app/api-service";
import {
  ICommentPostPayload,
  ICommentPostResponse,
  IPost,
  IPostCreatePayload,
  IPostCreateResponse,
} from "../types";

class PostsService {
  public async getAllPosts() {
    const res = await apiService.get<IPost[]>("/posts");
    return res.data;
  }

  public async getFollowingPosts() {
    const res = await apiService.get<IPost[]>("/posts/following");
    return res.data;
  }

  public async getUserPosts(username: string) {
    const res = await apiService.get<IPost[]>(`/posts/user/${username}`);
    return res.data;
  }

  public async getLikedPosts(userId: string) {
    const res = await apiService.get<IPost[]>(`/posts/liked/${userId}`);
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
}

export const postsService = new PostsService();
