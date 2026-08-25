<template>
  <div class="form-request">
    <div class="w-100 d-flex justify-content-center bg-light">
      <div class="banner-image my-4">
        <div class="row">
          <div class="col-12">
            <div class="card-img">
              <img :src="bannerImage" class="w-100 object-fit-cover object-position-center" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="form-header text-center mb-4 p-4 shadow-sm">
      <div class="row d-flex justify-content-center">
        <div class="col-10">
          <h2 class="mb-2 text-light fw-normal lh-md">ពាក្យចុះឈ្មោះស្នើសុំអាហារូបករណ៍ ១០០% ជំនាន់ទី ២ នៅថ្នាក់បណ្តុះបណ្តាលបច្ចេកវិទ្យាអាន-ANT ឧបត្ថម្ភដោយមូលនិធិ ស.អ. នៃក្រសួងប្រៃសណីយ៍និងទូរគមនាគមន៍</h2>
        </div>
      </div>
    </div>

    <div class="form-container">
      <div class="card border-0 rounded-0 mb-4 p-4">
        <div class="card-body m-0 p-0">
          <h4 class="mb-2 fw-semibold" style="color: var(--primary-color) !important;">សេចក្ដីណែនាំ</h4>
          <p class="pb-3 border-bottom" style="color: var(--text-base);">សូមអ្នកបំពេញព័ត៌មានឱ្យបានគ្រប់សំណួរ និងផ្ទៀងផ្ទាត់ឱ្យបានត្រឹមត្រូវមុននឹងធ្វើការ Submit​ !</p>
        </div>
      </div>

      <div class="card border-0 rounded-0 p-4 p-md-5">
        <div class="card-body p-0">
          <form @submit.prevent="handleSubmit">
            <div class="row mb-4">
              <div class="col-12 mb-5">
                <BaseInput 
                  v-model="formData.phone" 
                  :label="questions[0].text" 
                  :type="questions[0].type"
                  :error="errors.phone"
                  @blur="handleValidate('phone')"
                />
              </div>
              <div class="col-12 mb-5">
                <BaseInput 
                  v-model="formData.telegramUsername" 
                  :label="questions[1].text" 
                  :type="questions[1].type"
                  :error="errors.telegramUsername"
                  @blur="handleValidate('telegramUsername')"
                />
              </div>
              <div class="col-12 mb-5">
                <BaseInput 
                  v-model="formData.email" 
                  :label="questions[2].text" 
                  :type="questions[2].type"
                  :error="errors.email"
                  @blur="handleValidate('email')"
                />
              </div>
              <div class="col-12 mb-5">
                <BaseInput 
                  v-model="formData.khName" 
                  :label="questions[3].text" 
                  :type="questions[3].type"
                  :error="errors.khName"
                  @blur="handleValidate('khName')"
                />
              </div>
              <div class="col-12 mb-5">
                <BaseInput 
                  v-model="formData.enName" 
                  :label="questions[4].text" 
                  :type="questions[4].type"
                  :error="errors.enName"
                  @blur="handleValidate('enName')"
                />
              </div>
              <div class="col-12 mb-5">
                <BaseRadio
                  v-for="(option, index) in questions[5].options"
                  :key="index"
                  v-model="formData.gender"
                  :label="option.label"
                  :value="option.value"
                  :name="questions[5].name"
                  :error="index === questions[5].options.length - 1 ? errors.gender : ''"
                />
              </div>
              <div class="col-12 mb-5">
                <BaseInput 
                  v-model="formData.dateOfBirth" 
                  :label="questions[6].text" 
                  :type="questions[6].type"
                  :error="errors.dateOfBirth"
                  @blur="handleValidate('dateOfBirth')"
                />
              </div>
              <div class="col-12 mb-5">
                <BaseSelect 
                  v-model="formData.educationLevel" 
                  :label="questions[7].text"
                  :options="questions[7].options"
                  :error="errors.educationLevel"
                  clearable
                  @blur="handleValidate('educationLevel')"
                />
              </div>
              <div class="col-12 mb-5">
                <BaseSelect 
                  v-model="formData.universityId" 
                  :label="questions[8].text"
                  :options="questions[8].options"
                  :error="errors.universityId"
                  clearable
                  @blur="handleValidate('universityId')"
                />
              </div>
              <div class="col-12 mb-5">
                <BaseSelect 
                  v-model="formData.yearOfStudy" 
                  :label="questions[9].text"
                  :options="questions[9].options"
                  :error="errors.yearOfStudy"
                  clearable
                  @blur="handleValidate('yearOfStudy')"
                />
              </div>
              <div class="col-12 mb-5">
                <BaseSelect 
                  v-model="formData.semester" 
                  :label="questions[10].text"
                  :options="questions[10].options"
                  :error="errors.semester"
                  clearable
                  @blur="handleValidate('semester')"
                />
              </div>
              <div class="col-12 mb-5">
                <BaseFileUpload 
                  v-model="formData.transcript" 
                  :label="questions[11].text"
                  :error="errors.transcript"
                  :rule="questions[11].rule"
                  @change="(file) => handleFileUpload('transcript', 'TRANSCRIPT', file)"
                />
              </div>
              <div class="col-12 mb-5">
                <BaseTextarea 
                  v-model="formData.address" 
                  :label="questions[12].text"
                  :error="errors.address"
                  @blur="handleValidate('address')"
                />
              </div>
              <div class="col-12 mb-5">
                <label class="form-label d-block mb-3">{{ questions[13].text }}</label>
                <BaseCheckbox 
                  v-for="(option, index) in questions[13].options"
                  :key="index"
                  v-model="formData.referralSource" 
                  :value="option.value"
                  :label="option.label"
                  :error="index === questions[13].options.length - 1 ? errors.referralSource : ''"
                  @change="handleValidate('referralSource')"
                />
              </div>
              <div class="col-12 mb-5">
                <BaseTextarea 
                  v-model="formData.strengths" 
                  :label="questions[14].text"
                  :error="errors.strengths"
                  @blur="handleValidate('strengths')"
                />
              </div>
              <div class="col-12 mb-5">
                <BaseTextarea 
                  v-model="formData.weaknesses" 
                  :label="questions[15].text"
                  :error="errors.weaknesses"
                  @blur="handleValidate('weaknesses')"
                />
              </div>
              <div class="col-12 mb-5">
                <BaseTextarea 
                  v-model="formData.goals" 
                  :label="questions[16].text"
                  :error="errors.goals"
                  @blur="handleValidate('goals')"
                />
              </div>
              <div class="col-12 mb-5">
                <BaseTextarea 
                  v-model="formData.reason" 
                  :label="questions[17].text"
                  :error="errors.reason"
                  @blur="handleValidate('reason')"
                />
              </div>
              <div class="col-12 mb-5">
                <BaseTextarea 
                  v-model="formData.familySituation" 
                  :label="questions[18].text"
                  :error="errors.familySituation"
                  @blur="handleValidate('familySituation')"
                />
              </div>
              <div class="col-12 mb-5">
                <label class="form-label d-block mb-3">{{ questions[19].text }}</label>
                <BaseRadio 
                  v-for="(option, index) in questions[19].options"
                  :key="index"
                  v-model="formData.program" 
                  :value="option.value"
                  :label="option.label"
                  :name="'program'"
                  :error="index === questions[19].options.length - 1 ? errors.program : ''"
                  @update:modelValue="handleValidate('program')"
                />
              </div>
              <div class="col-12 mb-5">
                <label class="form-label d-block mb-3">{{ questions[20].text }}</label>
                <BaseRadio 
                  v-for="(option, index) in questions[20].options"
                  :key="index"
                  v-model="formData.shift" 
                  :value="option.value"
                  :label="option.label"
                  :name="'shift'"
                  :error="index === questions[20].options.length - 1 ? errors.shift : ''"
                  @update:modelValue="handleValidate('shift')"
                />
              </div>
              <div class="col-12 mb-5">
                <BaseTextarea 
                  v-model="formData.opportunities" 
                  :label="questions[21].text"
                  :error="errors.opportunities"
                  @blur="handleValidate('opportunities')"
                />
              </div>
              <div class="col-12 mb-5">
                <BaseTextarea 
                  v-model="formData.webAppInterest" 
                  :label="questions[22].text"
                  :error="errors.webAppInterest"
                  @blur="handleValidate('webAppInterest')"
                />
              </div>
              <div class="col-12 mb-5">
                <BaseTextarea 
                  v-model="formData.scholarshipVision" 
                  :label="questions[23].text"
                  :error="errors.scholarshipVision"
                  @blur="handleValidate('scholarshipVision')"
                />
              </div>
              <div class="col-12 mb-5">
                <BaseFileUpload 
                  v-model="formData.photo" 
                  :label="questions[24].text"
                  :error="errors.photo"
                  :rule="questions[24].rule"
                  @change="(file) => handleFileUpload('photo', 'PHOTO', file)"
                />
              </div>
              <div class="col-12 mb-5">
                <label class="form-label d-block mb-3">{{ questions[25].text }}</label>
                <BaseCheckbox 
                  v-model="formData.agreedToProgramCommitment" 
                  :value="questions[25].options.value"
                  :label="questions[25].options.label"
                  :error="errors.agreedToProgramCommitment"
                  @change="handleValidate('agreedToProgramCommitment', 'សូមយល់ព្រម')"
                />
              </div>
              <div class="col-12 mb-5">
                <label class="form-label d-block mb-3">{{ questions[26].text }}</label>
                <BaseCheckbox 
                  v-model="formData.agreedToCodeOfConduct" 
                  :value="questions[26].options.value"
                  :label="questions[26].options.label"
                  :error="errors.agreedToCodeOfConduct"
                  @change="handleValidate('agreedToCodeOfConduct', 'សូមយល់ព្រម')"
                />
              </div>
              <div class="col-12 mb-5">
                <label class="form-label d-block mb-3">{{ questions[27].text }}</label>
                <BaseCheckbox 
                  v-model="formData.agreedToAttendancePolicy" 
                  :value="questions[27].options.value"
                  :label="questions[27].options.label"
                  :error="errors.agreedToAttendancePolicy"
                  @change="handleValidate('agreedToAttendancePolicy', 'សូមយល់ព្រម')"
                />
              </div>
              <div class="col-12 mb-5">
                <label class="form-label d-block mb-3">{{ questions[28].text }}</label>
                <BaseCheckbox 
                  v-model="formData.agreedToEligibilityPolicy" 
                  :value="questions[28].options.value"
                  :label="questions[28].options.label"
                  :error="errors.agreedToEligibilityPolicy"
                  @change="handleValidate('agreedToEligibilityPolicy', 'សូមយល់ព្រម')"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <BaseButton class="w-100 btn-custom" type="submit">បញ្ជូន</BaseButton>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, onMounted } from 'vue';
