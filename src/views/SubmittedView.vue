<template>
  <div class="submitted-page position-relative overflow-hidden">
    <div class="bg-shape shape-light-green"></div>
    <div class="bg-shape shape-dark-left"></div>
    <div class="bg-shape shape-dark-right"></div>

    <div class="container min-vh-100 d-flex flex-column justify-content-center align-items-center position-relative z-1">
      
      <div class="mb-4 text-center">
        <img :src="logo_submitted" width="250" alt="">
      </div>

      <div class="card submitted-card border-0 p-4 p-md-5 mb-5 w-100 shadow-sm" style="max-width: 650px;">
        <div class="card-body p-0">
          <h3 class="fw-bold mb-4" style="color: #4a5568;">សូមអរគុណសម្រាប់ការបំពេញទម្រង់បែបបទ</h3>
          
          <h6 class="fw-bold mb-3" style="color: #4a5568;">ទិន្នន័យរបស់អ្នកត្រូវបានកត់ត្រាទុកដោយជោគជ័យ។</h6>
          
          <p class="text-muted mb-1 fs-6">អ្នកអាចបំពេញទម្រង់បែបបទនេះបានតែម្តងប៉ុណ្ណោះ។</p>
          <p class="text-muted mb-4 fs-6">អ្នកអាចទំនាក់ទំនងមកកាន់យើង ប្រសិនបើមានកំហុស ឬបញ្ហាមួយចំនួន។</p>
          
          <hr class="my-4 border-light-subtle">
          
          <a target="_blank" href="https://t.me/ANT_Training" class="text-decoration-none fw-semibold link-custom fs-7">ទំនាក់ទំនងមកកាន់ពួកយើងឥឡូវ</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import logo_submitted from "@/assets/images/logo_submitted.png"

const router = useRouter()

const handleTesting = () => {
  router.push({ name: 'form-resubmit' })
}
</script>

<style scoped>
.submitted-page {
  background-color: #f7f9f8; 
}

.bg-shape {
  position: absolute;
  z-index: 0;
}

.shape-light-green {
  background-color: #c7eadf; 
  height: 100px;
  width: 150vw;
  top: 60%;
  left: -20vw;
  transform: translateY(-50%) rotate(-8deg);
}

.shape-dark-left {
  background-color: var(--primary-color);
  height: 100px;
  width: 50vw;
  top: 60%;
  left: -27vw;
  transform: rotate(-8deg);
}

.shape-dark-right {
  background-color: var(--primary-color);
  height: 100px;
  width: 50vw;
  top: 48%;
  right: -27vw;
  transform: rotate(-8deg);
}

.submitted-card {
  border-radius: 4px;
  background-color: var(--bg-card);
  box-shadow: var(--card-shadow);
  z-index: 10;
}

.link-custom {
  color: var(--primary-color-600); 
}
.link-custom:hover {
  color: var(--primary-color);
}
</style>
