import validator from "validator";
import { inputValue } from "../types/form";

export const validateEmail = (email: inputValue) => {
  const value = email as string;
  if (!validator.isEmail(value)) {
    return "Enter a valid email";
  }
};

export const validatePassword = (password: inputValue) => {
  const value = password as string;
  if (!validator.isLength(value, { min: 6 })) {
    return "Password must be up to 6 characters";
  }
};
