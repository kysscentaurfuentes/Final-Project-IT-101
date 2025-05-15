<template>
  <div class="help-login-container">
    <div class="help-login-overlay"></div>
    <div class="help-login-card glass">
      <h2>Can't Log In?</h2>
      <p>
        If you're having trouble signing in, here are some common issues and how
        to resolve them:
      </p>

      <section class="help-section">
        <h3>Forgot Password</h3>
        <p>
          If you've forgotten your password, please click the "Forgot Password"
          link below the sign-in form to reset it.
        </p>
        <p>
          <a href="#" @click.prevent="showForgotPasswordPopup"
            >Forgot Password?</a
          >
        </p>
      </section>

      <section class="help-section">
        <h3>Incorrect Credentials</h3>
        <p>
          Double-check that you have entered your username (or email) and
          password correctly. Ensure that Caps Lock is not enabled.
        </p>
      </section>

      <section class="help-section">
        <h3>Account Locked</h3>
        <p>
          If you've attempted to log in too many times with incorrect
          credentials, your account might be temporarily locked for security
          reasons. Please wait for a short period and try again, or contact
          support if the issue persists.
        </p>
      </section>

      <section class="help-section">
        <h3>Account Not Activated</h3>
        <p>
          If you recently signed up, you might need to activate your account via
          a link sent to your email address. Please check your inbox (and spam
          folder) for the activation email.
        </p>
      </section>

      <section class="help-section">
        <h3>Technical Issues</h3>
        <p>
          If none of the above steps help, there might be a temporary technical
          issue with the system. Please try again later or contact support for
          assistance.
        </p>
        <p>
          You can report an issue or contact support
          <router-link to="/report-issue">here</router-link>.
        </p>
      </section>

      <div class="back-to-signin">
        <router-link to="/">Back to Sign In</router-link>
      </div>
    </div>

    <div v-if="showForgotPassword" class="forgot-password-popup">
      <h3>Reset Password</h3>
      <p>
        Please enter your email address below. We will send a link to your email
        to reset your password.
      </p>
      <div class="form-group">
        <label for="reset-email">Email Address:</label>
        <input type="email" id="reset-email" v-model="resetEmail" required />
      </div>
      <div class="popup-buttons">
        <button @click="submitForgotPassword">Submit</button>
        <button @click="closeForgotPasswordPopup">Cancel</button>
      </div>
      <div v-if="resetMessage" class="reset-message">{{ resetMessage }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, RouterLink } from "vue-router";

const showForgotPassword = ref(false);
const resetEmail = ref("");
const resetMessage = ref("");
const router = useRouter();

const showForgotPasswordPopup = () => {
  showForgotPassword.value = true;
  resetEmail.value = "";
  resetMessage.value = "";
};

const closeForgotPasswordPopup = () => {
  showForgotPassword.value = false;
  resetEmail.value = "";
  resetMessage.value = "";
};

const submitForgotPassword = async () => {
  if (!resetEmail.value) {
    resetMessage.value = "Please enter your email address.";
    return;
  }

  // In a real application, you would send a request to your backend here
  // to initiate the password reset process.
  console.log("Sending reset password request to:", resetEmail.value);

  // Simulate a successful email sent
  // Replace this with your actual API call and response handling
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay

  resetMessage.value =
    "Reset password link has been sent to your email. Please check your inbox.";
  resetEmail.value = ""; // Clear the email field after submission
};
</script>

<style scoped>
.help-login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url("../assets/images/CSU library cafe.jpg"); /* Set your background image */
  background-size: cover;
  background-position: center;
  overflow: auto;
  position: relative;
}

.help-login-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4); /* Darken the background slightly */
}

.help-login-card {
  background-color: transparent; /* Transparent background for the glass container */
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
  text-align: left;
  z-index: 1;
  backdrop-filter: blur(1px); /* Apply blur for the glass effect */
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white; /* Default text color to black */
  max-width: 600px;
  width: 90%;
  margin: 20px;
}

h2 {
  color: #007bff;
  text-align: center;
  margin-bottom: 20px;
}

.help-section {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white; /* White background for the rectangle boxes */
  color: black; /* Ensure text within sections is black */
}

h3 {
  color: #555;
  margin-top: 0;
  margin-bottom: 10px;
}

p {
  margin-bottom: 10px;
}

a {
  color: #007bff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.back-to-signin {
  margin-top: 20px;
  text-align: center;
}

.back-to-signin a {
  display: inline-block;
  padding: 10px 15px;
  background-color: #6c757d;
  color: white; /* Keep the button text white */
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.back-to-signin a:hover {
  background-color: #5a6268;
}

/* Forgot Password Popup Styles */
.forgot-password-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.9);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.3);
  z-index: 10;
  text-align: center;
  color: black; /* Ensure text in popup is black */
}

.forgot-password-popup h3 {
  color: #007bff;
  margin-bottom: 15px;
}

.forgot-password-popup p {
  margin-bottom: 20px;
}

.forgot-password-popup .form-group {
  margin-bottom: 20px;
  text-align: left;
}

.forgot-password-popup label {
  display: block;
  margin-bottom: 5px;
  color: #555;
}

.forgot-password-popup input[type="email"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  color: black;
}

.forgot-password-popup .popup-buttons button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  margin: 0 10px;
  color: white; /* Set button text color */
}

.forgot-password-popup .popup-buttons button:first-child {
  background-color: #007bff;
}

.forgot-password-popup .popup-buttons button:first-child:hover {
  background-color: #0056b3;
}

.forgot-password-popup .popup-buttons button:last-child {
  background-color: #6c757d;
}

.forgot-password-popup .popup-buttons button:last-child:hover {
  background-color: #5a6268;
}

.forgot-password-popup .reset-message {
  margin-top: 20px;
  color: green;
  font-weight: bold;
}
</style>
