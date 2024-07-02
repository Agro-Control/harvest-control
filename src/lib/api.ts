import useCookie from "@/utils/hooks/useCookies";
import axios from "axios";

const apiUrl = "http://localhost:80/";

const { getCookie } = useCookie();

export const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

api.interceptors.request.use((config) => {
  const token = getCookie("user_session");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
