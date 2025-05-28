<template>
  <div class="printing-services-container" :class="{ 'dark-mode': isDarkMode }">
    <aside class="side-navigation" :class="{ 'dark-mode': isDarkMode }">
      <NavigationBar />
    </aside>
    <main class="main-content" :class="{ 'dark-mode': isDarkMode }">
      <h2>Printing Services</h2>

      <div class="printing-info" :class="{ 'dark-mode': isDarkMode }">
        <p>
          Welcome to the ICT Library Office Printing Services. Please follow the
          instructions below to print your documents.
        </p>

        <div class="printer-status" :class="{ 'dark-mode': isDarkMode }">
          <h3>Printer Status</h3>
          <div
            v-for="printer in printerStatuses"
            :key="printer.id"
            class="printer-item"
            :class="{ 'dark-mode': isDarkMode }"
          >
            <span class="printer-name">{{ printer.name }}</span>
            <span
              class="status"
              :class="{ online: printer.isOnline, offline: !printer.isOnline }"
            >
              {{ printer.isOnline ? "Online" : "Offline" }}
            </span>
            <span class="availability">{{
              printer.isAvailable ? "(Available)" : "(Busy)"
            }}</span>
          </div>
          <p v-if="!printerStatuses.length">No printers currently listed.</p>
        </div>

        <div class="printing-instructions" :class="{ 'dark-mode': isDarkMode }">
          <h3>How to Print</h3>
          <ol>
            <li>Ensure your document is ready for printing.</li>
            <li>Go to any available computer in the ICT Library Office.</li>
            <li>
              Select the printer: <strong>{{ defaultPrinterName }}</strong
              >.
            </li>
            <li>
              Configure your print settings (e.g., number of copies, paper size,
              color).
            </li>
            <li>Click "Print".</li>
            <li>
              A staff member will assist you with releasing your print job and
              payment (if applicable).
            </li>
          </ol>
        </div>

        <div
          class="payment-information"
          v-if="printingCostPerPage > 0"
          :class="{ 'dark-mode': isDarkMode }"
        >
          <h3>Printing Costs</h3>
          <p>Black and White: ₱{{ printingCostPerPage.toFixed(2) }} per page</p>
          <p v-if="printingCostPerPageColor > 0">
            Color: ₱{{ printingCostPerPageColor.toFixed(2) }} per page
          </p>
          <p>Payment can be made to the ICT Office staff after printing.</p>
        </div>

        <div class="troubleshooting" :class="{ 'dark-mode': isDarkMode }">
          <h3>Troubleshooting</h3>
          <ul>
            <li>
              <strong>Document not printing?</strong> Ensure the printer status
              is "Online" and "Available". Check your computer's printer queue.
            </li>
            <li>
              <strong>Print quality issues?</strong> Inform the ICT Office
              staff.
            </li>
            <li>
              <strong>Paper jam?</strong> Do not attempt to remove it yourself.
              Please ask for assistance.
            </li>
          </ul>
        </div>

        <div class="contact-support" :class="{ 'dark-mode': isDarkMode }">
          <h3>Need Help?</h3>
          <p>
            If you encounter any issues, please don't hesitate to ask the ICT
            Office staff for assistance.
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import NavigationBar from "./NavigationBar.vue"; // Import the NavigationBar component
import { useDarkMode } from "../composables/useDarkMode"; // Import the composable

const { isDarkMode } = useDarkMode(); // Get the isDarkMode ref

const router = useRouter();

// Dummy data for printer statuses - Replace with actual data fetching
const printerStatuses = ref([
  { id: 1, name: "ICT-BW-Printer01", isOnline: true, isAvailable: true },
  { id: 2, name: "ICT-Color-Printer02", isOnline: true, isAvailable: false },
  { id: 3, name: "ICT-BW-Printer02", isOnline: false, isAvailable: false },
]);

// Configuration - Ideally fetched from a backend or config file
const defaultPrinterName = ref("ICT-BW-Printer01");
const printingCostPerPage = ref(1.0); // Cost per black and white page
const printingCostPerPageColor = ref(5.0); // Cost per color page

