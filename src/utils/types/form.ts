export type formState =
  | "submitted"
  | "error"
  | "success"
  | "initial"
  | "noerror";

export type inputName = "email" | "password" | "name" | "username" | "code";

export type inputValue = string | number | readonly string[] | undefined;

export type validateFunction = (value: inputValue) => string | undefined;
export interface initialValues {
  email?: inputValue;
  password?: inputValue;
  name?: inputValue;
  username?: inputValue;
  code?: inputValue;
}
