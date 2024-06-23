import { apiService } from "../../../app/api-service";
import {
  IFollowResponse,
  IGetUserProfileResponse,
  ISuggestedUsersResponse,
} from "../types";

class UsersService {
  public async getSuggestedUsers() {
    const res =
      await apiService.get<ISuggestedUsersResponse>("/users/suggested");
    return res.data;
  }

  public async getUserProfile(username: string) {
    const res = await apiService.get<IGetUserProfileResponse>(
      `/users/profile/${username}`
    );
    return res.data;
  }

  public async follow(userId: string) {
    const res = await apiService.put<IFollowResponse>(
      `/users/follow/${userId}`
    );
    return res.data;
  }
}

export const usersService = new UsersService();
