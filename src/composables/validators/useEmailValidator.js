
export function useEmailValidator() {

  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  const validateEmail = (email) => {
    if (!email) {
      return {
        isValid: false,
        message: "សូមបំពេញព័ត៌មាននេះ"
      };
    }

    if (!emailRegex.test(email)) {
      return {
        isValid: false,
        message: "សូមបញ្ជូល Email ដែលមានទម្រង់ត្រឹមត្រូវ",
      };
    }
    return { isValid: true, message: "" };
  };

  return {
    validateEmail,
  };
}