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
          [Insert your full Privacy Policy text here. This should detail how
          user data is collected, used, stored, and protected.] For example: We
          collect your username, email, and other registration details to manage
          your account and provide our services. Your data is stored securely
          and is not shared with third parties without your consent, except as
          required by law. We use cookies to enhance your browsing experience.
          You have the right to access, modify, or delete your personal
          information.
        </p>

        <h3>Terms of Service</h3>
        <p>
          [Insert your full Terms of Service text here. This should outline the
          rules and regulations for using your application.] For example: By
          registering and using our application, you agree to these terms. You
          are responsible for maintaining the security of your account. You must
          not use the application for any illegal or unauthorized purposes. We
          reserve the right to modify these terms at any time, and continued use
          of the application after such changes constitutes acceptance of the
          new terms.
        </p>

        <button @click="acceptTerms" :disabled="!isCheckboxChecked">
          I have read and agree to the Privacy Policy & Terms of Service
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const isCheckboxChecked = ref(false);
const router = useRouter();

const acceptTerms = () => {
  // In a real application, you would likely emit an event
  // to the parent component (e.g., SignUp.vue) to indicate
  // that the user has accepted the terms.
  // For this standalone component, we can simulate acceptance
  // and potentially navigate back or to the sign-up form.
  console.log("Privacy Policy & Terms accepted");
  router.go(-1); // Go back to the previous page (likely SignUp)
};
</script>

<style scoped>
.privacy-terms-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url("../assets/images/CSU background.jpg"); /* Set your background image */
  background-size: cover;
  background-position: center;
  overflow: auto;
  position: relative;
}

.privacy-terms-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Darken the background */
}

.content-wrapper {
  background-color: rgba(
    255,
    255,
    255,
    0.15
  ); /* Transparent white for glass effect */
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
  text-align: center;
  z-index: 1; /* Ensure content is above the overlay */
  backdrop-filter: blur(10px); /* Apply blur for glass effect */
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #333; /* Default text color */
  max-width: 800px;
  width: 90%; /* Adjust width as needed */
  margin: 20px; /* Add some margin around the glass container */
}

h2 {
  color: #007bff;
  text-align: center;
  margin-bottom: 20px;
}

.content {
  padding: 15px;
  text-align: left; /* Align text within the content to the left for better readability */
}

h3 {
  color: #555;
  margin-top: 15px;
  margin-bottom: 10px;
}

p {
  margin-bottom: 10px;
}

button {
  display: block;
  width: 100%;
  padding: 10px 15px;
  background-color: #28a745; /* Green for acceptance */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 20px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #218838;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
