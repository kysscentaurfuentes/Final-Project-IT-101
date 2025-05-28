<template>
  <div class="feedback-container" :class="{ 'dark-mode': isDarkMode }">
    <aside class="side-navigation" :class="{ 'dark-mode': isDarkMode }">
      <NavigationBar />
    </aside>
    <main class="main-content" :class="{ 'dark-mode': isDarkMode }">
      <h2>Feedback</h2>
      <p :class="{ 'dark-mode': isDarkMode }">
        Your feedback is important to us! Please share your thoughts and
        suggestions to help us improve the ICT Library Office services.
      </p>

      <div class="feedback-form" :class="{ 'dark-mode': isDarkMode }">
        <div class="form-group" :class="{ 'dark-mode': isDarkMode }">
          <label for="feedbackType">Feedback Type:</label>
          <select
            v-model="feedbackType"
            id="feedbackType"
            :class="{ 'dark-mode': isDarkMode }"
          >
            <option value="general">General Feedback</option>
            <option value="website">App/Website Feedback</option>
            <option value="computer">Computer/Software</option>
            <option value="printing">Printing Services</option>
            <option value="staff">Staff Interaction</option>
            <option value="suggestion">Suggestion</option>
            <option value="bug_report">Bug Report</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div class="form-group" :class="{ 'dark-mode': isDarkMode }">
          <label for="comment">Comments:</label>
          <textarea
            v-model="comment"
            id="comment"
            rows="5"
            placeholder="Please provide your feedback here. Be as detailed as possible."
            :class="{ 'dark-mode': isDarkMode }"
          ></textarea>
        </div>

        <div
          class="form-group"
          v-if="feedbackType === 'bug_report'"
          :class="{ 'dark-mode': isDarkMode }"
        >
          <label for="stepsToReproduce"
            >Steps to Reproduce (if applicable):</label
          >
          <textarea
            v-model="stepsToReproduce"
            id="stepsToReproduce"
            rows="3"
            placeholder="Please describe the steps to reproduce the bug."
            :class="{ 'dark-mode': isDarkMode }"
          ></textarea>
        </div>

        <div
          class="form-group"
          v-if="feedbackType !== 'suggestion' && feedbackType !== 'bug_report'"
          :class="{ 'dark-mode': isDarkMode }"
        >
          <label for="rating">Overall Rating (Optional):</label>
          <div class="rating-stars">
            <span
              v-for="n in 5"
              :key="n"
              class="star"
              :class="{ rated: n <= rating, 'dark-mode-star': isDarkMode }"
              @click="setRating(n)"
              >★</span
            >
          </div>
          <span
            v-if="rating > 0"
            class="rating-value"
            :class="{ 'dark-mode': isDarkMode }"
            >({{ rating }} out of 5)</span
          >
        </div>

        <button @click="submitFeedback" :disabled="!comment">
          Submit Feedback
        </button>
        <p
          v-if="submissionStatus"
          class="submission-status"
          :class="{ 'dark-mode': isDarkMode }"
        >
          {{ submissionStatus }}
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

const feedbackType = ref("general");
const comment = ref("");
const stepsToReproduce = ref("");
const rating = ref(0);
const submissionStatus = ref("");

const setRating = (newRating) => {
  rating.value = newRating;
};

const submitFeedback = () => {
  if (comment.value.trim() !== "") {
    const feedbackData = {
      type: feedbackType.value,
      comment: comment.value,
      stepsToReproduce: stepsToReproduce.value,
      rating: rating.value,
      timestamp: new Date().toISOString(), // Recommendation: Include timestamp
      userId: "STUDENT_ID_PLACEHOLDER", // Recommendation: Include user identification (replace placeholder)
      appVersion: "1.0.0", // Recommendation: Include app version for context
      deviceInfo: navigator.userAgent, // Recommendation: Include device info for bug reports
    };

    // In a real application, you would send this data to your backend
    console.log("Feedback Submitted:", feedbackData);
    submissionStatus.value = "Thank you for your feedback!";
    comment.value = "";
    stepsToReproduce.value = "";
    rating.value = 0;
    setTimeout(() => {
      submissionStatus.value = "";
    }, 3000);
  } else {
    submissionStatus.value = "Please enter your feedback.";
  }
};
</script>

<style scoped>
.feedback-container {
  display: flex;
  min-height: 100vh;
  background-color: #fff; /* Force white background */
  transition: background-color 0.3s ease, color 0.3s ease;
}

body.dark-mode .feedback-container {
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

p {
  margin-bottom: 15px;
  color: #555;
  width: 90%;
  max-width: 600px;
  text-align: center;
  transition: color 0.3s ease;
}

body.dark-mode p {
  color: #d4d4d4;
}

.feedback-form {
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 600px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  transition: background-color 0.3s ease, color 0.3s ease,
    border-color 0.3s ease;
}

body.dark-mode .feedback-form {
  background-color: #333;
  color: #d4d4d4;
  border-color: #555;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #333;
  font-weight: bold;
  transition: color 0.3s ease;
}

body.dark-mode label {
  color: #f0f0f0;
}

select,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-family: inherit;
  font-size: inherit;
  transition: background-color 0.3s ease, color 0.3s ease,
    border-color 0.3s ease;
}

body.dark-mode select,
body.dark-mode textarea {
  background-color: #444;
  color: #d4d4d4;
  border-color: #666;
}

textarea {
  resize: vertical;
}

.rating-stars {
  display: inline-block;
  font-size: 1.5rem;
  color: #ccc;
  cursor: pointer;
}

.star {
  display: inline-block;
  margin-right: 5px;
  transition: color 0.3s ease;
}

.star.rated {
  color: gold;
}

body.dark-mode .star {
  color: #888;
}

body.dark-mode .star.rated {
  color: #ffc107;
}

.rating-value {
  font-size: 0.9rem;
  color: #777;
  margin-left: 10px;
  transition: color 0.3s ease;
}

body.dark-mode .rating-value {
  color: #bbb;
}

button {
  padding: 10px 15px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease, color 0.3s ease;
}

body.dark-mode button {
  background-color: #1e7e34;
  color: #f8f8f2;
}

button:hover {
  background-color: #1e7e34;
}

body.dark-mode button:hover {
  background-color: #155724;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
  color: #666;
}

body.dark-mode button:disabled {
  background-color: #777;
  color: #bbb;
}

.submission-status {
  margin-top: 10px;
  font-weight: bold;
  color: green;
  text-align: center;
  transition: color 0.3s ease;
}

body.dark-mode .submission-status {
  color: #98c379;
}
</style>
