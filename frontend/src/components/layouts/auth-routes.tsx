import { Navigate, Outlet } from "react-router-dom";
import { routes } from "../../app/consts";
import { useAuthUser } from "../../features/auth";
import { LoadingSpinner } from "../ui";

interface IProps {
  protect: boolean;
}
export const AuthRoutes = ({ protect = true }: IProps) => {
  const { data: user, isLoading, error } = useAuthUser();
  console.log(user, "user");

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  console.log(user);

  if (protect) {
    // if route is protected and user is not logged in redirect to login, else render children
    return user && !error ? (
      <Outlet />
    ) : (
      <Navigate to={routes.login.path} replace />
    );
  }

  // if route is public and user is logged in redirect to home, else render children
  return user && !error ? (
    <Navigate to={routes.home.path} replace />
  ) : (
    <Outlet />
  );
};
