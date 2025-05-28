<template>
  <div class="scanqr-container" :class="{ 'dark-mode': isDarkMode }">
    <aside class="side-navigation" :class="{ 'dark-mode': isDarkMode }">
      <NavigationBar />
    </aside>
    <div class="scanqr-form-container">
      <div class="scanqr-overlay" :class="{ 'dark-mode': isDarkMode }"></div>
      <div class="scanqr-form" :class="{ 'dark-mode': isDarkMode }">
        <h2>Student Sign-In</h2>

        <div v-if="errorMessage" class="error-message">
          <i class="fas fa-exclamation-circle"></i>
          {{ errorMessage }}
        </div>

        <div class="form-group">
          <div class="label-container" :class="{ 'dark-mode': isDarkMode }">
            <label for="studentId">Track latest Signed in Student ID:</label>
            <span class="friend-id">Your Student ID: 211-01850</span>
          </div>
          <input
            type="text"
            id="studentId"
            v-model="studentId"
            placeholder="Enter scanned ID/QR here"
            @input="handleInput"
            :class="{ 'dark-mode': isDarkMode }"
          />
        </div>
        <button class="find-button" @click="findSignInRecord">
          Find Record
        </button>

        <div class="qr-code-preview" v-if="showQrCode">
          <img :src="qrCodeImage" alt="QR Code Example" width="300" />
          <p class="qr-code-info" :class="{ 'dark-mode': isDarkMode }">
            Point your device to scan the QR code.
          </p>
          <div class="scan-status-container">
            <div
              v-if="scanStatus"
              class="scan-status"
              :class="{
                success: isSuccess,
                failed: !isSuccess,
                'dark-mode': isDarkMode,
              }"
            >
              <i
                :class="{
                  'fas fa-check-circle': isSuccess,
                  'fas fa-times-circle': !isSuccess,
                }"
              ></i>
              {{ scanStatus }}
              <p
                class="scan-time"
                v-if="signInTime"
                :class="{ 'dark-mode': isDarkMode }"
              >
                Scanned at: {{ signInTime }}
              </p>
            </div>
          </div>
        </div>

        <div v-if="message" class="success-message">
          <i class="fas fa-check-circle"></i>
          {{ message }}
        </div>

        <div
          v-if="findMessage"
          class="find-message"
          :class="{ 'dark-mode': isDarkMode }"
        >
          <i class="fas fa-info-circle"></i>
          {{ findMessage }}
        </div>
        <div v-if="findError" class="error-message">
          <i class="fas fa-exclamation-circle"></i>
          {{ findError }}
        </div>
        <div
          v-if="signInRecord"
          class="sign-in-record"
          :class="{ 'dark-mode': isDarkMode }"
        >
          <h3>Sign-In Record for Today</h3>
          <p v-if="signInRecord.length > 0">
            Signed in at: {{ formatDateTime(signInRecord[0].signin_time) }}
          </p>
          <p v-else>No sign-in record found for today.</p>
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
import { format } from "date-fns"; // Import date-fns for formatting
import { useDarkMode } from "../composables/useDarkMode"; // Import the composable

const { isDarkMode } = useDarkMode(); // Get the isDarkMode ref

const studentId = ref("");
const message = ref("");
const errorMessage = ref("");
const apiUrl = ref("http://localhost:3000/api/students"); // Adjust to your backend URL
const showQrCode = ref(true); // Control visibility of the example QR code
const scanStatus = ref("");
const isSuccess = ref(false);
const signInTime = ref("");
const findMessage = ref("");
const findError = ref("");
const signInRecord = ref(null);

const handleInput = (event) => {
  // Allow only numbers and limit to 8 digits
  const numericInput = event.target.value.replace(/[^0-9]/g, "").slice(0, 8);
  if (numericInput.length > 3 && !numericInput.includes("-")) {
    studentId.value = numericInput.slice(0, 3) + "-" + numericInput.slice(3);
  } else {
    studentId.value = numericInput;
  }
  // Reset scan status on input change
  scanStatus.value = "";
  isSuccess.value = false;
  signInTime.value = "";
};

