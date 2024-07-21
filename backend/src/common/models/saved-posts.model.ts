import mongoose from 'mongoose';

export interface ISavedPost {
  user: string;
  post: string;
}

export const savedPostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'saved-posts',
  }
);

savedPostSchema.index({ user: 1, post: 1 }, { unique: true });

const SavedPost = mongoose.model<ISavedPost>('saved-posts', savedPostSchema);

export { SavedPost };
