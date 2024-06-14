export const routes = {
  home: { path: "/", build: () => "/" },
  login: { path: "/login", build: () => "/login" },
  signup: { path: "/signup", build: () => "/signup" },
  notifications: { path: "/notifications", build: () => "/notifications" },
  profile: {
    path: "/profile/:username",
    build: (username: string) => `/profile/${username}`,
  },
};
