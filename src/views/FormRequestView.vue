<template>
  <div class="form-request">
    <div class="w-100 d-flex justify-content-center bg-light">
      <div class="banner-image my-4">
        <div class="row">
          <div class="col-12">
            <div class="card-img">
              <img
                :src="bannerImage"
                class="w-100 object-fit-cover object-position-center"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="form-header text-center mb-4 p-4 shadow-sm">
      <div class="row d-flex justify-content-center">
        <div class="col-10">
          <h2 class="mb-2 text-light fw-normal lh-md">
            ពាក្យចុះឈ្មោះស្នើសុំអាហារូបករណ៍ ១០០% ជំនាន់ទី ២
            នៅថ្នាក់បណ្តុះបណ្តាលបច្ចេកវិទ្យាអាន-ANT ឧបត្ថម្ភដោយមូលនិធិ ស.អ.
            នៃក្រសួងប្រៃសណីយ៍និងទូរគមនាគមន៍
          </h2>
        </div>
      </div>
    </div>

    <div class="form-container">
      <div class="card border-0 rounded-0 mb-4 p-4">
        <div class="card-body m-0 p-0">
          <h4
            class="mb-2 fw-semibold"
            style="color: var(--primary-color) !important"
          >
            សេចក្ដីណែនាំ
          </h4>
          <p class="pb-3 border-bottom" style="color: var(--text-base)">
            សូមអ្នកបំពេញព័ត៌មានឱ្យបានគ្រប់សំណួរ
            និងផ្ទៀងផ្ទាត់ឱ្យបានត្រឹមត្រូវមុននឹងធ្វើការ Submit​ !
          </p>
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
                <label class="form-label d-block mb-3">{{
                  questions[5].text
                }}</label>
                <BaseRadio
                  v-for="(option, index) in questions[5].options"
                  :key="index"
                  v-model="formData.gender"
                  :label="option.label"
                  :value="option.value"
                  :name="questions[5].name"
                  :error="errors.gender"
                  :showErrorMessage="index === questions[5].options.length - 1"
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
                  v-model="formData.universityOther"
                  :label="questions[8].text"
                  :options="questions[8].options"
                  :error="errors.universityOther"
                  clearable
                  @blur="handleValidate('universityOther')"
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
                  @change="
                    (file) => handleFileUpload('transcript', 'TRANSCRIPT', file)
                  "
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
                <label class="form-label d-block mb-3">{{
                  questions[13].text
                }}</label>
                <BaseCheckbox
                  v-for="(option, index) in questions[13].options"
                  :key="index"
                  v-model="formData.referralSource"
                  :value="option.value"
                  :label="option.label"
                  :error="errors.referralSource"
                  :showErrorMessage="index === questions[13].options.length - 1"
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
                <label class="form-label d-block mb-3">{{
                  questions[19].text
                }}</label>
                <BaseRadio
                  v-for="(option, index) in questions[19].options"
                  :key="index"
                  v-model="formData.program"
                  :value="option.value"
                  :label="option.label"
                  :name="'program'"
                  :error="errors.program"
                  :showErrorMessage="index === questions[19].options.length - 1"
                  @update:modelValue="handleValidate('program')"
                />
              </div>
              <div class="col-12 mb-5">
                <label class="form-label d-block mb-3">{{
                  questions[20].text
                }}</label>
                <BaseRadio
                  v-for="(option, index) in questions[20].options"
                  :key="index"
                  v-model="formData.shift"
                  :value="option.value"
                  :label="option.label"
                  :name="'shift'"
                  :error="errors.shift"
                  :showErrorMessage="index === questions[20].options.length - 1"
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
                <div v-if="formData.photo">
                  <img :src="formData.photo" class="img-thumbnail" alt="" />
                </div>
                <BaseFileUpload
                  v-model="formData.photo"
                  :label="questions[24].text"
                  :error="errors.photo"
                  :rule="questions[24].rule"
                  @change="(file) => handleFileUpload('photo', 'PHOTO', file)"
                />
              </div>
              <div class="col-12 mb-5">
                <label class="form-label d-block mb-3">{{
                  questions[25].text
                }}</label>
                <BaseCheckbox
                  v-model="formData.agreedToProgramCommitment"
                  :value="questions[25].options.value"
                  :label="questions[25].options.label"
                  :error="errors.agreedToProgramCommitment"
                  @change="
                    handleValidate('agreedToProgramCommitment', 'សូមយល់ព្រម')
                  "
                />
              </div>
              <div class="col-12 mb-5">
                <label class="form-label d-block mb-3">{{
                  questions[26].text
                }}</label>
                <BaseCheckbox
                  v-model="formData.agreedToCodeOfConduct"
                  :value="questions[26].options.value"
                  :label="questions[26].options.label"
                  :error="errors.agreedToCodeOfConduct"
                  @change="
                    handleValidate('agreedToCodeOfConduct', 'សូមយល់ព្រម')
                  "
                />
              </div>
              <div class="col-12 mb-5">
                <label class="form-label d-block mb-3">{{
                  questions[27].text
                }}</label>
                <BaseCheckbox
                  v-model="formData.agreedToAttendancePolicy"
                  :value="questions[27].options.value"
                  :label="questions[27].options.label"
                  :error="errors.agreedToAttendancePolicy"
                  @change="
                    handleValidate('agreedToAttendancePolicy', 'សូមយល់ព្រម')
                  "
                />
              </div>
              <div class="col-12 mb-5">
                <label class="form-label d-block mb-3">{{
                  questions[28].text
                }}</label>
                <BaseCheckbox
                  v-model="formData.agreedToEligibilityPolicy"
                  :value="questions[28].options.value"
                  :label="questions[28].options.label"
                  :error="errors.agreedToEligibilityPolicy"
                  @change="
                    handleValidate('agreedToEligibilityPolicy', 'សូមយល់ព្រម')
                  "
                />
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <BaseButton class="w-100 btn-custom" type="submit"
                  >បញ្ជូន</BaseButton
                >
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useSubmissionsStore } from "@/stores/submissions";
import bannerImage from "@/assets/images/banner.png";
import { questions } from "@/constants/formQuestions";
import { useFormSubmissionLogic } from "@/composables/useFormSubmissionLogic";
import { useFormValidationLogic } from "@/composables/useFormValidationLogic";

const submissionsStore = useSubmissionsStore();
const router = useRouter();

onMounted(async () => {
  try {
    await submissionsStore.GetForm_DraftData();
  } catch (error) {
    console.error("Failed to load form data:", error);

    if (error.status === 403 || error.status === 400) {
      router.push({ name: "form-submitted" });
      return;
    }
  }
});

const { formData } = useFormSubmissionLogic();

const { errors, handleValidate, handleFileUpload, handleSubmit } =
  useFormValidationLogic(formData);
</script>

<style scoped>
.page-container {
  background-color: var(--bg-body, #f3f6f6);
  min-height: 100vh;
}

.form-container {
  max-width: 1000px;
  margin: 0 auto;
}

.form-label {
  font-weight: 500 !important;
  font-size: 16px !important;
  margin-bottom: 0.5rem;
}

.form-header {
  background-color: var(--primary-color, #357867);
}
.banner-image {
  width: 1000px;
}
</style>