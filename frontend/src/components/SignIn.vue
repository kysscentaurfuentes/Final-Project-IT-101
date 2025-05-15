<template>
  <div class="signin-container">
    <div class="signin-form glass">
      <h2>ICT Library Office Sign In</h2>
      <div v-if="errorMessage" class="error-message">
        <i class="fas fa-exclamation-circle"></i>
        {{ errorMessage }}
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
        <label for="role">Sign In As</label>
        <select id="role" v-model="selectedRole" required>
          <option value="student">Student</option>
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div class="form-group remember-me">
        <input type="checkbox" id="remember" v-model="rememberMe" />
        <label for="remember">Remember Me</label>
      </div>
      <button type="submit" class="signin-button" @click.prevent="signIn">
        Sign In
      </button>
      <div class="form-links">
        <router-link to="/signup">Don't have an account? Sign Up</router-link>
        <span> | </span>
        <router-link to="/help-login">Can't log in?</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, RouterLink } from "vue-router";
import axios from "axios";

// Import the background image using relative path
import backgroundImage from "../assets/images/CSU Library entrance.jpg";

const username = ref("");
const password = ref("");
const errorMessage = ref("");
const selectedRole = ref("student"); // Default role
const rememberMe = ref(false);
const router = useRouter();

const signIn = async () => {
  errorMessage.value = "";

  if (!username.value || !password.value) {
    errorMessage.value = "Username and password are required.";
    return;
  }

  // **DEVELOPMENT BYPASS - REMOVE THIS IN PRODUCTION**
  if (rememberMe.value) {
    localStorage.setItem("rememberUsername", username.value);
  } else {
    localStorage.removeItem("rememberUsername");
  }
  localStorage.setItem("userToken", "dummy_token"); // Simulate a token
  localStorage.setItem("userRole", selectedRole.value);

  switch (selectedRole.value) {
    case "student":
      router.push("/main-menu");
      break;
    case "employee":
      router.push("/main-menu");
      break;
    case "admin":
      router.push("/admin"); //   For simplicity, skip admin verification in dev
      break;
  }
  return; // Exit the function early
  // **END OF DEVELOPMENT BYPASS**

  try {
    const response = await axios.post("/api/auth/login", {
      username: username.value,
      password: password.value,
      role: selectedRole.value,
      remember: rememberMe.value,
    });

    if (response.data.success) {
      // Store token or user info (e.g., in localStorage or Vuex)
      localStorage.setItem("userToken", response.data.token);
      localStorage.setItem("userRole", selectedRole.value);
      if (rememberMe.value) {
        localStorage.setItem("rememberUsername", username.value);
      } else {
        localStorage.removeItem("rememberUsername");
      }

      // Redirect based on role
      switch (selectedRole.value) {
        case "student":
          router.push("/student/dashboard");
          break;
        case "employee":
          router.push("/employee/dashboard");
          break;
        case "admin":
          //   For admin, you might want to check for super admin verification
          if (response.data.isSuperAdminVerified) {
            router.push("/admin/dashboard");
          } else {
            errorMessage.value =
              "Admin account not yet verified by super admin.";
          }
          break;
      }
    } else {
      errorMessage.value = response.data.message || "Login failed.";
    }
  } catch (error) {
    console.error("Login error:", error);
    errorMessage.value = "Login failed. Please try again.";
  }
};
</script>

<style scoped>
.signin-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url("../assets/images/CSU Library entrance.jpg"); /* Set background image */
  background-size: cover;
  background-position: center;
  overflow: hidden;
  position: relative;
}

/* Add an overlay for the darkening effect */
.signin-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4); /* Adjust opacity for darkness */
}

.signin-form {
  background-color: rgba(
    255,
    255,
    255,
    0.15
  ); /* Even more transparent background */
  padding: 3rem;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 350px; /* Reduced max-width */
  text-align: center;
  z-index: 1; /* Ensure form is above the overlay */
  animation: fadeIn 0.5s ease-out;
  backdrop-filter: blur(1px); /* Increased blur for better transparency */
  border: 1px solid rgba(255, 255, 255, 0.1); /* Even more subtle border */
  color: white; /* Default text color to white */
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
  color: white; /* White heading */
  margin-bottom: 1.5rem;
}

.error-message {
  background-color: rgba(
    248,
    215,
    218,
    0.5
  ); /* Semi-transparent error background */
  color: #f8d7da; /* Light error text */
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
  display: flex; /* Use flexbox for alignment */
  flex-direction: column; /* Stack label and input vertically */
}

.form-group label {
  display: block;
  font-size: 0.9rem;
  color: white; /* White label text */
  margin-bottom: 0.5rem;
}

.form-group input[type="text"],
.form-group input[type="password"],
.form-group select {
  width: 100%; /* Ensure they take full width */
  padding: 0.8rem;
  border: none;
  border-radius: 0.5rem;
  background-color: rgba(220, 220, 220, 0.2);
  box-shadow: inset 0 0.1rem 0.3rem rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
  font-size: 1rem;
  color: white; /* White input text */
}

input[type="text"]::placeholder,
input[type="password"]::placeholder {
  color: rgba(
    255,
    255,
    255,
    0.7
  ); /* Slightly more opaque white for placeholder */
  font-style: italic; /* Optional: Add italics to further differentiate */
}

input[type="text"]:focus,
input[type="password"]:focus,
select:focus {
  outline: none;
  box-shadow: 0 0 0.5rem #64b5f6;
}

select option {
  color: black; /* Force black font for dropdown options */
}

.signin-button {
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 0.5rem;
  background: linear-gradient(to right, #64b5f6, #42a5f5);
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.2);
  margin-top: 1.5rem;
}

.signin-button:hover {
  transform: scale(1.02);
  box-shadow: 0 0 0.5rem #64b5f6;
}

.form-links {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.9rem;
  color: white; /* White links text */
}

.form-links a {
  color: #64b5f6;
  text-decoration: none;
  transition: color 0.3s ease;
}

.form-links a:hover {
  color: #1e88e5;
  text-decoration: underline;
}

.remember-me {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  text-align: left;
  font-size: 0.9rem;
  color: white; /* White remember me text */
}

.remember-me input[type="checkbox"] {
  width: auto;
  margin-right: 0.5rem;
}
</style>