const signIn = async () => {
  errorMessage.value = "";
  message.value = "";
  scanStatus.value = "";
  isSuccess.value = false;
  signInTime.value = "";

  if (!studentId.value) {
    errorMessage.value = "Please enter or scan your Student ID.";
    return;
  }

  try {
    const response = await axios.post(`${apiUrl.value}/signin`, {
      studentId: studentId.value,
    });
    message.value = `Successfully signed in at ${format(
      new Date(response.data.signin_time),
      "yyyy-MM-dd HH:mm:ss"
    )}`;
    scanStatus.value = "Scan Successful!";
    isSuccess.value = true;
    signInTime.value = format(
      new Date(response.data.signin_time),
      "yyyy-MM-dd HH:mm:ss"
    );
    studentId.value = ""; // Clear input field
  } catch (err) {
    console.error(
      "Sign-in error:",
      err.response ? err.response.data : err.message
    );
    errorMessage.value = err.response
      ? err.response.data.error
      : "Failed to sign in. Please try again.";
    scanStatus.value = "Scan Failed.";
    isSuccess.value = false;
    signInTime.value = format(new Date(), "yyyy-MM-dd HH:mm:ss"); // Show current time on failure as well
  }
};

const findSignInRecord = async () => {
  findMessage.value = "";
  findError.value = "";
  signInRecord.value = null;

  if (!studentId.value) {
    findError.value = "Please enter a Student ID to find the record.";
    return;
  }

  try {
    const response = await axios.get(
      `<span class="math-inline">\{apiUrl\.value\}/signin/</span>{studentId.value}/today`
    );
    if (response.data && response.data.length > 0) {
      signInRecord.value = response.data;
    } else {
      findMessage.value = "No sign-in record found for today.";
    }
    studentId.value = ""; // Clear input field
  } catch (err) {
    console.error(
      "Find record error:",
      err.response ? err.response.data : err.message
    );
    findError.value = err.response
      ? err.response.data.error
      : "Failed to find sign-in record.";
  }
};

const formatDateTime = (dateTimeString) => {
  try {
    return format(new Date(dateTimeString), "yyyy-MM-dd HH:mm:ss");
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid Date";
  }
};
</script>

<style scoped>
/* Container for the label and friend ID */
.label-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  color: #333;
  transition: color 0.3s ease;
}

body.dark-mode .label-container {
  color: #f0f0f0;
}

/* Align friend ID to the right */
.friend-id {
  font-size: 0.8rem;
  color: #777;
  transition: color 0.3s ease;
}

body.dark-mode .friend-id {
  color: #bbb;
}

/* Container for the scan status and time */
.scan-status-container {
  margin-top: 1rem;
  text-align: center; /* Center the status and time */
}

/* Main container for the scan status */
.scan-status {
  display: inline-flex; /* Align icon and text horizontally */
  align-items: center; /* Vertically align icon and text */
  background-color: #f8f9fa; /* Light background */
  color: #495057; /* Dark text */
  padding: 0.75rem 1.25rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  margin-top: 0.5rem; /* Space from "Point your device..." */
  transition: background-color 0.3s ease, color 0.3s ease;
}

body.dark-mode .scan-status {
  background-color: #444;
  color: #d4d4d4;
  box-shadow: none;
}

/* Style for successful scan */
.scan-status.success {
  background-color: #d1e7dd;
  color: #155724;
}

body.dark-mode .scan-status.success {
  background-color: #28a745;
  color: #f8f8f2;
}

/* Style for failed scan */
.scan-status.failed {
  background-color: #f8d7da;
  color: #721c24;
}

body.dark-mode .scan-status.failed {
  background-color: #dc3545;
  color: #f8f8f2;
}

/* Icon styling */
.scan-status i {
  margin-right: 0.75rem;
  font-size: 1.2rem;
}

/* Styling for the timestamp */
.scan-time {
  font-size: 0.9rem;
  color: #6c757d;
  margin-top: 0.5rem;
  font-weight: normal;
  transition: color 0.3s ease;
}

body.dark-mode .scan-time {
  color: #bbb;
}

/* ... (rest of your existing CSS) ... */

