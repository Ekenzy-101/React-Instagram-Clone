import { inputValue } from "../types/form";
import http from "./httpService";

export const login = async (formData: {
  email: inputValue;
  password: inputValue;
}) => {
  return http.post("/login", formData);
};

export const loginWithFacebook = async (data: {
  name: string;
  email: string;
  image_url: string;
}) => {
  return http.post("/auth/facebook", data);
};
