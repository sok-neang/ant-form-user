import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/api/api";

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref(localStorage.getItem("token"));
  const isTokenExpired = ref(false);
  const isLoginGoogle = ref(false);
  const hasAlreadySubmitted = ref(false);

  const GoogleLogin = async (credential) => {
    try {
      isLoginGoogle.value = true;
      const response = await api.post("access/google", {
        idToken: credential,
      });

      const data = response.data?.data;
      if (data.token) {
        localStorage.setItem("token", data.token);
        isAuthenticated.value = true;
        isTokenExpired.value = false;
        hasAlreadySubmitted.value = false;
      }
      return data;
    } catch (err) {
      // Check if error is about already submitted application
      if (err.response?.status === 403 && err.response?.data?.message?.includes("already been submitted")) {
        hasAlreadySubmitted.value = true;
      }
      throw err.response || err;
    } finally {
      isLoginGoogle.value = false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    isAuthenticated.value = null;
    isTokenExpired.value = false;
    hasAlreadySubmitted.value = false;
  };

  const setTokenExpired = (expired) => {
    isTokenExpired.value = expired;
  };

  const setHasAlreadySubmitted = (submitted) => {
    hasAlreadySubmitted.value = submitted;
  };

  return {
    isAuthenticated,
    isTokenExpired,
    isLoginGoogle,
    hasAlreadySubmitted,
    GoogleLogin,
    logout,
    setTokenExpired,
    setHasAlreadySubmitted,
  };
});