import { apiService } from "../../../app/api-service";
import { ISuggestedUsersResponse } from "../types/suggested-users";

class UsersService {
  public async getSuggestedUsers() {
    const res =
      await apiService.get<ISuggestedUsersResponse>("/users/suggested");
    return res.data;
  }
}

export const usersService = new UsersService();
