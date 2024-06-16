import { useMutation } from "@tanstack/react-query";
import { ISignUpPayload } from "../types";
import { authService } from "./auth-service";

export const useSignUp = () => {
  return useMutation({
    mutationFn: (data: ISignUpPayload) => authService.signup(data),
  });
};
