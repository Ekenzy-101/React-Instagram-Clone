export type formState =
  | "submitted"
  | "error"
  | "success"
  | "initial"
  | "noerror";
export type inputName =
  | "email"
  | "password"
  | "firstname"
  | "lastname"
  | "rating";

export type inputValue = string | number | readonly string[] | undefined;
export type validateFunction = (value: inputValue) => string | undefined;

export interface initialValues {
  email?: inputValue;
  password?: inputValue;
  firstname?: inputValue;
  lastname?: inputValue;
  rating?: inputValue;
}
