export interface IProfileUser {
  _id: string;
  fullName: string;
  username: string;
  profileImg: string;
  coverImg: string;
  bio: string;
  link: string;
  following: string[];
  followers: string[];
}
