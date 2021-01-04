import { inputValue } from "../types/form";
import http from "./httpService";

export const login = async (formData: {
  email: inputValue;
  password: inputValue;
}) => {
  return http.post("/login", formData);
};
