import { Types } from 'mongoose';

const ObjectId = Types.ObjectId;

export const toObjectId = (id: string) => {
  return new ObjectId(id);
};
