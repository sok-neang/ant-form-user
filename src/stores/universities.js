import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/api/api";

export const useUniversitiesStore = defineStore("universities", () => {
  const universities = ref([]);

  const fetchUniversities = async () => {
    try {
      const response = await api.get("/universities");
      if (response.data && response.data.data && response.data.data.universities) {
        universities.value = response.data.data.universities;
      }
    } catch (error) {
      console.error("Failed to fetch universities:", error);
    }
  };

  return {
    universities,
    fetchUniversities,
  };
});
