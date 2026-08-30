import { reactive, computed, watch } from 'vue';
import { useSubmissionsStore } from "@/stores/submissions";

export function useFormSubmissionLogic() {
  const submissionsStore = useSubmissionsStore();
  const info = computed(() => submissionsStore.student_info);

  const formData = reactive({
    phone: '',
    telegramUsername: '',
    email: '',
    khName: '',
    enName: '',
    gender: '',
    dateOfBirth: '',
    educationLevel: '',
    universityId: null,
    universityOther: '',
    yearOfStudy: '',
    semester: '',
    transcript: null,
    address: '',
    referralSource: [],
    strengths: '',
    weaknesses: '',
    goals: '',
    reason: '',
    familySituation: '',
    program: '',
    shift: '',
    opportunities: '',
    webAppInterest: '',
    scholarshipVision: '',
    photo: null,
    agreedToProgramCommitment: false,
    agreedToCodeOfConduct: false,
    agreedToAttendancePolicy: false,
    agreedToEligibilityPolicy: false,
  });

  let isInitialized = false;

  watch(() => info.value, (newInfo) => {
    if (newInfo && newInfo.student) {
      const student = newInfo.student;
      const submission = newInfo.submission;
      const narrative = newInfo.narrative;
      const files = newInfo.files || [];

      const mapYear = (y) => y ? y.replace('YEAR_', '') : '';
      const mapSemester = (s) => s ? s.replace('SEMESTER_', '') : '';
      const mapReferral = (r) => {
        if (!Array.isArray(r)) return [];
        const mapping = { 'FRIEND': 'friend', 'SOCIAL_MEDIA': 'social', 'SENIOR': 'senior', 'OTHER': 'other' };
        return r.map(x => mapping[x] || x.toLowerCase());
      };
      const mapProgram = (p) => {
        if (!p) return '';
        if (p === 'WEB_DEVELOPMENT' || p === 'web') return 'WEB_DEVELOPMENT';
        if (p.includes('MOBILE') || p === 'mobile') return 'MOBILE_APP';
        return p.toUpperCase();
      };
      const mapUniversity = (uId, uOther) => {
        if (uId) return uId.toString().toLowerCase();
        if (!uOther) return '';
        const lower = uOther.toLowerCase();
        if (lower.includes('technology') || lower.includes('itc')) return 'itc';
        if (lower.includes('royal university') || lower.includes('rupp')) return 'rupp';
        if (lower.includes('law and economics') || lower.includes('rule')) return 'rule';
        if (lower.includes('management') || lower.includes('num')) return 'num';
        return '';
      };

      const transcriptFile = files.find(f => f.fileType === 'TRANSCRIPT');
      const photoFile = files.find(f => f.fileType === 'PHOTO');

      formData.phone = student.phone || '';
      formData.telegramUsername = student.telegramUsername || '';
      formData.email = student.email || '';
      formData.khName = student.khName || '';
      formData.enName = student.enName || '';
      formData.gender = student.gender ? student.gender.toLowerCase() : '';
      formData.dateOfBirth = student.dateOfBirth ? student.dateOfBirth.split('T')[0] : '';
      formData.address = student.address || '';
      formData.photo = photoFile ? photoFile.fileUrl : null;
      formData.transcript = transcriptFile ? transcriptFile.fileUrl : null;
      formData.universityId = student.universityId || null;
      formData.universityOther = mapUniversity(student.universityId, student.universityOther);

      formData.educationLevel = submission?.educationLevel ? submission.educationLevel.toLowerCase() : '';
      formData.yearOfStudy = mapYear(submission?.yearOfStudy);
      formData.semester = mapSemester(submission?.semester);
      formData.referralSource = mapReferral(submission?.referralSource);
      formData.program = mapProgram(submission?.program);
      formData.shift = submission?.shift ? submission.shift.toUpperCase() : '';

      formData.agreedToProgramCommitment = submission?.agreedToProgramCommitment || false;
      formData.agreedToCodeOfConduct = submission?.agreedToCodeOfConduct || false;
      formData.agreedToAttendancePolicy = submission?.agreedToAttendancePolicy || false;
      formData.agreedToEligibilityPolicy = submission?.agreedToEligibilityPolicy || false;

      if (narrative) {
        formData.strengths = narrative.strengths || '';
        formData.weaknesses = narrative.weaknesses || '';
        formData.goals = narrative.goals || '';
        formData.reason = narrative.reason || '';
        formData.familySituation = narrative.familySituation || '';
        formData.opportunities = narrative.opportunities || '';
        formData.webAppInterest = narrative.webAppInterest || '';
        formData.scholarshipVision = narrative.scholarshipVision || '';
      }

      setTimeout(() => { isInitialized = true; }, 500);
    }
  }, { deep: true, immediate: true });

  let saveTimeout;
  watch(formData, (newVal) => {
    if (!isInitialized) return;

    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(async () => {
      try {
        const payload = {
          khName: newVal.khName || undefined,
          enName: newVal.enName || undefined,
          gender: newVal.gender ? newVal.gender.toUpperCase() : undefined,
          telegramUsername: newVal.telegramUsername || undefined,
          dateOfBirth: newVal.dateOfBirth || undefined,
          phone: newVal.phone || undefined,
          universityId: newVal.universityId || undefined,
          universityOther: newVal.universityOther || undefined,
          address: newVal.address || undefined,
          educationLevel: newVal.educationLevel ? newVal.educationLevel.toUpperCase() : undefined,
          yearOfStudy: newVal.yearOfStudy ? `YEAR_${newVal.yearOfStudy}` : undefined,
          semester: newVal.semester ? `SEMESTER_${newVal.semester}` : undefined,
          referralSource: newVal.referralSource && newVal.referralSource.length > 0 ? newVal.referralSource.map(r => {
            const m = { friend: 'FRIEND', social: 'SOCIAL_MEDIA', senior: 'SENIOR', other: 'OTHER' };
            return m[r] || r.toUpperCase();
          }) : undefined,
          program: newVal.program || undefined,
          shift: newVal.shift || undefined,
          strengths: newVal.strengths || undefined,
          weaknesses: newVal.weaknesses || undefined,
          goals: newVal.goals || undefined,
          opportunities: newVal.opportunities || undefined,
          reason: newVal.reason || undefined,
          familySituation: newVal.familySituation || undefined,
          webAppInterest: newVal.webAppInterest || undefined,
          scholarshipVision: newVal.scholarshipVision || undefined,
          agreedToProgramCommitment: newVal.agreedToProgramCommitment,
          agreedToCodeOfConduct: newVal.agreedToCodeOfConduct,
          agreedToAttendancePolicy: newVal.agreedToAttendancePolicy,
          agreedToEligibilityPolicy: newVal.agreedToEligibilityPolicy
        };

        await submissionsStore.Update_Submission(payload);
        console.log('Draft auto-saved successfully');
      } catch (err) {
        console.error('Failed to auto-save draft', err);
      }
    }, 2000);
  }, { deep: true });

  return {
    formData,
    info
  };
}
