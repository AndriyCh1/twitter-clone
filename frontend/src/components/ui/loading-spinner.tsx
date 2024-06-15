export interface IProps {
  size?: "xs" | "sm" | "md" | "lg";
}

export const LoadingSpinner = ({ size = "md" }: IProps) => {
  const sizeClass = `loading-${size}`;
  return <span className={`loading loading-spinner ${sizeClass}`} />;
};
