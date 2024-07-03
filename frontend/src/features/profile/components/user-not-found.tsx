import { ProfileHeaderSkeleton } from '../skeletons';

export const UserNotFound = () => {
  return (
    <div className="min-h-screen flex-[4_4_0] border-r border-gray-700">
      <ProfileHeaderSkeleton />
      <div className="px-20 py-10">
        <h1 className="mt-14 text-3xl font-extrabold">This account doesn’t exist</h1>
        <p className="text-md mt-1 text-gray-500">Try searching for another.</p>
      </div>
    </div>
  );
};
