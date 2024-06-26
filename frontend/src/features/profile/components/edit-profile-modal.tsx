import { useForm } from "react-hook-form";
import { IEditProfileFormData } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditProfileSchema } from "../validators";
import { useUpdateProfile } from "../../users";
import { useAuthUser } from "../../auth";

export const EditProfileModal = () => {
  const dialog = document.getElementById(
    "edit_profile_modal"
  ) as HTMLDialogElement;

  const { data: authUser } = useAuthUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditProfileFormData>({
    defaultValues: { ...authUser },
    resolver: zodResolver(EditProfileSchema),
  });

  const { mutate: updatedProfile, isPending: isUpdateProfilePending } =
    useUpdateProfile();

  const onFormSubmit = (data: IEditProfileFormData) => {
    if (!authUser) return;
    updatedProfile({ ...data, id: authUser._id });
    dialog?.close();
  };

  return (
    <>
      <button
        className="btn btn-outline rounded-full btn-sm"
        onClick={() => dialog?.showModal()}
      >
        Edit profile
      </button>
      <dialog id="edit_profile_modal" className="modal">
        <div className="modal-box border rounded-md border-gray-700 shadow-md">
          <h3 className="font-bold text-lg my-3">Update Profile</h3>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onFormSubmit)}
          >
            <div className="flex flex-wrap gap-2">
              <input
                type="text"
                placeholder="Full Name"
                className="flex-1 input border border-gray-700 rounded p-2 input-md"
                {...register("fullName")}
              />
              <span className="text-red-500">{errors?.fullName?.message}</span>
              <input
                type="text"
                placeholder="Username"
                className="flex-1 input border border-gray-700 rounded p-2 input-md"
                {...register("username")}
              />
              <span className="text-red-500">{errors?.username?.message}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 input border border-gray-700 rounded p-2 input-md"
                {...register("email")}
              />
              <span className="text-red-500">{errors?.email?.message}</span>
              <textarea
                placeholder="Bio"
                className="flex-1 input border border-gray-700 rounded p-2 input-md"
                {...register("bio")}
              />
              <span className="text-red-500">{errors?.bio?.message}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <input
                type="password"
                placeholder="Current Password"
                className="flex-1 input border border-gray-700 rounded p-2 input-md"
                {...register("currentPassword")}
              />
              <span className="text-red-500">
                {errors?.currentPassword?.message}
              </span>
              <input
                type="password"
                placeholder="New Password"
                className="flex-1 input border border-gray-700 rounded p-2 input-md"
                {...register("newPassword")}
              />
              <span className="text-red-500">
                {errors?.newPassword?.message}
              </span>
            </div>
            <input
              type="text"
              placeholder="Link"
              className="flex-1 input border border-gray-700 rounded p-2 input-md"
              {...register("link")}
            />
            <span className="text-red-500">{errors?.link?.message}</span>
            <button
              className="btn btn-primary rounded-full btn-sm text-white"
              type="submit"
            >
              {isUpdateProfilePending ? "Updating..." : "Update"}
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button className="outline-none">close</button>
        </form>
      </dialog>
    </>
  );
};
