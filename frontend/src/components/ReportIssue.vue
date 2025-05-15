<template>
  <div class="report-issue-container">
    <aside class="side-navigation">
      <NavigationBar />
    </aside>
    <main class="main-content">
      <h2>Report an Issue or Contact Support</h2>

      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>

      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>

      <div class="report-form">
        <h3>Report an Issue</h3>
        <div class="form-group">
          <label for="issueType">Issue Type</label>
          <select id="issueType" v-model="issueType" required>
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
          <input type="text" id="subject" v-model="subject" required />
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            id="description"
            v-model="description"
            rows="5"
            required
          ></textarea>
        </div>

        <button @click.prevent="submitReport">Submit Report</button>
      </div>

      <div class="contact-support">
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

h2,
h3 {
  color: #333;
  text-align: center;
  margin-bottom: 1.5rem;
}

.error-message {
  color: red;
  margin-bottom: 1rem;
  padding: 0.8rem;
  border: 1px solid #f44336;
  border-radius: 4px;
  background-color: #ffebee;
}

.success-message {
  color: green;
  margin-bottom: 1rem;
  padding: 0.8rem;
  border: 1px solid #4caf50;
  border-radius: 4px;
  background-color: #e8f5e9;
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
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #555;
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
}

textarea {
  resize: vertical;
}

button {
  padding: 1rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

.contact-support ul {
  padding-left: 1.5rem;
  list-style-type: disc;
}

.contact-support li {
  margin-bottom: 0.5rem;
}

.contact-support a {
  color: #007bff;
  text-decoration: none;
}

.contact-support a:hover {
  text-decoration: underline;
}
</style>