.scanqr-container {
  display: flex;
  min-height: 100vh;
  background-color: #fff; /* Force white background */
  overflow: hidden;
  position: relative;
  transition: background-color 0.3s ease;
}

body.dark-mode .scanqr-container {
  background-color: #1e1e1e;
}

.side-navigation {
  background-color: #333;
  color: white;
  width: 200px; /* Adjust as needed, same as MainMenu */
  padding: 20px;
  z-index: 2; /* Ensure it's above the overlay */
  transition: background-color 0.3s ease, color 0.3s ease;
}

body.dark-mode .side-navigation {
  background-color: #252525;
  color: #d4d4d4;
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
  transition: background-color 0.3s ease;
}

body.dark-mode .scanqr-overlay {
  background-color: rgba(0, 0, 0, 0.5);
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
  transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
}

body.dark-mode .scanqr-form {
  background-color: #333;
  color: #6dd5ed;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5);
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
  transition: color 0.3s ease;
}

body.dark-mode h2 {
  color: #6dd5ed;
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
  transition: background-color 0.3s ease, color 0.3s ease;
}

body.dark-mode .error-message {
  background-color: #42201f;
  color: #f8d7da;
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
  margin-bottom: 1rem;
  text-align: left;
}

label {
  display: block;
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
}

body.dark-mode label {
  color: #f0f0f0;
}

input[type="text"] {
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 0.5rem;
  background-color: rgba(220, 220, 220, 0.3);
  box-shadow: inset 0 0.1rem 0.3rem rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
}

body.dark-mode input[type="text"] {
  background-color: #444;
  color: #d4d4d4;
  box-shadow: inset 0 0.1rem 0.3rem rgba(0, 0, 0, 0.3);
}

input[type="text"]:focus {
  outline: none;
  box-shadow: 0 0 0.5rem #a1c4fd;
}

body.dark-mode input[type="text"]:focus {
  box-shadow: 0 0 0.5rem #6dd5ed;
}

.find-button {
  width: 100%;
  padding: 0.8rem;
  border: none;
  border-radius: 0.5rem;
  background-color: #6c757d;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, color 0.3s ease;
  margin-top: 0.5rem;
}

body.dark-mode .find-button {
  background-color: #5a6268;
  color: #f8f8f2;
}

.find-button:hover {
  background-color: #5a6268;
}

body.dark-mode .find-button:hover {
  background-color: #495057;
}

.qr-code-preview {
  margin-top: 1rem;
  margin-bottom: 1rem;
  text-align: center; /* Center the QR code and info */
}

.qr-code-info {
  font-size: 0.8rem;
  color: #777;
  margin-top: 0.5rem;
  transition: color 0.3s ease;
}

body.dark-mode .qr-code-info {
  color: #bbb;
}

.success-message {
  background-color: #d4edda;
  color: #155724;
  padding: 0.8rem;
  border-radius: 0.4rem;
  margin-top: 1rem;
  text-align: center;
  font-size: 0.9rem;
  transition: background-color 0.3s ease, color 0.3s ease;
}

body.dark-mode .success-message {
  background-color: #198754;
  color: #d1e7dd;
}

.find-message {
  background-color: #e9ecef;
  color: #383d41;
  padding: 0.8rem;
  border-radius: 0.4rem;
  margin-top: 1rem;
  text-align: center;
  font-size: 0.9rem;
  transition: background-color 0.3s ease, color 0.3s ease;
}

body.dark-mode .find-message {
  background-color: #495057;
  color: #f8f9fa;
}

.sign-in-record {
  margin-top: 1.5rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  text-align: left;
  font-size: 0.9rem;
  background-color: #f9f9f9;
  transition: background-color 0.3s ease, color 0.3s ease,
    border-color 0.3s ease;
}

body.dark-mode .sign-in-record {
  background-color: #444;
  color: #d4d4d4;
  border-color: #666;
}

.sign-in-record h3 {
  font-size: 1.1rem;
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: #333;
  text-align: center;
  transition: color 0.3s ease;
}

body.dark-mode .sign-in-record h3 {
  color: #6dd5ed;
}
</style>
