<template>
  <div class="resubmit-page d-flex flex-column min-vh-100 position-relative">
    
    <div class="top-half d-flex justify-content-center align-items-center">
      <div class="illustration-placeholder">
        <img :src="logo_resubmit" width="350" alt="">
      </div>
    </div>

    <div class="bottom-half d-flex flex-column align-items-center text-center p-4 flex-grow-1">
      <div class="content-wrapper mt-5">
        <h3 class="fw-bold mb-4" style="color: #4a5568;">ទម្រង់បែបបទនេះមិនបានដាក់អោយប្រើប្រាស់ទេ។</h3>
        <p class="text-muted mb-4 fs-6">
          ប្រសិនបើអ្នកគិតថានេះកើតឡើងដោយកំហុសណាមួយ សូមទំនាក់ទំនងទៅកាន់ការងារដែលផ្តល់ទម្រង់បែបបទនេះដល់អ្នក។
        </p>
        <a href="#" class="text-decoration-none fw-semibold link-custom fs-6">
          ទាក់ទងមកកាន់ពួកយើងឥឡូវ
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import logo_resubmit from '@/assets/images/logo_resubmit.png'

const router = useRouter()

const handleReturn = () => {
  router.push({ name: 'login' })
}
</script>

<style scoped>
.resubmit-page {
  background-color: #f2f5f8;
}

.top-half {
  background-color: var(--primary-color, #357867);
  height: 50vh;
  width: 100%;
}

.bottom-half {
  background-color: #f2f5f8;
}

.illustration-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
}

.illustration-icon {
  font-size: 10rem;
  color: rgba(255, 255, 255, 0.8);
  text-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.content-wrapper {
  max-width: 750px;
}

.link-custom {
  color: var(--primary-color-600, #2ab896); 
}

.link-custom:hover {
  color: var(--primary-color, #357867);
}

.btn-return {
  background-color: var(--primary-color, #357867);
  border-color: var(--primary-color, #357867);
  font-size: 0.95rem;
}

.btn-return:hover {
  background-color: #2c6355;
  border-color: #2c6355;
}
</style>