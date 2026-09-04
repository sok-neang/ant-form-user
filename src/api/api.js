import axios from "axios";
import router from "@/router";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});



api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      if (localStorage.getItem("isAuthenticated")) {
        localStorage.removeItem("isAuthenticated");
        router.push({ name: "expired-link" })
      } else {
        router.push({ name: "login" })
      }
    }
    return Promise.reject(error);
  }
)

export default api;