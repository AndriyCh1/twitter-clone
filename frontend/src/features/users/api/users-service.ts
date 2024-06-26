import { apiService } from "../../../app/api-service";
import {
  IFollowResponse,
  IGetUserProfileResponse,
  ISuggestedUsersResponse,
  IUpdateUserPayload,
  IUpdateUserResponse,
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

  public async updateUser(data: IUpdateUserPayload) {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    console.log(formData.entries());
    const res = await apiService.put<IUpdateUserResponse>(
      `/users/update`,
      formData
    );

    return res.data;
  }
}

export const usersService = new UsersService();
