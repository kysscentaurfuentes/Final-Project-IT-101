<template>
  <div class="software-access-container">
    <aside class="side-navigation">
      <NavigationBar />
    </aside>
    <main class="main-content">
      <h2>Software Access</h2>

      <div class="software-list">
        <div
          v-for="(category, index) in softwareCategories"
          :key="index"
          class="software-category"
        >
          <h3>{{ category.name }}</h3>
          <ul>
            <li
              v-for="software in category.list"
              :key="software.id"
              class="software-item"
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

      <div class="software-request">
        <h3>Request Software</h3>
        <p>If you need software that is not listed, please submit a request.</p>
        <textarea
          v-model="softwareRequestText"
          placeholder="Enter the name of the software and why you need it."
          rows="4"
        ></textarea>
        <button @click="submitSoftwareRequest" :disabled="!softwareRequestText">
          Submit Request
        </button>
        <p v-if="requestStatus" class="request-status">{{ requestStatus }}</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import NavigationBar from "./NavigationBar.vue"; // Import the NavigationBar component

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
  background-color: #f8f8ff; /* Light ghostwhite background */
}

.side-navigation {
  background-color: #333;
  color: white;
  width: 200px; /* Adjust as needed */
  padding: 20px;
  z-index: 1;
}

.main-content {
  flex-grow: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h2 {
  color: #007bff;
  text-align: center;
  margin-bottom: 20px;
}

.software-list {
  margin-bottom: 20px;
  width: 90%;
  max-width: 700px;
}

.software-category {
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  text-align: left;
}

.software-category h3 {
  color: #333;
  margin-top: 0;
  margin-bottom: 10px;
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
}

.software-version {
  color: #777;
  font-size: 0.9rem;
}

.software-description {
  color: #666;
  font-size: 0.95rem;
  margin-top: 5px;
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
}

.software-request h3 {
  color: #333;
  margin-top: 0;
  margin-bottom: 10px;
}

.software-request p {
  margin-bottom: 10px;
  color: #555;
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
}

.software-request button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.software-request button:hover {
  background-color: #0056b3;
}

.software-request button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.request-status {
  margin-top: 10px;
  font-weight: bold;
  color: green;
}
</style>
