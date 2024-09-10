import { ButtonHTMLAttributes, ReactNode } from 'react';

export enum EButtonType {
  CONTAINED = 'contained',
  OUTLINED = 'outlined',
  TEXT = 'text',
}
export enum EButtonSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}
export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  size?: EButtonSize;
  variant?: EButtonType;
}
