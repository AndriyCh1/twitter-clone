import { Helmet } from "../../../components/ui";
import { LoginForm } from "../../../features/auth";

export const LoginPage = () => {
  return (
    <Helmet title="Login">
      <LoginForm />
    </Helmet>
  );
};
