import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/api/api";

export const useSubmissionsStore = defineStore("submissions", () => {
  const student_info = ref({});
  const isGetFormLoading = ref(false);
  const isSubmitFormLoading = ref(false);
  const isUpdateFormLoading = ref(false);
  const isSubmitted = ref(!!localStorage.getItem("isSubmitted"));

  const setSubmitted = (value) => {
    isSubmitted.value = value;
    if (value) {
      localStorage.setItem("isSubmitted", "true");
    } else {
      localStorage.removeItem("isSubmitted");
    }
  };

  const GetForm_DraftData = async () => {
    try {
      isGetFormLoading.value = true;
      const response = await api.get("access/form");

      const data = response.data?.data;
      student_info.value = data;

      return data;
    } catch (error) {
      throw error.response || error;
    } finally {
      isGetFormLoading.value = false;
    }
  };

  const Update_Submission = async (data) => {
    try {
      isUpdateFormLoading.value = true;
      const response = await api.patch("submissions/draft", data);
      return response.data?.data;
    } catch (error) {
      throw error.response || error;
    } finally {
      isUpdateFormLoading.value = false;
    }
  };

  const File_Submission = async (formDataObj) => {
    try {
      isSubmitFormLoading.value = true;
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await api.post("submissions/draft/files", formDataObj, config);
      return response.data?.data;
    } catch (error) {
      throw error.response || error;
    } finally {
      isSubmitFormLoading.value = false;
    }
  };

  const Final_Submission = async (agreementData) => {
    try {
      isSubmitFormLoading.value = true;
      const response = await api.post("submissions", agreementData);

      return response.data?.data;
    } catch (error) {
      throw error.response || error;
    } finally {
      isSubmitFormLoading.value = false;
    }
  };


  const Delete_File = async (id) => {
    try {
      isSubmitFormLoading.value = true;
      const response = await api.delete(`submissions/draft/files/${id}`);
      return response.data?.data;
    } catch (error) {
      throw error.response || error;
    } finally {
      isSubmitFormLoading.value = false;
    }
  };

  return {
    student_info,
    isGetFormLoading,
    isSubmitFormLoading,
    isUpdateFormLoading,
    isSubmitted,

    setSubmitted,
    GetForm_DraftData,
    Update_Submission,
    File_Submission,
    Final_Submission,
    Delete_File,
  };
});