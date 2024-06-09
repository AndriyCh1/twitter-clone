import { Response } from 'express';

export const attachJwtCookie = (res: Response, token: string) => {
  res.cookie('jwt', token, {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV !== 'development',
  });
};

export const removeJwtCookie = (res: Response) => {
  res.cookie('jwt', '', { maxAge: 0 });
  return true;
};
