import { reactive } from "vue";
export function useRequiredValidator() {
  const errors = reactive({});
  const validateField = (field, value, message) => {
    let isValid = !!value;
    if (Array.isArray(value)) {
      isValid = value.length > 0;
    }
    errors[field] = isValid ? "" : message;
    return !errors[field];
  };
  return { errors, validateField };
}
