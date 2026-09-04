import { useRequiredValidator } from "@/composables/validators/useRequiredValidator";
import { useEmailValidator } from "@/composables/validators/useEmailValidator";
import { useSubmissionsStore } from "@/stores/submissions";
import { useRouter } from 'vue-router';
import { watch } from 'vue';

export function useFormValidationLogic(formData) {
  const submissionsStore = useSubmissionsStore();
  const router = useRouter();
  const { errors, validateField } = useRequiredValidator();
  const { validateEmail } = useEmailValidator();

  watch(formData, (newVal) => {
    Object.keys(errors).forEach(key => {
      if (errors[key] && newVal[key]) {
        if (Array.isArray(newVal[key])) {
          if (newVal[key].length > 0) errors[key] = '';
        } else {
          errors[key] = '';
        }
      }
    });
  }, { deep: true });

  const handleValidate = (field, msg = 'សូមបំពេញព័ត៌មាននេះ') => {
    if (field === 'email') {
      const emailResult = validateEmail(formData[field]);
      errors[field] = emailResult.isValid ? "" : emailResult.message;
      return emailResult.isValid;
    }

    if (field === 'telegramUsername') {
      const val = formData[field];
      if (!val) {
        errors[field] = msg;
        return false;
      }
      if (!val.trim().startsWith('@')) {
        errors[field] = 'ឈ្មោះអ្នកប្រើប្រាស់ Telegram ត្រូវតែចាប់ផ្តើមដោយសញ្ញា @ (ឧទាហរណ៍ @Ant_training)';
        return false;
      }
      errors[field] = '';
      return true;
    }

    return validateField(field, formData[field], msg);
  };

  const handleFileUpload = async (field, fileType, file) => {
    handleValidate(field, field === 'photo' ? 'សូមបញ្ជូលរូបភាព' : 'សូមបញ្ជូលឯកសារ');

    if (!file || !(file instanceof File)) return;

    try {
      const formDataObj = new FormData();
      formDataObj.append('file', file);
      formDataObj.append('fileType', fileType);

      const result = await submissionsStore.File_Submission(formDataObj);
      if (result) {
        await submissionsStore.GetForm_DraftData();
      }
      console.log(`${fileType} auto-saved successfully`);
    } catch (error) {
      console.log(error);
      if (error.response.message.includes("Invalid file type")) {
        errors[field] = "សូមបញ្ជូលឯកសារជាទម្រង់ PDF, JPG, PNG ឬ WEBP ប៉ុណ្ណោះ";
        formData[field] = null;
        return;
      }
      if (error.response.message.includes("File too large")) {
        errors[field] = "ឯកសារមានទំហំធំពេក។ ទំហំអតិបរមាគឺ 10MB។";
        formData[field] = null;
        return;
      }
      console.error(`Failed to auto-save ${fileType}`, error);
    }
  };

  const handleFileRemove = async (field, fileType) => {
    try {
      const files = submissionsStore.student_info?.files || [];
      const file = files.find(f => f.fileType === fileType);

      if (file && file.id) {
        await submissionsStore.Delete_File(file.id);
        submissionsStore.student_info.files = files.filter(f => f.id !== file.id);
      }

      formData[field] = null;
      errors[field] = field === 'photo' ? 'សូមបញ្ជូលរូបភាព' : 'សូមបញ្ជូលឯកសារ';
    } catch (error) {
      console.error(`Failed to delete ${fileType}`, error);
      alert("ការលុបឯកសារមិនបានជោគជ័យទេ។");
    }
  };

  const validateAll = () => {
    let isValid = true;
    const reqMsg = 'សូមបំពេញព័ត៌មាននេះ';
    const agreeMsg = 'សូមយល់ព្រម';

    const fields = [
      { f: 'phone', m: reqMsg },
      { f: 'telegramUsername', m: reqMsg },
      { f: 'email', m: reqMsg },
      { f: 'khName', m: reqMsg },
      { f: 'enName', m: reqMsg },
      { f: 'gender', m: reqMsg },
      { f: 'dateOfBirth', m: reqMsg },
      { f: 'educationLevel', m: reqMsg },
      { f: 'universityId', m: reqMsg },
      { f: 'yearOfStudy', m: reqMsg },
      { f: 'semester', m: reqMsg },
      { f: 'transcript', m: 'សូមបញ្ជូលឯកសារ' },
      { f: 'address', m: reqMsg },
      { f: 'referralSource', m: reqMsg },
      { f: 'strengths', m: reqMsg },
      { f: 'weaknesses', m: reqMsg },
      { f: 'goals', m: reqMsg },
      { f: 'reason', m: reqMsg },
      { f: 'familySituation', m: reqMsg },
      { f: 'program', m: reqMsg },
      { f: 'shift', m: reqMsg },
      { f: 'opportunities', m: reqMsg },
      { f: 'webAppInterest', m: reqMsg },
      { f: 'scholarshipVision', m: reqMsg },
      { f: 'photo', m: 'សូមបញ្ជូលរូបភាព' },
      { f: 'agreedToProgramCommitment', m: agreeMsg },
      { f: 'agreedToCodeOfConduct', m: agreeMsg },
      { f: 'agreedToAttendancePolicy', m: agreeMsg },
      { f: 'agreedToEligibilityPolicy', m: agreeMsg },
    ];

    fields.forEach(({ f, m }) => {
      if (!handleValidate(f, m)) {
        isValid = false;
      }
    });

    return isValid;
  };

  const handleSubmit = async () => {
    if (validateAll()) {
      try {
        const payload = {
          khName: formData.khName,
          enName: formData.enName,
          gender: formData.gender ? formData.gender.toUpperCase() : undefined,
          telegramUsername: formData.telegramUsername,
          dateOfBirth: formData.dateOfBirth,
          phone: formData.phone,
          universityId: formData.universityId || null,
          universityOther: formData.universityOther,
          address: formData.address,
          educationLevel: formData.educationLevel ? formData.educationLevel.toUpperCase() : null,
          yearOfStudy: formData.yearOfStudy ? `YEAR_${formData.yearOfStudy}` : null,
          semester: formData.semester ? `SEMESTER_${formData.semester}` : null,
          referralSource: formData.referralSource ? formData.referralSource.map(r => {
            const m = { friend: 'FRIEND', social: 'SOCIAL_MEDIA', senior: 'SENIOR', other: 'OTHER' };
            return m[r] || r.toUpperCase();
          }) : [],
          program: formData.program || null,
          shift: formData.shift || null,
          strengths: formData.strengths,
          weaknesses: formData.weaknesses,
          goals: formData.goals,
          opportunities: formData.opportunities,
          reason: formData.reason,
          familySituation: formData.familySituation,
          preferredTimeReason: null,
          webAppInterest: formData.webAppInterest,
          scholarshipVision: formData.scholarshipVision,
          agreedToProgramCommitment: formData.agreedToProgramCommitment,
          agreedToCodeOfConduct: formData.agreedToCodeOfConduct,
          agreedToAttendancePolicy: formData.agreedToAttendancePolicy,
          agreedToEligibilityPolicy: formData.agreedToEligibilityPolicy
        };

        await submissionsStore.Final_Submission(payload);
        submissionsStore.setSubmitted(true);
        router.push('/form-submitted');
      } catch (error) {
        console.log("ការបញ្ជូនទិន្នន័យមិនបានជោគជ័យទេ។ សូមព្យាយាមម្តងទៀត។");
      }
    } else {
      setTimeout(() => {
        const firstError = document.querySelector('.is-invalid, .text-danger, .invalid-feedback');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  };

  return {
    errors,
    handleValidate,
    handleFileUpload,
    handleFileRemove,
    handleSubmit
  };
}
