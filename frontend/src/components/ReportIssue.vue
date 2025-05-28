<template>
  <div class="report-issue-container" :class="{ 'dark-mode': isDarkMode }">
    <aside class="side-navigation" :class="{ 'dark-mode': isDarkMode }">
      <NavigationBar />
    </aside>
    <main class="main-content" :class="{ 'dark-mode': isDarkMode }">
      <h2>Report an Issue or Contact Support</h2>

      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>

      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>

      <div class="report-form" :class="{ 'dark-mode': isDarkMode }">
        <h3>Report an Issue</h3>
        <div class="form-group">
          <label for="issueType">Issue Type</label>
          <select
            id="issueType"
            v-model="issueType"
            required
            :class="{ 'dark-mode': isDarkMode }"
          >
            <option value="">Select an issue type</option>
            <option value="computer">Computer Problem</option>
            <option value="printer">Printer Issue</option>
            <option value="internet">Internet Connectivity</option>
            <option value="software">Software Malfunction</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div class="form-group">
          <label for="subject">Subject</label>
          <input
            type="text"
            id="subject"
            v-model="subject"
            required
            :class="{ 'dark-mode': isDarkMode }"
          />
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            id="description"
            v-model="description"
            rows="5"
            required
            :class="{ 'dark-mode': isDarkMode }"
          ></textarea>
        </div>

        <div class="form-actions">
          <button @click.prevent="submitReport" class="submit-button">
            Submit Report
          </button>
          <span class="ticket-id">Ticket ID: 1A</span>
        </div>
      </div>

      <div class="contact-support" :class="{ 'dark-mode': isDarkMode }">
        <h3>Contact Support</h3>
        <p>
          If your issue is urgent or requires immediate assistance, please
          contact us through the following channels:
        </p>
        <ul>
          <li>
            <strong>Email:</strong>
            <a href="mailto:support@example.com">support@example.com</a>
          </li>
          <li><strong>Phone:</strong> +1 (123) 456-7890</li>
          <li><strong>In-Person:</strong> Visit the ICT Office (Room XXX)</li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import NavigationBar from "./NavigationBar.vue"; // Import the NavigationBar component
import { useDarkMode } from "../composables/useDarkMode"; // Import the composable

const { isDarkMode } = useDarkMode(); // Get the isDarkMode ref

const issueType = ref("");
const subject = ref("");
const description = ref("");
const errorMessage = ref("");
const successMessage = ref("");

const submitReport = async () => {
  errorMessage.value = "";
  successMessage.value = "";

  if (!issueType.value || !subject.value || !description.value) {
    errorMessage.value = "Please fill out all fields in the report form.";
    return;
  }

  try {
    const response = await axios.post("/api/support/report-issue", {
      issueType: issueType.value,
      subject: subject.value,
      description: description.value,
      // You might include user information here based on your authentication
    });

    if (response.data.success) {
      successMessage.value =
        "Your issue has been reported successfully. We will get back to you soon.";
      issueType.value = "";
      subject.value = "";
      description.value = "";
    } else {
      errorMessage.value =
        response.data.message ||
        "Failed to submit the report. Please try again.";
    }
  } catch (error) {
    console.error("Error submitting report:", error);
    errorMessage.value = "Failed to submit the report. Please try again.";
  }
};
</script>

<style scoped>
.report-issue-container {
  display: flex;
  min-height: 100vh;
  background-color: #f0f8ff; /* Light blue background */
  transition: background-color 0.3s ease, color 0.3s ease;
}

body.dark-mode .report-issue-container {
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
  color: #6dd5ed;
}

h2,
h3 {
  color: #333;
  text-align: center;
  margin-bottom: 1.5rem;
  transition: color 0.3s ease;
}

body.dark-mode h2,
body.dark-mode h3 {
  color: #6dd5ed;
}

.error-message {
  color: red;
  margin-bottom: 1rem;
  padding: 0.8rem;
  border: 1px solid #f44336;
  border-radius: 4px;
  background-color: #ffebee;
  transition: background-color 0.3s ease, border-color 0.3s ease,
    color 0.3s ease;
}

body.dark-mode .error-message {
  background-color: #42201f;
  border-color: #842029;
  color: #f8d7da;
}

.success-message {
  color: green;
  margin-bottom: 1rem;
  padding: 0.8rem;
  border: 1px solid #4caf50;
  border-radius: 4px;
  background-color: #e8f5e9;
  transition: background-color 0.3s ease, border-color 0.3s ease,
    color 0.3s ease;
}

body.dark-mode .success-message {
  background-color: #198754;
  border-color: #28a745;
  color: #d1e7dd;
}

.report-form,
.contact-support {
  margin-bottom: 2rem;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  width: 90%; /* Adjust width as needed */
  max-width: 600px; /* Limit maximum width */
  transition: background-color 0.3s ease, border-color 0.3s ease,
    color 0.3s ease;
}

body.dark-mode .report-form,
body.dark-mode .contact-support {
  background-color: #333;
  border-color: #555;
  color: #d4d4d4;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #555;
  transition: color 0.3s ease;
}

body.dark-mode label {
  color: #f0f0f0;
}

select,
input[type="text"],
textarea {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 1rem;
  transition: background-color 0.3s ease, border-color 0.3s ease,
    color 0.3s ease;
}

body.dark-mode select,
body.dark-mode input[type="text"],
body.dark-mode textarea {
  background-color: #444;
  border-color: #666;
  color: #d4d4d4;
}

textarea {
  resize: vertical;
}

.form-actions {
  display: flex;
  align-items: center;
  justify-content: space-between; /* Align items to the start and end */
  margin-top: 1rem;
}

.form-actions button.submit-button {
  padding: 1rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background-color 0.3s ease, color 0.3s ease;
  flex-grow: 0; /* Allow button to take up available space */
  margin-right: 0.5rem; /* Add some spacing between button and ticket ID */
}

body.dark-mode .form-actions button.submit-button {
  background-color: #3a86ff;
  color: #f8f8f2;
}

.form-actions button.submit-button:hover {
  background-color: #0056b3;
}

body.dark-mode .form-actions button.submit-button:hover {
  background-color: #2c69d9;
}

.form-actions span.ticket-id {
  font-size: 1rem;
  color: #777;
  text-align: right; /* Align ticket ID to the right */
  white-space: nowrap; /* Prevent text wrapping */
  transition: color 0.3s ease;
}

body.dark-mode .form-actions span.ticket-id {
  color: #bbb;
}

.contact-support ul {
  padding-left: 1.5rem;
  list-style-type: disc;
  transition: color 0.3s ease;
}

body.dark-mode .contact-support ul {
  color: #d4d4d4;
}

.contact-support li {
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
}

body.dark-mode .contact-support li {
  color: #d4d4d4;
}

.contact-support a {
  color: #007bff;
  text-decoration: none;
  transition: color 0.3s ease;
}

body.dark-mode .contact-support a {
  color: #6dd5ed;
}

.contact-support a:hover {
  text-decoration: underline;
}
</style>
