<template>
  <div class="privacy-terms-container">
    <div class="privacy-terms-overlay"></div>
    <div class="content-wrapper glass">
      <h2>Privacy Policy & Terms of Service</h2>
      <div class="content">
        <p>
          Please read our Privacy Policy and Terms of Service carefully before
          registering.
        </p>

        <h3>Privacy Policy</h3>
        <p>
          The ICT Café/Office system values your privacy. We are committed to
          protecting any personal information you provide through this platform.
          This includes your name, ID number, email, and any information scanned
          or submitted through the system for log-in purposes or accessing
          library-related services.
        </p>
        <p>
          Your data is used solely to manage your access to computer lab
          services in a secure and efficient way. All collected data is stored
          securely and will never be shared with third parties without your
          explicit consent, unless legally required. We also use basic cookies
          to ensure smooth functionality and enhance your browsing experience
          across the app.
        </p>
        <p>
          You may request to view, modify, or delete your stored information by
          contacting the library ICT administrator. Using this system means you
          understand and agree that your information will be used to replace
          manual logging and streamline ICT access inside the university
          library.
        </p>

        <h3>Terms of Service</h3>
        <p>
          By using the ICT Café/Office system, you agree to use this application
          for its intended purpose, which is to provide seamless access to ICT
          lab services through QR code scanning and digital tools. Manual
          logbooks are now replaced with a more efficient QR-based system to
          help monitor access and usage properly.
        </p>
        <p>
          As a registered user, you are responsible for maintaining the security
          of your account and ID. You are not permitted to misuse the
          application for unauthorized activities or input false data. Any
          violation may result in suspension of access or other disciplinary
          measures.
        </p>
        <p>
          We also reserve the right to change, suspend, or remove features as
          necessary to improve service quality. Continued use of the platform
          after such changes signifies your agreement to the revised terms.
          Notices such as lab downtime, system updates, and feature
          announcements will be posted regularly within the app.
        </p>

        <div v-if="fromSignup">
          <button :disabled="timer > 0" @click="goBack">
            I have read and agree to the Privacy Policy & Terms of Service
            <span v-if="timer > 0" class="spinner">({{ timer }})</span>
          </button>
        </div>
        <button v-else @click="$router.go(-1)">
          I have read and agree to the Privacy Policy & Terms of Service
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const fromSignup = ref(false);
const timer = ref(6); // Set timer to 6 seconds
let interval = null;

const goBack = () => {
  const previousRoute = sessionStorage.getItem("previousRoute");
  if (previousRoute === "SignUp") {
    router.push("/signup");
  } else {
    router.go(-1); // Go back to the previous page in history (usually Settings)
  }
  // Clear the stored route
  sessionStorage.removeItem("previousRoute");
};

onMounted(() => {
  // Check the referrer to see if the user came from the signup page
  if (document.referrer.includes("/signup")) {
    fromSignup.value = true;
    interval = setInterval(() => {
      if (timer.value > 0) {
        timer.value--;
      } else {
        clearInterval(interval);
      }
    }, 1000);
  } else {
    fromSignup.value = false;
    timer.value = 0; // Disable the timer if not from signup
  }
});
</script>

<style scoped>
.privacy-terms-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url("../assets/images/CSU background.jpg");
  background-size: cover;
  background-position: center;
  overflow: auto;
  position: relative;
  transition: background-color 0.3s ease;
}

/* Dark mode styles applied when the 'dark-mode' class is on the body */
body.dark-mode .privacy-terms-container {
  background-color: #1e1e1e;
  color: #d4d4d4;
}

.privacy-terms-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.content-wrapper {
  background-color: rgba(255, 255, 255, 0.15);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
  text-align: center;
  z-index: 1;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  max-width: 800px;
  width: 90%;
  margin: 20px;
  transition: background-color 0.3s ease, border-color 0.3s ease,
    color 0.3s ease;
}

body.dark-mode .content-wrapper {
  background-color: rgba(40, 40, 40, 0.8);
  border-color: rgba(60, 60, 60, 0.8);
  color: #f8f8f2;
}

h2 {
  color: #007bff;
  text-align: center;
  margin-bottom: 20px;
  transition: color 0.3s ease;
}

body.dark-mode h2 {
  color: #6dd5ed;
}

h3,
p {
  color: white;
  text-align: left;
  margin-top: 10px;
  line-height: 1.5;
  transition: color 0.3s ease;
}

body.dark-mode h3,
body.dark-mode p {
  color: #f0f0f0;
}

button {
  display: block;
  width: 100%;
  padding: 10px 15px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 30px;
  transition: background-color 0.3s ease;
  position: relative;
}

body.dark-mode button {
  background-color: #4caf50;
  color: #222;
}

button:hover:enabled {
  background-color: #218838;
}

body.dark-mode button:hover:enabled {
  background-color: #45a049;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.spinner {
  display: inline-block;
  margin-left: 8px;
}
</style>
