export const usersKeys = {
  all: ["users"] as const,
  suggested: () => [...usersKeys.all, "suggested"] as const,
};
