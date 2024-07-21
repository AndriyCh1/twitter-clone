import mongoose from 'mongoose';

export interface IPost {
  _id: string;
  user: string;
  text: string;
  img: string;
  likes: string[];
  comments: {
    text: string;
    user: string;
  }[];
}

// FIXME: Fix bad design - likes & comments
const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    text: { type: String },
    img: { type: String },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    comments: [
      {
        text: { type: String, required: true },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model<IPost>('Post', postSchema);

export { Post };
