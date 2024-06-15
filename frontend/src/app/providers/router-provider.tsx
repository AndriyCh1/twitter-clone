import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage } from "../../pages/home";
import { SignUpPage } from "../../pages/auth/signup";
import { LoginPage } from "../../pages/auth/login";
import { MainLayout } from "../../components/layouts";
import { routes } from "../consts";
import { ProfilePage } from "../../pages/profile";
import { NotificationsPage } from "../../pages/notifications";

export const router = createBrowserRouter([
  { path: routes.signup.path, element: <SignUpPage /> },
  { path: routes.login.path, element: <LoginPage /> },
  {
    path: "",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: routes.home.path, element: <HomePage /> },
      { path: routes.profile.path, element: <ProfilePage /> },
      { path: routes.notifications.path, element: <NotificationsPage /> },
    ],
  },
]);

export const Provider = () => {
  return <RouterProvider router={router} />;
};
