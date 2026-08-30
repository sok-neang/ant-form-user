import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/api/api";

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref(!!localStorage.getItem("token"));
  const isLoginGoogle = ref(false);

  const GoogleLogin = async (credential) => {
    try {
      isLoginGoogle.value = true;
      const response = await api.post("/access/google", {
        idToken: credential,
      });
      const data = response.data?.data;

      localStorage.setItem("token", data.token);
      isAuthenticated.value = true;
      return data;
    } catch (err) {
      throw err.response || err;
    } finally {
      isLoginGoogle.value = false;
    }
  };

  const clearAuth = () => {
    isAuthenticated.value = false;
    localStorage.removeItem("token");
  };

  return {
    isAuthenticated,
    isLoginGoogle,
    GoogleLogin,
    clearAuth,
  };
});