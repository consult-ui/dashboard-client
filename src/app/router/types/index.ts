import { JSX } from 'react';

export enum ELinks {
  HOME = '/',
  DASHBOARD = '/dashboard/',
  SIGN_IN = '/sign-in',
  PASSWORD_RECOVERY = '/password-recovery',
  PASSWORD_RESET = '/password-reset',
  // вложенные роуты
  CHAT = 'chat',
  USER = 'user',
  COMPANY = 'company',
}

export type Route = {
  id: string;
  link: string;
  element: JSX.Element;
  children?: Omit<Route, 'children'>[];
};
