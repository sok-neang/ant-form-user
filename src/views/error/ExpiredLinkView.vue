<template>
  <div class="expired-page">
    <div class="container d-flex justify-content-center align-items-center min-vh-100">
      
      <div class="card expired-card border-0 text-center shadow-lg w-100">
        <div class="card-body p-4 p-md-5 d-flex flex-column align-items-center">
          
          <div class="illustration-section">
            <img :src="logo_expired" width="350" alt="">
          </div>

          <h3 class="fw-bold mb-3" style="color: #3b4559;">តំណភ្ជាប់បានផុតកំណត់</h3>
          <p class="text-muted mb-5 form-subtitle">
            តំណភ្ជាប់នេះបានផុតកំណត់ ឬត្រូវបានប្រើប្រាស់រួចហើយ។ ដើម្បីសុវត្ថិភាព<br class="d-none d-md-block">
            តំណភ្ជាប់ត្រូវបានកំណត់ពេលវេលា។ សូមស្នើសុំតំណភ្ជាប់ថ្មីដើម្បីបន្ត។
          </p>

          <!-- <button class="btn btn-primary btn-request-new" @click="handleRequestNew">
            ស្នើសុំតំណភ្ជាប់ថ្មី
          </button> -->
          <BaseButton @click="handleRequestNew">ស្នើសុំតំណភ្ជាប់ថ្មី</BaseButton>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import logo_expired from '@/assets/images/logo_expired.png'

const router = useRouter()

const handleRequestNew = () => {
  // Logic to request a new link or redirect to home/login
  router.push({ name: 'login' })
}
</script>

<style scoped>
.expired-page {
  min-height: 100vh;
  /* Slanted background: Light grayish-white on the left, Primary green on the right */
  background: linear-gradient(110deg, #f8f9fa 50%, var(--primary-color, #357867) 50%);
  display: flex;
  align-items: center;
}

.expired-card {
  max-width: 650px;
  border-radius: 12px;
  background-color: var(--bg-card, #ffffff);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1) !important;
}

.form-subtitle {
  font-size: 0.95rem;
  line-height: 1.7;
  max-width: 500px;
}

.illustration-fallback {
  font-size: 7rem;
  color: #dee2e6;
}

.btn-request-new {
  background-color: var(--primary-color, #357867);
  border-color: var(--primary-color, #357867);
  padding: 12px 30px;
  border-radius: 6px;
  font-weight: 500;
  width: 100%;
  max-width: 400px;
}

.btn-request-new:hover {
  background-color: #2c6355;
  border-color: #2c6355;
}
</style>