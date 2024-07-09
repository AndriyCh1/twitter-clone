import { FC, PropsWithChildren } from "react";

interface IProps extends PropsWithChildren {
  title: string;
}

export const Helmet: FC<IProps> = ({ title, children }) => {
  document.title = `X | ${title}`;
  return <>{children}</>;
};
