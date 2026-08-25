<template>
  <div class="login-page">
    <div class="login-container">
      <div class="card login-card">
        <div class="card-body text-center">

          <div class="logo-section mb-4">
            <img :src="ant_logo" alt="ANT Logo" width="150"/>
          </div>

          <h3 class="form-title fw-semibold mb-3">
            ថ្នាក់បណ្តុះបណ្តាលបច្ចេកវិទ្យា - ANT
          </h3>

          <p class="form-subtitle mb-4">
            ចូលប្រើប្រាស់គណនី Google របស់អ្នកដើម្បីបន្ត
          </p>

          <div v-if="alert.message"
            :class="['alert', alert.type === 'success'? 'alert-success': 'alert-danger']" role="alert">
            {{ alert.message }}
          </div>

          <div class="google-section d-flex justify-content-center align-items-center">
            <div class="custom-google-wrapper">
              <button class="custom-google-btn">
                <img :src="google_img" width="25" class="me-2" alt="">
                បន្តជាមួយ Google
              </button>
              <div ref="googleButton" class="google-button-invisible"></div>
            </div>
          </div>

          <div v-if="authStore.isLoginGoogle" class="mt-3">
            <span class="spinner-border spinner-border-sm me-2"></span>
            កំពុងចូល...
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ant_logo from "@/assets/images/ANT.png";
import google_img from "@/assets/images/google.png"
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const googleButton = ref(null);

const alert = ref({
  message: "",
  type: "error",
});

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function showAlert(message, type = "error") {
  alert.value = {message,type};
}

async function handleGoogleLogin(response) {
  console.log(response)
  if (!response?.credential) {
    showAlert("Google sign-in failed. Please try again.");
    return;
  }
  try {
    alert.value.message = "";
    const res = await authStore.GoogleLogin(response.credential);
    showAlert(res.message);
    alert.value.type = "success";

    setTimeout(() => {router.push("/form")}, 800);

  } catch (error) {
    showAlert(error?.message || "An error occurred");
  }
}

function initializeGoogle() {
  if (!GOOGLE_CLIENT_ID) {
    showAlert("Google Login is not configured.")
    return;
  }
  if (!window.google) {
    setTimeout(initializeGoogle ,500);
    return;
  }

  window.google.accounts.id.initialize({
    client_id: GOOGLE_CLIENT_ID,
    callback: handleGoogleLogin,
    auto_select: false,
  });

  if (googleButton.value) {
    window.google.accounts.id.renderButton(
      googleButton.value,
      {
        theme: "outline",
        size: "large",
        text: "continue_with",
        shape: "pill",
        width: 250,
      }
    );
  }
}

onMounted(() => {
  const existingScript = document.getElementById("google-script");

  if (!existingScript) {
    const script = document.createElement("script");
    script.id = "google-script";
    script.src = "https://accounts.google.com/gsi/client?hl=km";

    script.async = true;
    script.defer = true;

    script.onload = initializeGoogle;
    document.head.appendChild(script);

  } else {
    initializeGoogle();
  }
});
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background:
  linear-gradient(110deg,var(--primary-color, #357867) 50%,#ffffff 50%);
  padding: 1rem;
}

.login-container {
  width: 100%;
  max-width: 500px;
}

.login-card {
  border: none;
  border-radius: 16px;
  box-shadow: var(--card-shadow);
  padding: 2.5rem 2rem;
  background-color: white;
}

.logo-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-title {
  color: var(--heading-color);
}

.form-subtitle {
  color: var(--text-base);
}

.google-section {
  min-height: 44px;
}

.custom-google-wrapper {
  position: relative;
  width: 250px;
  height: 40px; /* Standard Google button height */
}

.custom-google-btn {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border: 1px solid #dadce0;
  border-radius: 20px; 
  font-family: 'Kantumruy Pro', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #3c4043;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
  pointer-events: none;
}

.custom-google-wrapper:hover .custom-google-btn {
  background-color: #f8f9fa;
}

.google-icon {
  margin-right: 10px;
}

.google-button-invisible {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.001;
  z-index: 10;
  overflow: hidden;
}
</style>