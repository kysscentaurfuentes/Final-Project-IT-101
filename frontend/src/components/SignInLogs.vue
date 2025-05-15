<template>
  <div class="admin-logs-container">
    <h2>Student Sign-In Logs</h2>
    <div v-if="loading" class="loading-indicator">Loading logs...</div>
    <ul v-else-if="logs.length > 0" class="logs-list">
      <li v-for="log in logs" :key="log.id" class="log-item">
        <span class="student-id">Student ID: {{ log.student_id }}</span>
        <span class="signin-time"
          >Signed In At: {{ new Date(log.signin_time).toLocaleString() }}</span
        >
      </li>
    </ul>
    <p v-else-if="!loading">No sign-in logs yet.</p>
    <p v-if="error" class="error-message">
      <i class="fas fa-exclamation-circle"></i>
      {{ error }}
    </p>
    <button @click="fetchSignInLogs" class="refresh-button">
      <i class="fas fa-sync-alt"></i> Refresh Logs
    </button>
  </div>
</template>

<script setup>
// SignInLogs.vue
import axios from "axios";
import { ref, onMounted } from "vue";

const logs = ref([]);
const error = ref("");
const loading = ref(false);
const apiUrl = ref("http://localhost:3000/api/students"); // Adjust to your backend URL

const fetchSignInLogs = async () => {
  loading.value = true;
  error.value = "";
  try {
    const response = await axios.get(`${apiUrl.value}/logs`);
    logs.value = response.data;
    loading.value = false;
  } catch (err) {
    console.error(
      "Error fetching logs:",
      err.response ? err.response.data : err.message
    );
    error.value = "Failed to fetch sign-in logs.";
    loading.value = false;
  }
};

onMounted(() => {
  fetchSignInLogs();
});
</script>

<style scoped>
.admin-logs-container {
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.loading-indicator {
  text-align: center;
  color: #777;
  margin-top: 20px;
}

.logs-list {
  list-style: none;
  padding: 0;
}

.log-item {
  background-color: #fff;
  padding: 10px 15px;
  margin-bottom: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.student-id {
  font-weight: bold;
  color: #555;
}

.signin-time {
  color: #777;
  font-size: 0.9em;
}

.error-message {
  color: #d32f2f;
  background-color: #fdecea;
  padding: 10px;
  border-radius: 4px;
  margin-top: 20px;
  text-align: center;
}

.refresh-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s ease;
}

.refresh-button:hover {
  background-color: #45a049;
}

.refresh-button i {
  margin-right: 5px;
}
</style>
