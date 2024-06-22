import { useQuery } from "@tanstack/react-query";
import { usersKeys } from "./users-keys";
import { usersService } from "./users-service";

export const useGetSuggestedUsers = () => {
  return useQuery({
    queryKey: usersKeys.suggested(),
    queryFn: () => usersService.getSuggestedUsers(),
  });
};
