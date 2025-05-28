<template>
  <div
    class="logout-container centered-box"
    :class="{ 'dark-mode': isDarkMode }"
  >
    <h2 :class="{ 'dark-mode-h2': isDarkMode }">Log Out</h2>
    <p :class="{ 'dark-mode-p': isDarkMode }">
      Are you sure you want to log out?
    </p>
    <div class="logout-buttons">
      <button
        @click="logout"
        class="confirm-logout-button"
        :class="{ 'dark-mode-button-red': isDarkMode }"
      >
        Yes, Log Out
      </button>
      <button
        @click="cancelLogout"
        class="cancel-logout-button"
        :class="{ 'dark-mode-button-blue': isDarkMode }"
      >
        Cancel
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useDarkMode } from "../composables/useDarkMode";
import { onMounted, ref } from "vue";

const { isDarkMode } = useDarkMode();
const router = useRouter();
const previousRoute = ref(null);

onMounted(() => {
  // Store the previous route when the component is mounted
  previousRoute.value = router.options.history.state.back;
});

const logout = () => {
  localStorage.removeItem("userToken");
  localStorage.removeItem("userRole");
  router.push("/"); // Redirect to login after logout
};

const cancelLogout = () => {
  // Go back to the previous route if available, otherwise go to a default route
  if (previousRoute.value) {
    router.go(-1); // Go back one step in history
  } else {
    router.push("/main-menu"); // Default fallback if no history
  }
};
</script>

<style scoped>
.logout-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 400px;
  padding: 30px;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  text-align: center;
  transition: background-color 0.3s ease, color 0.3s ease,
    border-color 0.3s ease, box-shadow 0.3s ease;
}

body.dark-mode .logout-container {
  background-color: #333;
  color: #f0f0f0;
  border: 1px solid #555;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}

h2 {
  color: #333;
  margin-bottom: 25px;
  font-size: 1.8rem;
}

body.dark-mode h2 {
  color: #eee;
}

p {
  color: #555;
  margin-bottom: 30px;
  font-size: 1.1rem;
}

body.dark-mode p {
  color: #bbb;
}

.logout-buttons {
  display: flex;
  gap: 20px;
}

.confirm-logout-button,
.cancel-logout-button {
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.confirm-logout-button {
  background-color: #dc3545;
  color: white;
}

.confirm-logout-button:hover {
  background-color: #c82333;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.cancel-logout-button {
  background-color: #007bff;
  color: white;
  text-decoration: none;
}

.cancel-logout-button:hover {
  background-color: #0056b3;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

/* Dark Mode Specific Button Styles */
body.dark-mode .confirm-logout-button {
  background-color: #e74c3c;
  color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
}

body.dark-mode .confirm-logout-button:hover {
  background-color: #c0392b;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.6);
}

body.dark-mode .cancel-logout-button {
  background-color: #3498db;
  color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
}

body.dark-mode .cancel-logout-button:hover {
  background-color: #2980b9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.6);
}

.centered-box {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

body {
  overflow: hidden;
}
</style>
