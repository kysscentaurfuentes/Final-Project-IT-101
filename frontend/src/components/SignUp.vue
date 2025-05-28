<template>
  <div class="signup-container">
    <div class="signup-overlay"></div>
    <div class="logo-container">
      <img
        src="../assets/images/caraga_State_University_Logo.png"
        alt="CSU Logo"
        class="csu-logo"
      />
    </div>
    <form class="signup-form glass" @submit.prevent="register">
      <h2>Create Account</h2>

      <div v-if="errorMessage" class="error-message">
        <i class="fas fa-exclamation-circle"></i>
        {{ errorMessage }}
      </div>

      <div class="form-group">
        <label for="role">Register As</label>
        <select id="role" v-model="selectedRole" required class="black-font">
          <option value="student" class="black-font">Student</option>
          <option value="employee" class="black-font">Employee</option>
          <option value="admin" class="black-font">Admin</option>
        </select>
      </div>

      <div class="form-group">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          v-model="username"
          placeholder="Enter your username"
          required
        />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          placeholder="Enter your email"
          required
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Enter your password"
          required
        />
      </div>

      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          v-model="confirmPassword"
          placeholder="Confirm your password"
          required
        />
      </div>

      <div class="form-group" v-if="selectedRole === 'student'">
        <label for="studentId">Student ID</label>
        <input
          type="text"
          id="studentId"
          v-model="studentId"
          placeholder="Enter your Student ID"
          required
        />
      </div>

      <div class="form-group" v-if="selectedRole === 'student'">
        <label for="birthdate">Birthdate</label>
        <input
          type="date"
          id="birthdate"
          v-model="birthdate"
          placeholder="Enter your Birthdate"
          required
        />
      </div>

      <div class="form-group" v-if="selectedRole === 'student'">
        <label for="mobileNumber">Mobile Number</label>
        <input
          type="tel"
          id="mobileNumber"
          v-model="mobileNumber"
          placeholder="Enter your Mobile Number"
          required
        />
      </div>

      <div class="form-group captcha-container">
        <input
          type="checkbox"
          id="captcha"
          v-model="isCaptchaVerified"
          required
        />
        <label for="captcha">I'm not a robot</label>
      </div>

      <div class="form-group privacy-agreement">
        <input
          type="checkbox"
          id="privacyTerms"
          v-model="agreedToTerms"
          required
        />
        <label for="privacyTerms">
          I agree to the
          <router-link to="/privacy-terms">
            Privacy Policy & Terms of conditions
          </router-link>
        </label>
      </div>

      <button
        type="submit"
        class="signup-button"
        :disabled="!isFormValid || !agreedToTerms || !isCaptchaVerified"
      >
        Sign Up
      </button>

      <div class="form-links">
        <router-link to="/">Already have an account? Sign In | </router-link>
        <router-link to="/help-login">Can't log in?</router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter, RouterLink } from "vue-router";
import axios from "axios"; // For API calls
import backgroundImage from "../assets/images/csu library entrance (3).jpg";

const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const studentId = ref("");
const birthdate = ref("");
const mobileNumber = ref("");
const errorMessage = ref("");
const router = useRouter();
const isCaptchaVerified = ref(false); // Simple checkbox
const selectedRole = ref("student"); // Default role
const agreedToTerms = ref(false); // For the privacy terms checkbox

const isFormValid = computed(() => {
  const baseValid =
    username.value &&
    email.value &&
    password.value &&
    confirmPassword.value &&
    password.value === confirmPassword.value;

  if (selectedRole.value === "student") {
    return (
      baseValid && studentId.value && birthdate.value && mobileNumber.value
    );
  }
  return baseValid;
});

const register = async () => {
  errorMessage.value = "";

  if (!isFormValid.value) {
    errorMessage.value = "Please fill out all required fields correctly.";
    return;
  }

  if (!agreedToTerms.value) {
    errorMessage.value = "Please agree to the Privacy Policy & Terms.";
    return;
  }

  if (!isCaptchaVerified.value) {
    errorMessage.value = "Please verify that you are not a robot.";
    return;
  }

  try {
    const registrationData = {
      username: username.value,
      email: email.value,
      password: password.value,
      role: selectedRole.value,
    };

    if (selectedRole.value === "student") {
      registrationData.studentId = studentId.value;
      registrationData.birthdate = birthdate.value;
      registrationData.mobileNumber = mobileNumber.value;
    }

    const response = await axios.post("/api/auth/register", registrationData);

    if (response.data.success) {
      alert(
        "Registration successful! Please check your email for verification."
      );
      router.push("/"); // Redirect to sign in
    } else {
      errorMessage.value = response.data.message || "Registration failed.";
    }
  } catch (error) {
    console.error("Registration error:", error);
    errorMessage.value = "Registration failed. Please try again.";
  }
};
</script>

