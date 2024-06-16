import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ILoginFormData } from "../types";
import { LoginSchema } from "../validators";
import { MdOutlineMail, MdPassword } from "react-icons/md";
import { Link } from "react-router-dom";
import { XSvg } from "../../../components/icons";
import { routes } from "../../../app/consts";
import { useLogin } from "../api";
import { getErrorMessage } from "../../../utils/error-message";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const { mutate: loginMutate, error, isError } = useLogin();
  const onSubmit = (data: ILoginFormData) => {
    loginMutate(data);
  };

  const errorsArr = Object.values(errors);

  return (
    <div className="max-w-screen-xl mx-auto flex h-screen">
      <div className="flex-1 hidden lg:flex items-center  justify-center">
        <XSvg className="lg:w-2/3 fill-white" />
      </div>
      <div className="flex-1 flex flex-col justify-center items-center">
        <form
          className="lg:w-2/3 mx-auto md:mx-20 flex gap-4 flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          <XSvg className="w-24 lg:hidden fill-white" />
          <h1 className="text-4xl font-extrabold text-white">{"Let's"} go.</h1>
          <label className="input input-bordered rounded flex items-center gap-2">
            <MdOutlineMail />
            <input
              type="text"
              className="grow"
              placeholder="username"
              {...register("email")}
            />
          </label>
          <label className="input input-bordered rounded flex items-center gap-2">
            <MdPassword />
            <input
              type="password"
              className="grow"
              placeholder="Password"
              {...register("password")}
            />
          </label>
          <button className="btn rounded-full btn-primary text-white">
            Login
          </button>
          {!!errorsArr.length && (
            <p className="text-red-500">{errorsArr[0].message}</p>
          )}
          {isError && <p className="text-red-500">{getErrorMessage(error)}</p>}
        </form>
        <div className="flex flex-col lg:w-2/3 gap-2 mt-4">
          <p className="text-white text-lg">{"Don't"} have an account?</p>
          <Link to={routes.signup.build()}>
            <button className="btn rounded-full btn-primary text-white btn-outline w-full">
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
