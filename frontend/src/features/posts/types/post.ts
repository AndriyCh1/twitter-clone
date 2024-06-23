export interface IUser {
  _id: string;
  username: string;
  fullName: string;
  email: string;
  followers: string[];
  following: string[];
  profileImg: string;
  coverImg: string;
  bio: string;
  link: string;
  likedPosts: string[];
}

export interface IComment {
  _id: string;
  text: string;
  user: IUser;
}

export interface IPost {
  _id: string;
  text: string;
  img?: string;
  user: IUser;
  comments: IComment[];
  likes: string[];

  createdAt: Date;
  updatedAt: Date;
}
