import { AxiosError, isAxiosError } from "axios";

export const getErrorMessage = (error: Error | AxiosError) => {
  if (isAxiosError(error)) {
    return error.response?.data?.errorMessage || "An error occurred";
  }

  return error.message || "Something went wrong";
};
