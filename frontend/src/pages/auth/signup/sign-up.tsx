import { Helmet } from "../../../components/ui";
import { SignUpForm } from "../../../features/auth";

export const SignUpPage = () => {
  return (
    <Helmet title="Sign Up">
      <SignUpForm />
    </Helmet>
  );
};
