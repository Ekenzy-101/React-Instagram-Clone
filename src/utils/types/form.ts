export type formState =
  | "submitted"
  | "error"
  | "success"
  | "initial"
  | "noerror";

export type inputName =
  | "email"
  | "password"
  | "new_password"
  | "new_password_confirmation"
  | "name"
  | "username"
  | "website"
  | "bio"
  | "phone_no"
  | "code"
  | "gender";

export type inputValue = string | number | readonly string[] | undefined;

export type validateFunction = (value: inputValue) => string | undefined;
export interface initialValues {
  email?: inputValue;
  password?: inputValue;
  new_password?: inputValue;
  new_password_confirmation?: inputValue;
  name?: inputValue;
  username?: inputValue;
  bio?: inputValue;
  code?: inputValue;
  website?: inputValue;
  phone_no?: inputValue;
  gender?: inputValue;
}

export interface inputOptions {
  label: string;
  variant?: "align-center" | "floating" | "justify-center";
  name: inputName;
  validate?: validateFunction;
  placeholder?: string;
  type?: string;
  showError?: boolean;
}
export interface selectOptions {
  label: string;
  options: { label: string; value: string }[];
  variant?: "align-center" | "floating" | "justify-center";
  name: inputName;
  validate?: validateFunction;
  placeholder?: string;
  showError?: boolean;
}
export interface textAreaOptions {
  label: string;
  variant?: "align-center" | "floating" | "justify-center";
  name: inputName;
  validate?: validateFunction;
  placeholder?: string;
  showError?: boolean;
}
