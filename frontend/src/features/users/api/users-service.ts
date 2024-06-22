import { apiService } from "../../../app/api-service";
import {
  IGetUserProfileResponse,
  ISuggestedUsersResponse,
} from "../types/suggested-users";

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
}

export const usersService = new UsersService();
