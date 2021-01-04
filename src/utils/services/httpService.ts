import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_REST_API,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

const http = {
  get: instance.get,
  post: instance.post,
  put: instance.put,
};

export default http;
