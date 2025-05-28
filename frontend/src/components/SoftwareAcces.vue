<template>
  <div class="software-access-container" :class="{ 'dark-mode': isDarkMode }">
    <aside class="side-navigation" :class="{ 'dark-mode': isDarkMode }">
      <NavigationBar />
    </aside>
    <main class="main-content" :class="{ 'dark-mode': isDarkMode }">
      <h2>Software Access</h2>

      <div class="software-list" :class="{ 'dark-mode': isDarkMode }">
        <div
          v-for="(category, index) in softwareCategories"
          :key="index"
          class="software-category"
          :class="{ 'dark-mode': isDarkMode }"
        >
          <h3>{{ category.name }}</h3>
          <ul>
            <li
              v-for="software in category.list"
              :key="software.id"
              class="software-item"
              :class="{ 'dark-mode': isDarkMode }"
            >
              <div class="software-info">
                <span class="software-name">{{ software.name }}</span>
                <span class="software-version" v-if="software.version"
                  >({{ software.version }})</span
                >
                <p class="software-description" v-if="software.description">
                  {{ software.description }}
                </p>
              </div>
              <div class="software-actions"></div>
            </li>
          </ul>
        </div>
      </div>

      <div class="software-request" :class="{ 'dark-mode': isDarkMode }">
        <h3>Request Software</h3>
        <p>If you need software that is not listed, please submit a request.</p>
        <textarea
          v-model="softwareRequestText"
          placeholder="Enter the name of the software and why you need it."
          rows="4"
          :class="{ 'dark-mode': isDarkMode }"
        ></textarea>
        <button @click="submitSoftwareRequest" :disabled="!softwareRequestText">
          Submit Request
        </button>
        <p
          v-if="requestStatus"
          class="request-status"
          :class="{ 'dark-mode': isDarkMode }"
        >
          {{ requestStatus }}
        </p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import NavigationBar from "./NavigationBar.vue"; // Import the NavigationBar component
import { useDarkMode } from "../composables/useDarkMode"; // Import the composable

const { isDarkMode } = useDarkMode(); // Get the isDarkMode ref

const router = useRouter();

// Sample data - Replace with actual data fetching from your backend
const softwareCategories = ref([
  {
    name: "Productivity",
    list: [
      {
        id: 1,
        name: "Microsoft Word",
        version: "2019",
        description: "Word processing software.",
      },
      {
        id: 2,
        name: "Microsoft Excel",
        version: "2019",
        description: "Spreadsheet software.",
      },
      {
        id: 3,
        name: "Microsoft PowerPoint",
        version: "2019",
        description: "Presentation software.",
      },
      {
        id: 4,
        name: "LibreOffice Writer",
        description: "Free and open-source word processor.",
      },
      {
        id: 5,
        name: "LibreOffice Calc",
        description: "Free and open-source spreadsheet program.",
      },
    ],
  },
  {
    name: "Design & Graphics",
    list: [
      {
        id: 6,
        name: "Adobe Photoshop",
        version: "2023",
        description: "Image editing software.",
      },
      {
        id: 7,
        name: "Inkscape",
        description: "Free and open-source vector graphics editor.",
      },
    ],
  },
  {
    name: "Programming & Development",
    list: [
      {
        id: 8,
        name: "Python",
        version: "3.9",
        description: "General-purpose programming language.",
      },
      {
        id: 9,
        name: "Visual Studio Code",
        description: "Popular code editor.",
      },
    ],
  },
]);

const softwareRequestText = ref("");
const requestStatus = ref("");

const submitSoftwareRequest = () => {
  if (softwareRequestText.value.trim() !== "") {
    // In a real application, you would send this request to your backend
    console.log("Software Request Submitted:", softwareRequestText.value);
    requestStatus.value = "Request submitted successfully!";
    softwareRequestText.value = ""; // Clear the textarea
    setTimeout(() => {
      requestStatus.value = ""; // Clear status after a few seconds
    }, 3000);
  } else {
    requestStatus.value = "Please enter the software you wish to request.";
  }
};
</script>

