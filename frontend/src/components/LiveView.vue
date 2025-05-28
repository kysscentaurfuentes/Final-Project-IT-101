<template>
  <div class="live-view-container" :class="{ 'dark-mode': isDarkMode }">
    <aside class="side-navigation" :class="{ 'dark-mode': isDarkMode }">
      <NavigationBar />
    </aside>
    <main class="main-content" :class="{ 'dark-mode': isDarkMode }">
      <h2>Live View of ICT Office</h2>

      <div class="live-feed-placeholder" :class="{ 'dark-mode': isDarkMode }">
        <p>Live CCTV Feed will be displayed here.</p>
        <p><em>(Interface for live video or regularly updated images)</em></p>
        <div class="timestamp" :class="{ 'dark-mode': isDarkMode }">
          <p>Current Time: {{ currentTime }}</p>
          <p>Current Date: {{ currentDate }}</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import NavigationBar from "./NavigationBar.vue"; // Import the NavigationBar component
import { useDarkMode } from "../composables/useDarkMode"; // Import the composable

const { isDarkMode } = useDarkMode(); // Get the isDarkMode ref

const router = useRouter();
const currentTime = ref("");
const currentDate = ref("");
let intervalId = null;

const updateDateTime = () => {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString();
  currentDate.value = now.toLocaleDateString();
};

onMounted(() => {
  updateDateTime();
  intervalId = setInterval(updateDateTime, 1000); // Update every second
});

onUnmounted(() => {
  clearInterval(intervalId); // Clear the interval when the component is unmounted
});
</script>

<style scoped>
.live-view-container {
  display: flex;
  min-height: 100vh;
  background-color: #fff; /* Force white background */
  transition: background-color 0.3s ease, color 0.3s ease;
}

body.dark-mode .live-view-container {
  background-color: #1e1e1e;
  color: #d4d4d4;
}

.side-navigation {
  background-color: #333;
  color: white;
  width: 200px; /* Adjust as needed, same as other pages */
  padding: 20px;
  z-index: 1;
  transition: background-color 0.3s ease, color 0.3s ease;
}

body.dark-mode .side-navigation {
  background-color: #252525;
  color: #d4d4d4;
}

.main-content {
  flex-grow: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Align content from the top */
  transition: background-color 0.3s ease, color 0.3s ease;
}

body.dark-mode .main-content {
  color: #d4d4d4;
}

h2 {
  color: #007bff;
  margin-bottom: 20px;
  transition: color 0.3s ease;
}

body.dark-mode h2 {
  color: #6dd5ed;
}

.live-feed-placeholder {
  background-color: #fff; /* Force white background */
  border-radius: 8px;
  padding: 40px;
  margin-bottom: 20px;
  text-align: center;
  transition: background-color 0.3s ease, color 0.3s ease,
    border-color 0.3s ease;
  border: 1px solid #ccc; /* Add a light border for better visibility in light mode */
}

body.dark-mode .live-feed-placeholder {
  background-color: #333;
  color: #d4d4d4;
  border-color: #555;
}

.timestamp {
  margin-top: 20px;
  font-size: 0.9rem;
  color: #555;
  text-align: center;
  transition: color 0.3s ease;
}

body.dark-mode .timestamp {
  color: #bbb;
}
</style>
