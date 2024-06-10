import mongoose from 'mongoose';
export interface IUser extends mongoose.Document {
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
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    password: { type: String, required: true, minLength: 6 },
    email: { type: String, required: true, unique: true },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: [],
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: [],
      },
    ],
    profileImg: { type: String, default: '' },
    coverImg: { type: String, default: '' },
    bio: { type: String, default: '' },
    link: { type: String, default: '' },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>('User', userSchema);
export { User };
