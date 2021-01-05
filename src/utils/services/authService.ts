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

export const logout = async () => {
  return http.post("/logout");
};

export const register = async (formData: {
  email: inputValue;
  name: inputValue;
  username: inputValue;
  password: inputValue;
}) => {
  return http.post("/register", formData);
};

export const verifyEmail = async (data: { email: string; code: number }) => {
  return http.post("/verify/email", data);
};
