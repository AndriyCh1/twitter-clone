export interface IUserRequest extends Request {
  user: {
    id: string;
    email: string;
  };
}