<style scoped>
.signup-container {
  display: flex;
  flex-direction: column; /* Stack logo and form */
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url("../assets/images/CSU Library entrance.jpg"); /* Changed background image */
  background-size: cover; /* Make the background image cover the entire container */
  background-position: center;
  overflow-y: auto;
  position: relative;
  padding: 20px;
  box-sizing: border-box; /* Ensure padding doesn't affect overall size */
}

.signup-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent; /* No dark overlay */
  pointer-events: none;
}

.logo-container {
  /* Center the logo */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px; /* Add some space between logo and form */
  width: 100%; /* Ensure it takes full width to center properly */
}

.csu-logo {
  width: 200px; /* Adjust the size as needed */
  height: auto; /* Maintain aspect ratio */
  display: block; /* Prevent extra space below the image */
}

.signup-form {
  background-color: transparent; /* Completely transparent background */
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 400px;
  text-align: center;
  z-index: 1;
  animation: fadeIn 0.5s ease-out;
  backdrop-filter: blur(5px); /* Add blur for a glass effect */
  border: 1px solid rgba(255, 255, 255, 0.3); /* Subtle border */
  color: white; /* Default text color for the form */
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
  color: white; /* White font */
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.25rem;
  text-align: left;
}

label {
  display: block;
  font-size: 0.9rem;
  color: white; /* White font */
  margin-bottom: 0.5rem;
}

select,
input[type="text"],
input[type="email"],
input[type="password"],
input[type="date"],
input[type="tel"] {
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 0.5rem;
  background-color: rgba(255, 255, 255, 0.3);
  box-shadow: inset 0 0.1rem 0.3rem rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
  font-size: 1rem;
  color: white; /* White font */
}

::placeholder {
  color: rgba(255, 255, 255, 0.7); /* Light white placeholder text */
}

select:focus,
input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus,
input[type="date"]:focus,
input[type="tel"]:focus {
  outline: none;
  box-shadow: 0 0 0.5rem #bbdefb; /* Light blue glowing effect on focus */
}

.captcha-container {
  display: flex;
  align-items: center;
  margin-top: 1rem;
}

.captcha-container input[type="checkbox"] {
  margin-right: 0.5rem;
  appearance: none;
  width: 1.2rem;
  height: 1.2rem;
  border: 0.1rem solid #bbdefb;
  border-radius: 0.2rem;
  cursor: pointer;
  position: relative;
  background-color: white; /* White checkbox background */
}

.captcha-container input[type="checkbox"]:checked::before {
  content: "\f00c"; /* Font Awesome checkmark */
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  font-size: 0.8rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #2196f3; /* Blue checkmark */
}

.captcha-container label {
  color: white; /* White font */
}

.privacy-agreement {
  display: flex;
  align-items: center;
  margin-top: 1rem;
}

.privacy-agreement input[type="checkbox"] {
  margin-right: 0.5rem;
  appearance: none;
  width: 1.2rem;
  height: 1.2rem;
  border: 0.1rem solid #bbdefb;
  border-radius: 0.2rem;
  cursor: pointer;
  position: relative;
  background-color: white; /* White checkbox background */
}

.privacy-agreement input[type="checkbox"]:checked::before {
  content: "\f00c"; /* Font Awesome checkmark */
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  font-size: 0.8rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #2196f3; /* Blue checkmark */
}

.privacy-agreement label {
  color: white;
}

.privacy-agreement label a {
  color: #bbdefb;
  text-decoration: underline;
}

.privacy-agreement label a:hover {
  text-decoration: none;
}

.signup-button {
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 0.5rem;
  background: linear-gradient(
    to right,
    #bbdefb,
    #64b5f6
  ); /* Light blue gradient button */
  color: #333; /* Dark text on button */
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.2);
  margin-top: 1.5rem;
}

.signup-button:hover {
  transform: scale(1.02);
  box-shadow: 0 0 0.5rem #bbdefb; /* Light blue glowing effect on hover */
}

.signup-button:disabled {
  background: #eee;
  color: #999;
  cursor: not-allowed;
  box-shadow: none;
}

.form-links {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.9rem;
  color: white; /* White font */
}

.form-links a {
  color: #bbdefb;
  text-decoration: none;
  transition: color 0.3s ease;
}

.form-links a:hover {
  color: #e0f7fa;
  text-decoration: underline;
}

.error-message {
  background-color: #ffdde0;
  color: #d32f2f;
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

/* Specific style for the select options to be black */
.black-font,
.black-font option {
  color: black !important;
}

/* Background Animation (Example - Simple Gradient) */

.signup-container {
  background-size: cover; /* Make sure the background covers the whole area */
}
</style>
