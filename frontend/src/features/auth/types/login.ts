export interface ILoginFormData {
  email: string;
  password: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface ILoginResponse {
  _id: string;
  fullName: string;
  username: string;
  email: string;
  profileImg: string;
  coverImg: string;
  followers: string[];
  following: string[];
}

export interface IAuthUserResponse {
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
  createdAt: string;
  updatedAt: string;
}