import bannerImage from '@/assets/images/banner.png';
import { useRequiredValidator } from "@/composables/validators/useRequiredValidator";
import { useSubmissionsStore } from "@/stores/submissions";

const submissionsStore = useSubmissionsStore();

onMounted(async() => {
  await submissionsStore.GetForm_DraftData();
})
const info = computed(() => submissionsStore.student_info)


const formData = reactive({
  phone: '',
  telegramUsername: '',
  email: '',
  khName: '',
  enName: '',
  gender: '',
  dateOfBirth: '',
  educationLevel: '',
  universityId: '',
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
})

import { watch } from 'vue';
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
    formData.universityId = mapUniversity(student.universityId, student.universityOther);
    
    formData.educationLevel = submission.educationLevel ? submission.educationLevel.toLowerCase() : '';
    formData.yearOfStudy = mapYear(submission.yearOfStudy);
    formData.semester = mapSemester(submission.semester);
    formData.referralSource = mapReferral(submission.referralSource);
    formData.program = mapProgram(submission.program);
    formData.shift = submission.shift ? submission.shift.toUpperCase() : '';
    
    formData.agreedToProgramCommitment = submission.agreedToProgramCommitment || false;
    formData.agreedToCodeOfConduct = submission.agreedToCodeOfConduct || false;
    formData.agreedToAttendancePolicy = submission.agreedToAttendancePolicy || false;
    formData.agreedToEligibilityPolicy = submission.agreedToEligibilityPolicy || false;
    
    formData.strengths = narrative.strengths || '';
    formData.weaknesses = narrative.weaknesses || '';
    formData.goals = narrative.goals || '';
    formData.reason = narrative.reason || '';
    formData.familySituation = narrative.familySituation || '';
    formData.opportunities = narrative.opportunities || '';
    formData.webAppInterest = narrative.webAppInterest || '';
    formData.scholarshipVision = narrative.scholarshipVision || '';

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
        khName: newVal.khName,
        enName: newVal.enName,
        gender: newVal.gender,
        telegramUsername: newVal.telegramUsername,
        dateOfBirth: newVal.dateOfBirth,
        phone: newVal.phone,
        university_id: null,
        universityOther: newVal.universityId,
        address: newVal.address,
        educationLevel: newVal.educationLevel ? newVal.educationLevel.toUpperCase() : null,
        yearOfStudy: newVal.yearOfStudy ? `YEAR_${newVal.yearOfStudy}` : null,
        semester: newVal.semester ? `SEMESTER_${newVal.semester}` : null,
        referralSource: newVal.referralSource ? newVal.referralSource.map(r => {
          const m = { friend: 'FRIEND', social: 'SOCIAL_MEDIA', senior: 'SENIOR', other: 'OTHER' };
          return m[r] || r.toUpperCase();
        }) : [],
        program: newVal.program,
        shift: newVal.shift,
        strengths: newVal.strengths,
        weaknesses: newVal.weaknesses,
        goals: newVal.goals,
        opportunities: newVal.opportunities,
        reason: newVal.reason,
        familySituation: newVal.familySituation,
        preferredTimeReason: null,
        webAppInterest: newVal.webAppInterest,
        scholarshipVision: newVal.scholarshipVision
      };
      
      await submissionsStore.Update_Submission(payload);
      console.log('Draft auto-saved successfully');
    } catch(err) {
      console.error('Failed to auto-save draft', err);
    }
  }, 2000);
}, { deep: true });

