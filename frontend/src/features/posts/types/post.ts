interface IUser {
  username: string;
  profileImg: string;
  fullName: string;
}

interface IComment {
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
}
