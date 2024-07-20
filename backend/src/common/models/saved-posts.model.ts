import mongoose from 'mongoose';

export interface ISavedPost {
  userId: string;
  postId: string;
}

export const savedPostSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      require: true,
    },
  },
  {
    timestamps: true,
    collection: 'saved-posts',
  }
);

savedPostSchema.index({ userId: 1, postId: 1 }, { unique: true });

const SavedPost = mongoose.model<ISavedPost>('saved-posts', savedPostSchema);

export { SavedPost };
