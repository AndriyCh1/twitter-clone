import { zodResolver } from "@hookform/resolvers/zod";
import { XSvg } from "../../../components/icons";
import { SignUpSchema } from "../validators";
import { useForm } from "react-hook-form";
import { ISignUpFormData } from "../types";
import {
  MdDriveFileRenameOutline,
  MdOutlineMail,
  MdPassword,
} from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { routes } from "../../../app/consts";

export const SignUpForm = () => {
  const { register, handleSubmit } = useForm<ISignUpFormData>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = (data: ISignUpFormData) => {
    // FIXME:
    console.log(data);
  };

  // FIXME:
  const isError = false;

  return (
    <div className="max-w-screen-xl mx-auto flex h-screen px-10">
      <div className="flex-1 hidden lg:flex items-center  justify-center">
        <XSvg className=" lg:w-2/3 fill-white" />
      </div>
      <div className="flex-1 flex flex-col justify-center items-center">
        <form
          className="lg:w-2/3  mx-auto md:mx-20 flex gap-4 flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          <XSvg className="w-24 lg:hidden fill-white" />
          <h1 className="text-4xl font-extrabold text-white">Join today.</h1>
          <label className="input input-bordered rounded flex items-center gap-2">
            <MdOutlineMail />
            <input
              type="email"
              className="grow"
              placeholder="Email"
              {...register("email")}
            />
          </label>
          <div className="flex gap-4 flex-wrap">
            <label className="input input-bordered rounded flex items-center gap-2 flex-1">
              <FaUser />
              <input
                type="text"
                className="grow"
                placeholder="Username"
                {...register("username")}
              />
            </label>
            <label className="input input-bordered rounded flex items-center gap-2 flex-1">
              <MdDriveFileRenameOutline />
              <input
                type="text"
                className="grow"
                placeholder="Full Name"
                {...register("fullName")}
              />
            </label>
          </div>
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
            Sign up
          </button>
          {isError && <p className="text-red-500">Something went wrong</p>}
        </form>
        <div className="flex flex-col lg:w-2/3 gap-2 mt-4">
          <p className="text-white text-lg">Already have an account?</p>
          <Link to={routes.login.build()}>
            <button className="btn rounded-full btn-primary text-white btn-outline w-full">
              Sign in
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
