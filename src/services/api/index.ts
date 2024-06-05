import axios from "axios";
import { BASE_API_URL } from "../../config/api";

const BASE_REQUEST_OPTIONS = {
  timeout: 5000,
  headers: {
    redirect: "follow",
  },
};

const baseApi = axios.create({
  baseURL: BASE_API_URL,
  ...BASE_REQUEST_OPTIONS,
});

baseApi.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error.response.data);
  }
);


export { baseApi };