<style scoped>
.software-access-container {
  display: flex;
  min-height: 100vh;
  background-color: #fff; /* Force white background */
  transition: background-color 0.3s ease, color 0.3s ease;
}

body.dark-mode .software-access-container {
  background-color: #1e1e1e;
  color: #d4d4d4;
}

.side-navigation {
  background-color: #333;
  color: white;
  width: 200px; /* Adjust as needed */
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
  transition: background-color 0.3s ease, color 0.3s ease;
}

body.dark-mode .main-content {
  color: #d4d4d4;
}

h2 {
  color: #007bff;
  text-align: center;
  margin-bottom: 20px;
  transition: color 0.3s ease;
}

body.dark-mode h2 {
  color: #6dd5ed;
}

.software-list {
  margin-bottom: 20px;
  width: 90%;
  max-width: 700px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

body.dark-mode .software-list {
  color: #d4d4d4;
}

.software-category {
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  text-align: left;
  transition: background-color 0.3s ease, color 0.3s ease,
    border-color 0.3s ease;
}

body.dark-mode .software-category {
  background-color: #333;
  color: #d4d4d4;
  border-color: #555;
}

.software-category h3 {
  color: #333;
  margin-top: 0;
  margin-bottom: 10px;
  transition: color 0.3s ease;
}

body.dark-mode .software-category h3 {
  color: #f0f0f0;
}

.software-category ul {
  list-style: none;
  padding: 0;
}

.software-item {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: border-color 0.3s ease, color 0.3s ease;
}

body.dark-mode .software-item {
  border-bottom-color: #555;
  color: #d4d4d4;
}

.software-item:last-child {
  border-bottom: none;
}

.software-info {
  flex-grow: 1;
}

.software-name {
  font-weight: bold;
  color: #555;
  margin-right: 5px;
  transition: color 0.3s ease;
}

body.dark-mode .software-name {
  color: #f0f0f0;
}

.software-version {
  color: #777;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

body.dark-mode .software-version {
  color: #bbb;
}

.software-description {
  color: #666;
  font-size: 0.95rem;
  margin-top: 5px;
  transition: color 0.3s ease;
}

body.dark-mode .software-description {
  color: #ccc;
}

.software-actions {
  color: #000;
  /* Styles for future action buttons */
}

.software-request {
  margin-top: 30px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  width: 90%;
  max-width: 700px;
  text-align: left;
  transition: background-color 0.3s ease, color 0.3s ease,
    border-color 0.3s ease;
}

body.dark-mode .software-request {
  background-color: #333;
  color: #d4d4d4;
  border-color: #555;
}

.software-request h3 {
  color: #333;
  margin-top: 0;
  margin-bottom: 10px;
  transition: color 0.3s ease;
}

body.dark-mode .software-request h3 {
  color: #f0f0f0;
}

.software-request p {
  margin-bottom: 10px;
  color: #555;
  transition: color 0.3s ease;
}

body.dark-mode .software-request p {
  color: #d4d4d4;
}

.software-request textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-family: inherit;
  font-size: inherit;
  transition: background-color 0.3s ease, color 0.3s ease,
    border-color 0.3s ease;
}

body.dark-mode .software-request textarea {
  background-color: #444;
  color: #d4d4d4;
  border-color: #666;
}

.software-request button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease, color 0.3s ease;
}

body.dark-mode .software-request button {
  background-color: #3a86ff;
  color: #f8f8f2;
}

.software-request button:hover {
  background-color: #0056b3;
}

body.dark-mode .software-request button:hover {
  background-color: #2c69d9;
}

.software-request button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
  color: #666;
}

body.dark-mode .software-request button:disabled {
  background-color: #777;
  color: #bbb;
}

.request-status {
  margin-top: 10px;
  font-weight: bold;
  color: green;
  transition: color 0.3s ease;
}

body.dark-mode .request-status {
  color: #98c379;
}
</style>
