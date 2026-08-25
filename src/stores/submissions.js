import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import api from "@/api/api";

export const useSubmissionsStore = defineStore("submissions", () => {
  const isSubmit = ref(false);
  const student_info = ref({});
  const isGetFormLoading = ref(false);
  const isSubmitFormLoading = ref(false);
  const isUpdateFormLoading = ref(false);

  const GetForm_DraftData = async () => {
    try {
      isGetFormLoading.value = true;
      const response = await api.get("access/form", {
        params: { token: localStorage.getItem("token") }
      });
      const data = response.data.data;
      student_info.value = data;
    } catch (error) {
      throw error.response || error;
    } finally {
      isGetFormLoading.value = false;
    }
  }

  const Update_Submission = async (data) => {
    try {
      isUpdateFormLoading.value = true;
      const response = await api.patch("submissions/draft", data);
      console.log(response)
      return response.data.data;
    } catch (error) {
      throw error.response || error;
    } finally {
      isUpdateFormLoading.value = false;
    }
  }

  const File_Submission = async (formDataObj) => {
    try {
      isSubmitFormLoading.value = true;
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await api.post("submissions/draft/files", formDataObj, config);
      console.log(response)
      return response.data.data;
    } catch (error) {
      throw error.response || error;
    } finally {
      isSubmitFormLoading.value = false;
    }
  }

  const Final_Submission = async (agreementData) => {
    try {
      isSubmitFormLoading.value = true;
      const response = await api.post("submissions", agreementData);
      isSubmit.value = true;
      console.log(response)
      return response.data.data;
    } catch (error) {
      throw error.response || error;
    } finally {
      isSubmitFormLoading.value = false;
    }
  }

  return {
    isSubmit,
    isGetFormLoading,
    isSubmitFormLoading,
    isUpdateFormLoading,
    student_info,

    GetForm_DraftData,
    Update_Submission,
    File_Submission,
    Final_Submission,
  };
});