export const usersKeys = {
  all: ["users"] as const,
  suggested: () => [...usersKeys.all, "suggested"] as const,
  profile: (username: string) =>
    [...usersKeys.all, "profile", username] as const,
};
