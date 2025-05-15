<template>
  <div class="logout-container">
    <h2>Log Out</h2>
    <p>Are you sure you want to log out?</p>
    <div class="logout-buttons">
      <button @click="logout" class="confirm-logout-button">
        Yes, Log Out
      </button>
      <router-link to="/main-menu" class="cancel-logout-button"
        >Cancel</router-link
      >
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const logout = () => {
  // In a real application, you would typically:
  // 1. Clear the user's session token (e.g., remove from localStorage, cookies).
  localStorage.removeItem("userToken");
  localStorage.removeItem("userRole"); // Clear user role as well
  // 2. Redirect the user to the login page.
  router.push("/"); // Assuming '/' is your sign-in route
};
</script>

<style scoped>
.logout-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px; /* Adjust as needed */
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  color: #333;
  margin-bottom: 20px;
}

p {
  color: #555;
  margin-bottom: 20px;
}

.logout-buttons {
  display: flex;
  gap: 15px;
}

.confirm-logout-button {
  background-color: #dc3545; /* Red color for confirm */
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.confirm-logout-button:hover {
  background-color: #c82333;
}

.cancel-logout-button {
  background-color: #007bff; /* Blue color for cancel */
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.cancel-logout-button:hover {
  background-color: #0056b3;
}
</style>
