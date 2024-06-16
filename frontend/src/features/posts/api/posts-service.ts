import { apiService } from "../../../app/api-service";
import { IPost } from "../types";

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

  public async deletePost(id: string) {
    const res = await apiService.delete<boolean>(`/posts/${id}`);
    return res.data;
  }
}

export const postsService = new PostsService();
