import validator from "validator";
import { inputValue } from "../types/form";

export const validateEmail = (email: inputValue) => {
  const value = email as string;
  if (!validator.isEmail(value)) {
    return "Enter a valid email";
  }

  if (!validator.isLength(value, { min: 6, max: 255 })) {
    return "Email must be less than 255 characters";
  }
};

export const validatePassword = (password: inputValue) => {
  const value = password as string;
  if (!validator.isLength(value, { min: 6, max: 255 })) {
    return "Password must be up to 6 characters";
  }
};

export const validateName = (password: inputValue) => {
  const value = password as string;
  if (!validator.isLength(value, { min: 1, max: 50 })) {
    return "Name must be between 1 and 50 characters";
  }
};

export const validateCode = (code: inputValue) => {
  const value = code as string;
  if (!validator.isNumeric(value, { no_symbols: true })) {
    return "Code must be 6 characters";
  }
  if (!validator.isLength(value, { min: 6, max: 6 })) {
    return "Code must be 6 characters";
  }
};

export const validateUsername = (username: inputValue) => {
  const value = username as string;
  if (!validator.isLength(value, { min: 6, max: 30 })) {
    return "Usernames must be between 6 to 30 characters";
  }

  if (!validator.matches(value, /^(?!.*\.\.)(?!.*\.$)[^\W][a-z0-9.]$/)) {
    return "Usernames can only use letters, numbers, underscores and periods.";
  }
};
