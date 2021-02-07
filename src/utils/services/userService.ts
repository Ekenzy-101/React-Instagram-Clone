import http from "./httpService";

export const getUsersBySearch = async (value: string) => {
  return http.get(`/users?search=${value}`);
};
