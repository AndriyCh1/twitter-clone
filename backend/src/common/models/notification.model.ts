import mongoose from 'mongoose';

export enum NotificationType {
  FOLLOW = 'follow',
  LIKE = 'like',
}
export interface INotification extends mongoose.Document {
  from: string;
  to: string;
  type: 'follow' | 'like';
  read: boolean;
}

const notificationSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: NotificationType,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model<INotification>('Notification', notificationSchema);

export { Notification };
