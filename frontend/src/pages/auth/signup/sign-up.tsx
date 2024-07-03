import { Helmet } from "../../../components/common";
import { SignUpForm } from "../../../features/auth";

export const SignUpPage = () => {
  return (
    <Helmet title="Sign Up">
      <SignUpForm />
    </Helmet>
  );
};
