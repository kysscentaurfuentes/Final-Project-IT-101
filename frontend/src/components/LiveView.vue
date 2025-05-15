<template>
  <div class="live-view-container">
    <aside class="side-navigation">
      <NavigationBar />
    </aside>
    <main class="main-content">
      <h2>Live View of ICT Office</h2>

      <div class="live-feed-placeholder">
        <p>Live CCTV Feed will be displayed here.</p>
        <p><em>(Interface for live video or regularly updated images)</em></p>
        <div class="timestamp">
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
  background-color: #f0f2f5; /* Example background */
}

.side-navigation {
  background-color: #333;
  color: white;
  width: 200px; /* Adjust as needed, same as other pages */
  padding: 20px;
  z-index: 1;
}

.main-content {
  flex-grow: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Align content from the top */
}

h2 {
  color: #007bff;
  margin-bottom: 20px;
}

.live-feed-placeholder {
  background-color: #e0e0e0;
  border-radius: 8px;
  padding: 40px;
  margin-bottom: 20px;
}

.timestamp {
  margin-top: 20px;
  font-size: 0.9rem;
  color: #555;
}
</style>
