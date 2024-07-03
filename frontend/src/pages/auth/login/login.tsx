import { Helmet } from "../../../components/common";
import { LoginForm } from "../../../features/auth";

export const LoginPage = () => {
  return (
    <Helmet title="Login">
      <LoginForm />
    </Helmet>
  );
};
