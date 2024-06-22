export interface UpdateProfileData {
  fullName?: string;
  email?: string;
  username?: string;
  profileImg?: Express.Multer.File;
  coverImg?: Express.Multer.File;
  bio?: string;
  currentPassword?: string;
  newPassword?: string;
  link?: string;
}
