export const usersKeys = {
  all: ["users"] as const,
  suggested: () => [...usersKeys.all, "suggested"] as const,
  profile: (userId: string) => [...usersKeys.all, "profile", userId] as const,
};
