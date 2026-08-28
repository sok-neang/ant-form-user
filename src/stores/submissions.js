import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/api/api";

export const useSubmissionsStore = defineStore("submissions", () => {
  // const isSubmitted = ref(false);
  const submissionStatus = ref("DRAFT"); // Track actual status from backend
  const student_info = ref({});
  const isGetFormLoading = ref(false);
  const isSubmitFormLoading = ref(false);
  const isUpdateFormLoading = ref(false);

  const GetForm_DraftData = async () => {
    try {
      isGetFormLoading.value = true;
      const token = localStorage.getItem("token");

      const response = await api.get("access/form", {
        params: { token }
      });

      // Extract data from response
      const data = response.data?.data;
      if (data) {
        student_info.value = data;

        // Check submission status from response
        if (data.submission?.status) {
          submissionStatus.value = data.submission.status;
          // isSubmitted.value = data.submission.status !== "DRAFT";
        }
      }

      return data;
    } catch (error) {
      // Error handling is done in API interceptor
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
      console.error("Update_Submission error details:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        headers: error.response?.headers,
      });
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

      // Update status after successful submission
      // if (response.data?.data?.submission?.status) {
      //   submissionStatus.value = response.data.data.submission.status;
      //   console.log(submissionStatus.value);
      //   // isSubmitted.value = true;
      // }

      return response.data?.data;
    } catch (error) {
      throw error.response || error;
    } finally {
      isSubmitFormLoading.value = false;
    }
  };

  return {
    // isSubmitted,
    submissionStatus,
    student_info,
    isGetFormLoading,
    isSubmitFormLoading,
    isUpdateFormLoading,

    GetForm_DraftData,
    Update_Submission,
    File_Submission,
    Final_Submission,
  };
});