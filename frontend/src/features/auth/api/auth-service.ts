import { apiService } from "../../../app/api-service";
import {
  IAuthUserResponse,
  ILoginPayload,
  ILoginResponse,
  ISignUpPayload,
  ISignUpResponse,
} from "../types";

class AuthService {
  public async signup(data: ISignUpPayload) {
    const res = await apiService.post<ISignUpResponse>("/auth/signup", data);
    return res.data;
  }

  public async login(data: ILoginPayload) {
    const res = await apiService.post<ILoginResponse>("/auth/login", data);
    return res.data;
  }

  public async logout() {
    const res = await apiService.post<boolean>("/auth/logout");
    return res.data;
  }

  public async getAuthUser() {
    const res = await apiService.get<IAuthUserResponse>("/auth/me");
    return res.data;
  }
}

export const authService = new AuthService();
