export interface IUserModel {
  _id: string;
  username: string;
  fullName: string;
  password: string;
  email: string;
  followers: string[];
  following: string[];
  profileImg: string;
  coverImg: string;
  bio: string;
  link: string;
  likedPosts: string[];
  createdAt: Date;
  updatedAt: Date;
}
