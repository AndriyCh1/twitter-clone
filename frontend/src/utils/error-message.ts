import { AxiosError, isAxiosError } from "axios";

export const getErrorMessage = (error: Error | AxiosError) => {
  let errorMessage = "";

  if (isAxiosError(error)) {
    errorMessage = error.response?.data?.errorMessage;
  }

  return errorMessage || error.message || "Something went wrong";
};
