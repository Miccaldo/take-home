import { FC } from "react";
import { XMarkIcon } from "./icons";

type ToggleButtonProps<T = React.ReactNode> = React.ComponentProps<"button"> & {
  children: T;
};

export const ToggleButton: FC<ToggleButtonProps> = ({ children, ...props }) => {
  return (
    <button className="hover:text-gray-700 transition-colors flex items-center justify-center" {...props}>
      {children}
    </button>
  );
};

export const DeleteButton: FC<Omit<ToggleButtonProps, "children">> = (props) => {
  return (
    <button className="hover:text-gray-700 transition-colors flex items-center justify-center" {...props}>
      <XMarkIcon />
    </button>
  );
};

