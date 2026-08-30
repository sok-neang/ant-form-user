import { useRequiredValidator } from "@/composables/validators/useRequiredValidator";
import { useSubmissionsStore } from "@/stores/submissions";
import { useRouter } from 'vue-router';

export function useFormValidationLogic(formData) {
  const submissionsStore = useSubmissionsStore();
  const router = useRouter();
  const { errors, validateField } = useRequiredValidator();

  const handleValidate = (field, msg = 'សូមបំពេញព័ត៌មាននេះ') => {
    validateField(field, formData[field], msg);
  };

  const handleFileUpload = async (field, fileType, file) => {
    handleValidate(field, field === 'photo' ? 'សូមបញ្ជូលរូបភាព' : 'សូមបញ្ជូលឯកសារ');

    if (!file || !(file instanceof File)) return;

    try {
      const formDataObj = new FormData();
      formDataObj.append('file', file);
      formDataObj.append('fileType', fileType); 
      
      await submissionsStore.File_Submission(formDataObj);
      console.log(`${fileType} auto-saved successfully`);
    } catch (error) {
      console.error(`Failed to auto-save ${fileType}`, error);
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
      { f: 'universityOther', m: reqMsg },
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
      if (!validateField(f, formData[f], m)) {
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
        console.log("Form Data Submitted");
        router.push({ name: 'form-submitted' });
      } catch (error) {
        console.error("Submission failed", error);
        alert("ការបញ្ជូនទិន្នន័យមិនបានជោគជ័យទេ។ សូមព្យាយាមម្តងទៀត។");
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
    handleSubmit
  };
}
