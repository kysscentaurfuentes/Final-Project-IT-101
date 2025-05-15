<template>
  <div class="scanqr-container">
    <aside class="side-navigation">
      <NavigationBar />
    </aside>
    <div class="scanqr-form-container">
      <div class="scanqr-overlay"></div>
      <div class="scanqr-form">
        <h2>Student Sign-In</h2>

        <div v-if="errorMessage" class="error-message">
          <i class="fas fa-exclamation-circle"></i>
          {{ errorMessage }}
        </div>

        <div class="form-group">
          <label for="studentId">Scan QR Code (Student ID)</label>
          <input
            type="text"
            id="studentId"
            v-model="studentId"
            placeholder="Enter scanned ID"
            @input="handleInput"
          />
        </div>

        <div class="qr-code-preview" v-if="showQrCode">
          <img :src="qrCodeImage" alt="QR Code Example" width="300" />
          <p class="qr-code-info">Point your device to scan the QR code.</p>
        </div>

        <div v-if="message" class="success-message">
          <i class="fas fa-check-circle"></i>
          {{ message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios"; // Make sure you have axios installed: npm install axios
import qrCodeImage from "../assets/images/QR Code.jpg";
import NavigationBar from "./NavigationBar.vue"; // Import the NavigationBar component

const studentId = ref("");
const message = ref("");
const errorMessage = ref("");
const apiUrl = ref("http://localhost:3000/api/students"); // Adjust to your backend URL
const showQrCode = ref(true); // Control visibility of the example QR code

const handleInput = (event) => {
  studentId.value = event.target.value;
};

const signIn = async () => {
  errorMessage.value = "";
  message.value = "";

  if (!studentId.value) {
    errorMessage.value = "Please enter or scan your Student ID.";
    return;
  }

  try {
    const response = await axios.post(`${apiUrl.value}/signin`, {
      studentId: studentId.value,
    });
    message.value = `Successfully signed in at ${new Date(
      response.data.signin_time
    ).toLocaleString()}`;
    studentId.value = ""; // Clear input field
  } catch (err) {
    console.error(
      "Sign-in error:",
      err.response ? err.response.data : err.message
    );
    errorMessage.value = err.response
      ? err.response.data.error
      : "Failed to sign in. Please try again.";
  }
};
</script>

<style scoped>
.scanqr-container {
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #a1c4fd, #c2e9fb);
  overflow: hidden;
  position: relative;
}

.side-navigation {
  background-color: #333;
  color: white;
  width: 200px; /* Adjust as needed, same as MainMenu */
  padding: 20px;
  z-index: 2; /* Ensure it's above the overlay */
}

.scanqr-form-container {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem; /* Add some padding around the form */
}

.scanqr-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  pointer-events: none;
}

.scanqr-form {
  background-color: rgba(255, 255, 255, 0.85);
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 400px;
  text-align: center;
  z-index: 1;
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

h2 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 1.5rem;
}

.error-message {
  background-color: #f8d7da;
  color: #721c24;
  padding: 0.8rem;
  border-radius: 0.4rem;
  margin-bottom: 1rem;
  text-align: center;
  animation: shakeError 0.5s ease-in-out;
  font-size: 0.9rem;
}

@keyframes shakeError {
  0%,
  100% {
    transform: translateX(0);
  }
  20%,
  60% {
    transform: translateX(-0.5rem);
  }
  40%,
  80% {
    transform: translateX(0.5rem);
  }
}

.form-group {
  margin-bottom: 1.25rem;
  text-align: left;
}

label {
  display: block;
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 0.5rem;
}

input[type="text"] {
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 0.5rem;
  background-color: rgba(220, 220, 220, 0.3);
  box-shadow: inset 0 0.1rem 0.3rem rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
  font-size: 1rem;
}

input[type="text"]:focus {
  outline: none;
  box-shadow: 0 0 0.5rem #a1c4fd;
}

.signin-button {
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 0.5rem;
  background: linear-gradient(to right, #a1c4fd, #c2e9fb);
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.2);
  margin-top: 1.5rem;
}

.signin-button:hover {
  transform: scale(1.02);
  box-shadow: 0 0 0.5rem #a1c4fd;
}

.success-message {
  background-color: #d4edda;
  color: #155724;
  padding: 0.8rem;
  border-radius: 0.4rem;
  margin-top: 1rem;
  text-align: center;
  font-size: 0.9rem;
}

.qr-code-preview {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.qr-code-info {
  font-size: 0.8rem;
  color: #777;
  margin-top: 0.5rem;
}
</style>
