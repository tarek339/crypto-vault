import { JSX, MouseEventHandler } from "react";

export interface SingInProps {
  onSingUp: MouseEventHandler<HTMLSpanElement> | undefined;
}

export interface SingUpProps {
  onSingIn: MouseEventHandler<HTMLSpanElement> | undefined;
}

export interface DeleteUserProps {
  id: string;
}

export interface ChangePasswordProps {
  id: string;
}

export interface ChangeUserNameProps {
  id: string;
}

export interface CourseProps {
  icon: JSX.Element | undefined;
  bgColor: string;
  crypto: string;
  euro: JSX.Element | string;
  dollar: JSX.Element | string;
}

export interface PayOutProps {
  id: string;
  availableAmount: string;
}

export interface DepositProps {
  id: string;
}

export interface BalanceProps {
  balance: string;
  price: string;
  exchangeRate: string;
}

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export interface CopyButtonProps {
  value: string;
  title: string;
}
