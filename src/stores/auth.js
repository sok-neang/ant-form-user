import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import api from "@/api/api";

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref(!!localStorage.getItem("token"));
  const isLoginGoogle = ref(false);
  const isGetForm = ref(false);
  const student_info = ref({});

  const GoogleLogin = async (credential) => {
    try {
      isLoginGoogle.value = true;
      const response = await api.post("access/google", {
        idToken: credential,
      });
      

      const data = response.data.data;
      if (data.token) {
        localStorage.setItem("token",data.token);
        isAuthenticated.value = true;
        console.log(isAuthenticated.value);
      }
      return data;
    } catch (err) {
      throw err.response || err;
    } finally {
      isLoginGoogle.value = false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    isAuthenticated.value = false;
  };

  const GetForm_DraftData = async () =>{
    try {
      isGetForm.value = true;
      const response = await api.get("access/form", {
        token: localStorage.getItem("token")
      })
      const data = response.data;
      student_info.value = data.data
      console.log(student_info.value);
    } catch (error) {
      throw error.response;
    } finally {
      isGetForm.value = false;
    }
  }

  return {
    isAuthenticated,
    isLoginGoogle,
    student_info,

    GoogleLogin,
    logout,
    GetForm_DraftData,
  };
});