// Simulate fetching printer status (replace with actual API call)
onMounted(() => {
  // In a real application, you would fetch the printer status from a backend API
  // Example using setTimeout to simulate an async call:
  setTimeout(() => {
    printerStatuses.value = [
      { id: 1, name: "ICT-BW-Printer01", isOnline: true, isAvailable: true },
      { id: 2, name: "ICT-Color-Printer02", isOnline: true, isAvailable: true },
      { id: 3, name: "ICT-BW-Printer02", isOnline: true, isAvailable: false },
    ];
  }, 1500);
});
</script>

<style scoped>
.printing-services-container {
  display: flex;
  min-height: 100vh;
  background-color: #fff; /* Force white background */
  transition: background-color 0.3s ease, color 0.3s ease;
}

body.dark-mode .printing-services-container {
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

.printing-info {
  margin-bottom: 20px;
  width: 90%;
  max-width: 700px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

body.dark-mode .printing-info {
  color: #d4d4d4;
}

.printer-status {
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  text-align: left;
  transition: background-color 0.3s ease, color 0.3s ease,
    border-color 0.3s ease;
}

body.dark-mode .printer-status {
  background-color: #333;
  color: #d4d4d4;
  border-color: #555;
}

.printer-status h3 {
  color: #333;
  margin-top: 0;
  margin-bottom: 10px;
  transition: color 0.3s ease;
}

body.dark-mode .printer-status h3 {
  color: #f0f0f0;
}

.printer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
  transition: border-color 0.3s ease, color 0.3s ease;
}

body.dark-mode .printer-item {
  border-bottom-color: #555;
  color: #d4d4d4;
}

.printer-item:last-child {
  border-bottom: none;
}

.printer-name {
  font-weight: bold;
  color: #555;
  transition: color 0.3s ease;
}

body.dark-mode .printer-name {
  color: #f0f0f0;
}

.status {
  font-weight: bold;
}

.status.online {
  color: green;
}

body.dark-mode .status.online {
  color: #98c379;
}

.status.offline {
  color: red;
}

body.dark-mode .status.offline {
  color: #e06c75;
}

.availability {
  color: #777;
  font-style: italic;
  transition: color 0.3s ease;
}

body.dark-mode .availability {
  color: #bbb;
}

.printing-instructions h3,
.payment-information h3,
.troubleshooting h3,
.contact-support h3 {
  color: #333;
  margin-top: 15px;
  margin-bottom: 10px;
  text-align: left;
  transition: color 0.3s ease;
}

body.dark-mode .printing-instructions h3,
body.dark-mode .payment-information h3,
body.dark-mode .troubleshooting h3,
body.dark-mode .contact-support h3 {
  color: #f0f0f0;
}

.printing-instructions ol {
  margin-left: 20px;
  color: #333;
  transition: color 0.3s ease;
}

body.dark-mode .printing-instructions ol {
  color: #d4d4d4;
}

.payment-information {
  transition: background-color 0.3s ease, color 0.3s ease,
    border-color 0.3s ease;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 15px;
  text-align: left;
}

body.dark-mode .payment-information {
  background-color: #333;
  color: #d4d4d4;
  border-color: #555;
}

.payment-information p {
  margin-bottom: 5px;
  color: #555;
  transition: color 0.3s ease;
}

body.dark-mode .payment-information p {
  color: #d4d4d4;
}

.troubleshooting ul {
  list-style: disc;
  margin-left: 20px;
  color: #333;
  transition: color 0.3s ease;
}

body.dark-mode .troubleshooting ul {
  color: #d4d4d4;
}

.contact-support {
  transition: background-color 0.3s ease, color 0.3s ease,
    border-color 0.3s ease;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 15px;
  text-align: left;
}

body.dark-mode .contact-support {
  background-color: #333;
  color: #d4d4d4;
  border-color: #555;
}

.contact-support p {
  color: #555;
  transition: color 0.3s ease;
}

body.dark-mode .contact-support p {
  color: #d4d4d4;
}
</style>
