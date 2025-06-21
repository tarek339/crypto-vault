import {
  ChangeEventHandler,
  Dispatch,
  FormEventHandler,
  JSX,
  SetStateAction,
} from "react";

export interface BasicCardProps {
  title: string;
  description: string;
  subdescription?: string;
  children: React.ReactNode;
}

export interface FormProps {
  action: string | ((formData: FormData) => void | Promise<void>) | undefined;
  children: JSX.Element | JSX.Element[];
  onSubmit?: FormEventHandler<HTMLFormElement>;
}

export interface InputProps {
  label?: string;
  placeholder?: string;
  name: string;
  type: string;
  error?: string;
  readOnly?: boolean;
  value?: string | number | readonly string[] | undefined;
  hidden?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
}

export interface SelectProps {
  onValueChange(value: string): void;
  placeholder: React.ReactNode;
  selectItems: string[];
  label?: string;
  name?: string;
  error?: string;
  readonly?: boolean;
}

export interface CaptchaProps {
  name: string;
  captchaName: string;
  captchaError: string;
  setCaptchaError: React.Dispatch<React.SetStateAction<string>> | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  captcha: string;
  setCaptcha: Dispatch<SetStateAction<string>>;
  generateRandomString: (length?: number) => string;
}

export interface ModalProps {
  triggerTitle: string | JSX.Element;
  dialogTitle: string;
  description: string;
  subDescription?: string;
  alternativDescription?: string;
  dialogFooter?: JSX.Element | JSX.Element[] | string;
  children?: JSX.Element | JSX.Element[] | string;
}

export interface TableProps {
  headers: string[] | null;
  footer?: string[] | null;
  children: React.ReactNode;
  colSpan?: number;
  tableCaption?: string;
  footerTitel?: string;
  pagination?: JSX.Element;
  className?: string;
}

export interface NavBarProps {
  className?: string;
}

export interface PaginationProps {
  items: Array<unknown>;
  setNextPage: (value: SetStateAction<number>) => void;
  setPrevPage: (value: SetStateAction<number>) => void;
  prevPage: number;
  nextPage: number;
  selectItems: string[];
}

interface DropdownItemProps {
  value: string;
  trigger: string;
  content: string | JSX.Element;
}

export interface DropdownProps {
  dropDownItems: DropdownItemProps[];
}

export interface TitleProps {
  title: string | JSX.Element;
  className?: string;
  center?: boolean;
}

export interface TextProps {
  text: string;
}

export interface BasicAlertProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  variant?: "default" | "destructive" | "warning";
}