const questions = [
  {
    text: '1. លេខទូរសព្ទរបស់អ្នក',
    type: 'number'
  },
  {
    text: '2. Telegram username',
    type: 'text'
  },
  {
    text: '3. អុីម៉ែលរបស់អ្នក',
    type: 'email'
  },
  {
    text: '4. ឈ្មោះជាភាសាខ្មែរ',
    type: 'text'
  },
  {
    text: '5. ឈ្មោះជាភាសាឡាតាំង',
    type: 'text'
  },
  {
    text: '6. ភេទ',
    type: 'select',
    name: 'gender',
    options: [{ label: 'ប្រុស', value: 'male' }, { label: 'ស្រី', value: 'female' }]
  },
  {
    text: '7. ថ្ងៃ ខែ ឆ្នាំកំណើត',
    type: 'date'
  },
  {
    text: '8. តើអ្នកកំពុងសិក្សានៅកម្រិតសញ្ញាបត្រណាដែរ?',
    type: 'select',
    options: [{ label: 'បរិញ្ញាបត្រ', value: 'bachelor' }, { label: 'បរិញ្ញាបត្រជាន់ខ្ពស់', value: 'master' }]
  },
  {
    text: '9. តើអ្នកកំពុងសិក្សានៅសាលាណាដែរ?',
    type: 'select', 
    options: [ { label: 'សកលវិទ្យាល័យភូមិន្ទភ្នំពេញ', value: 'rupp' }, { label: 'សកលវិទ្យាល័យនីតិសាស្ដ្រនិងរដ្ឋបាល', value: 'rule' }, { label: 'សកលវិទ្យាល័យគ្រប់គ្រងពាណិជ្ជកម្ម', value: 'num' }, { label: 'វិទ្យាស្ថានបច្ចេកវិទ្យាកម្ពុជា', value: 'itc' } ]
  },
  {
    text: '10. តើអ្នកកំពុងសិក្សាឆ្នាំទីប៉ុន្មាន?',
    type: 'select', 
    options: [ { label: '១', value: '1' }, { label: '២', value: '2' }, { label: '៣', value: '3' }, { label: '៤', value: '4' } ]
  },
  {
    text: '11. តើអ្នកកំពុងសិក្សាឆមាសទីប៉ុន្មាន?',
    type: 'select', 
    options: [ { label: 'ឆមាសទី១', value: '1' }, { label: 'ឆមាសទី២', value: '2' }]
  },
  {
    text: '12. ប្រសិនបើអ្នកពិតជាសិក្សាចាប់ពីឆ្នាំទី២ ឆមាសទី២ ឡើងទៅ ពិតប្រាកដមែន សូមធ្វើការ Upload បណ្ណសម្គាល់ខ្លួននិស្សិត ឬ វិក្កយបត្របង់ថ្លៃសិក្សាចុងក្រោយនៅសាកលវិទ្យាល័យ ដើម្បីធ្វើការបញ្ជាក់ image or pdf file',
    type: 'file',
    rule: 'ទំហំឯកសារអតិបរមា: 10 MB'
  },
  {
    text: '13. សូមបំពេញទីលំនៅបច្ចុប្បន្ន (កន្លែងស្នាក់នៅសព្វថ្ងៃ៖ ​ភូមិ, ឃុំ/សង្កាត់, ស្រុក/ខណ្ឌ, ខេត្ត/ក្រុង/រាជធានី)',
    type: 'textarea'
  },
  {
    text: '14. តើអ្នកទទួលបានព័ត៌មានអាហារូបករណ៍របស់យើងតាមរយៈអ្វីដែរ?',
    type: 'select',
    options: [ { label: 'មិត្តភក្ក', value: 'friend' }, { label: ' បណ្តាញសង្គម', value: 'social' }, { label: ' សិស្សច្បង', value: 'senior' }, { label: 'other', value: 'other' } ]
  },
  {
    text: '15. តើអ្វីទៅជាភាពខ្លាំងរបស់អ្នក?',
    type: 'textarea'
  },
  {
    text: '16. តើអ្វីទៅជាភាពខ្សោយរបស់អ្នក?',
    type: 'textarea'
  },
  {
    text: '17. តើអ្វីដែលជាគោលបំណងក្នុងថ្ងៃអនាគតរបស់អ្នក?',
    type: 'textarea'
  },
  {
    text: '18. ចូររៀបរាប់ពីមូលហេតុខ្លះៗដែលអ្នកចង់ទទួលបានអាហារូបករណ៍ពីថ្នាក់បណ្តុះបណ្តាលបច្ចេកវិទ្យាអាន-ANT',
    type: 'textarea'
  },
  {
    text: '19. ចូររៀបរាប់ពីស្ថានភាពបច្ចុប្បន្នរបស់អ្នក',
    type: 'textarea'
  },
  {
    text: '20. សូមជ្រើសរើសអាហារូបករណ៍ដែលអ្នកចង់ស្នើសុំ',
    type: 'radio',
    options: [ { label: 'Mobile App Development', value: 'MOBILE_APP' }, { label: 'Web Development', value: 'WEB_DEVELOPMENT' } ]
  },
  {
    text: '21. សូមជ្រើសរើសម៉ោងសិក្សាដែលអ្នកចង់រៀន',
    type: 'radio',
    options: [ { label: 'វេនព្រឹក ចន្ទ ដល់ សៅរ៍ ម៉ោង ០៧:៥០ ដល់ ១០:៥០', value: 'MORNING' }, { label: 'វេនរសៀល ចន្ទ ដល់ សៅរ៍ ម៉ោង ០២:០០ ដល់ ០៥:០០', value: 'AFTERNOON' } ]
  },
  {
    text: '22. ហេតុអ្វីអ្នកចង់ជ្រើសរើសជំនាញខាងលើ?',
    type: 'textarea'
  },
  {
    text: '23. ចូររៀបរាប់ និងសង្ខេបពីគោលបំណងនៃ Website ឬ App នីមួយៗ ដែលអ្នកចាប់អារម្មណ៍ទាំងក្នុង និងក្រៅស្រុកឱ្យបានយ៉ាងតិចចំនួន ៥។',
    type: 'textarea'
  },
  {
    text: '24. បច្ចុប្បន្ន បច្ចេកវិទ្យាឌីជីថលកំពុងត្រូវបានប្រើប្រាស់ក្នុងគ្រប់វិស័យ ហើយក៏បានរួមចំណែកយ៉ាងសំខាន់បំផុតក្នុងការកសាងសេដ្ឋកិច្ច និងសុខុមាលភាពសង្គមផងដែរ ។ ជាចក្ខុវិស័យរបស់អ្នក តើអ្នកគិតថាអាហារូបករណ៍នេះនឹងចូលរួមជាប្រយោជន៍អ្វីខ្លះទៅដល់ប្រទេសរបស់យើង?',
    type: 'textarea'
  },
  {
    text: '25. សូមធ្វើការ Upload រូបភាពទំហំ ៤x៦​ ផ្ទៃពណ៌ខៀវ',
    type: 'file',
    rule: 'ទំហំឯកសារអតិបរមា: 10 MB'
  },
  {
    text: '26. អ្នកត្រូវធានាអះអាងលើប្រវត្តិរូបនិងព័ត៌មានរបស់ខ្លួនដែលបានបំពេញ និងផ្តល់ឱ្យខាងលើពិតជាត្រឹមត្រូវនិងគ្មានការក្លែងបន្លំ',
    type: 'checkbox',
    options: {label: 'យល់ព្រម', value: 'agree'}
  },
  {
    text: '27. អ្នកតម្រូវឱ្យមានកុំព្យូទ័រប្រើប្រាស់ផ្ទាល់ខ្លួន',
    type: 'checkbox',
    options: {label: 'យល់ព្រម', value: 'agree'}
  },
  {
    text: '28. អ្នកត្រូវមានពេលវេលាគ្រប់គ្រាន់ក្នុងការរៀនវគ្គសិក្សាអាហារូបករណ៍ដែលបានផ្តល់ ឱ្យបានចប់សព្វគ្រប់។ ករណីបោះបង់ក្នុងកំឡុងពេលណាមួយនឹងមិនមានឱកាសដើម្បីទទួលបានអាហារូបករណ៍ផ្សេងទៀតដែលផ្តល់ដោយអាន-ANT ឡើយ',
    type: 'checkbox',
    options: {label: 'យល់ព្រម', value: 'agree'}
  },
  {
    text: '29. អ្នកត្រូវទទួលខុសត្រូវនូវព័ត៌មានខាងលើ ករណីសាលារកឃើញមានកំហុសខុសពីលក្ខខណ្ឌខាងលើនឹងត្រូវបញ្ឈប់ពីការសិក្សា និងគ្មានឱកាសលើការដាក់ពាក្យអាហារូបករណ៍នៅអាន-ANT លើជំនាញផ្សេងៗ ឬទទួលបានឱកាសនៅពេលក្រោយទៀតឡើយ',
    type: 'checkbox',
    options: {label: 'យល់ព្រម', value: 'agree'}
  }
]

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
    if (!validateField(f, formData[f], m)) {
      isValid = false;
    }
  });

  return isValid;
};

const handleSubmit = () => {
  console.log(formData)
  if (validateAll()) {
    console.log("Form Data Submitted:", formData);
    alert("Form submitted successfully!");
  } else {
    setTimeout(() => {
      const firstError = document.querySelector('.is-invalid, .text-danger, .invalid-feedback');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  }
};
</script>

<style scoped>
.page-container {
  background-color: var(--bg-body, #F3F6F6);
  min-height: 100vh;
}

.form-container {
  max-width: 1000px;
  margin: 0 auto;
}

.form-label{
  font-weight: 500 !important;
  font-size: 16px !important;
  margin-bottom: 0.5rem;
}

.form-header {
  background-color: var(--primary-color, #357867);
}
.banner-image{
  width: 1000px;
}
</style>