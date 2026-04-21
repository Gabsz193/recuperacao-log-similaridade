import { ReactNode } from "react";

export interface IButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  children: ReactNode;
}
