import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import router from "@/router/index.js";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401/403
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const authStore = useAuthStore();
      authStore.setTokenExpired(true);
      localStorage.removeItem("token");
      router.push({ name: "expired-link" });
    }
    return Promise.reject(error);
  }
);

export default api;
