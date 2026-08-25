<template>
  <div class="not-found-page d-flex flex-column justify-content-center align-items-center min-vh-100 bg-white">
    <div class="error-container text-center position-relative">
      <div class="bg-circle circle-1"></div>
      <div class="bg-circle circle-2"></div>
      <div class="bg-circle circle-3"></div>
      
      <i class="bi bi-star-fill star star-1"></i>
      <i class="bi bi-star-fill star star-2"></i>
      <i class="bi bi-stars star star-3"></i>

      <div class="error-code d-flex justify-content-center align-items-center mb-4">
        <span>4</span>
        <div class="error-zero">
          <i class="bi bi-emoji-frown-fill"></i>
        </div>
        <span>4</span>
      </div>
      
      <h2 class="error-title fw-semibold mb-3">ទំព័រដែលអ្នកកំពុងស្វែងរកមិនត្រូវបានរកឃើញទេ។</h2>
    </div>
    <BaseButton class="mt-4" @click="$router.push({ name: 'login' })">
      ត្រលប់ទៅទំព័រដើមវិញ
    </BaseButton>
  </div>
</template>

<script setup>
</script>

<style scoped>

.error-container {
  z-index: 1;
  padding: 2rem;
  max-width: 600px;
  width: 100%;
}

.error-code {
  font-size: 10rem;
  font-weight: 900;
  color: var(--primary-color);
  letter-spacing: -5px;
  position: relative;
  z-index: 10;
  line-height: 1;
  margin-top: 2rem;
}

.error-zero {
  margin: 0 10px;
  color: var(--primary-color-600);
  display: flex;
  justify-content: center;
  align-items: center;
}

.error-zero i {
  font-size: 8rem;
  color: var(--primary-color-600);
}

.error-title {
  color: var(--primary-color);
  font-size: 1.8rem;
}


.bg-circle {
  position: absolute;
  border-radius: 50%;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
  background-color: var(--primary-color);
}

.circle-1 {
  width: 250px;
  height: 250px;
  opacity: 0.08;
}

.circle-2 {
  width: 380px;
  height: 380px;
  opacity: 0.05;
}

.circle-3 {
  width: 500px;
  height: 500px;
  opacity: 0.02;
}

.star {
  position: absolute;
  color: var(--primary-color-600);
  z-index: 2;
  animation: float 3s ease-in-out infinite alternate;
}

.star-1 {
  top: 15%;
  right: 20%;
  font-size: 1.2rem;
  opacity: 0.6;
}

.star-2 {
  top: 30%;
  right: 12%;
  font-size: 2rem;
  color: var(--primary-color);
  animation-delay: 0.5s;
}

.star-3 {
  top: 45%;
  left: 18%;
  font-size: 1.5rem;
  opacity: 0.5;
  animation-delay: 1s;
}

@keyframes float {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-10px);
  }
}
</style>