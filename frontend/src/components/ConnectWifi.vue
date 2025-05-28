<template>
  <div class="connect-wifi-container" :class="{ 'dark-mode': isDarkMode }">
    <aside class="side-navigation" :class="{ 'dark-mode': isDarkMode }">
      <NavigationBar />
    </aside>
    <main class="main-content" :class="{ 'dark-mode': isDarkMode }">
      <h2>Connect to Private Library ICT Cafe WiFi</h2>

      <div class="wifi-instructions" :class="{ 'dark-mode': isDarkMode }">
        <h3>Instructions:</h3>
        <ol>
          <li>Go to your device's WiFi settings.</li>
          <li>
            Click on 'Details' or a similar option, then select '+ Add network'
            or 'Add a network'.
          </li>
          <li>
            Type the network name: <strong>{{ wifiNetworkName }}</strong>
          </li>
          <li>Set the security type to: <strong>WPA/WPA2-Personal</strong></li>
          <li>
            Please contact
            <a href="mailto:support@example.com">support@example.com</a> to
            obtain the WiFi password.
          </li>
          <li v-if="authenticationSteps">
            Follow these additional authentication steps:
            <pre :class="{ 'dark-mode': isDarkMode }">{{
              authenticationSteps
            }}</pre>
          </li>
          <li>Once connected, you should be able to access the internet.</li>
        </ol>
        <p class="hidden-network-note">
          This WiFi network is hidden and requires manual configuration by
          adding a new network.
        </p>
      </div>

      <div class="troubleshooting" :class="{ 'dark-mode': isDarkMode }">
        <h3>Troubleshooting:</h3>
        <ul>
          <li>Make sure WiFi is enabled on your device.</li>
          <li>Double-check the network name.</li>
          <li>
            Contact support if you need assistance with the password or
            connection.
          </li>
          <li>
            If you're still having trouble, please contact the ICT Office
            support.
          </li>
        </ul>
      </div>

      <div class="wifi-status" :class="{ 'dark-mode': isDarkMode }">
        <h3>WiFi Status:</h3>
        <p>
          <em :class="{ 'dark-mode-em': isDarkMode }"
            >(This section would ideally show your device's current WiFi
            connection status, but this is usually managed by the OS.)</em
          >
        </p>
        <p>
          Please check your device's WiFi settings to see if you are connected
          to the library network.
        </p>
      </div>

      <div
        class="wifi-policy"
        v-if="wifiPolicy"
        :class="{ 'dark-mode': isDarkMode }"
      >
        <h3>Library WiFi Policy:</h3>
        <pre :class="{ 'dark-mode': isDarkMode }">{{ wifiPolicy }}</pre>
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

// Replace these with the actual library WiFi details
const wifiNetworkName = ref("CSU ICT Library WiFi");
const wifiPassword = ref(""); // Password is no longer directly displayed
const authenticationSteps = ref(""); // Add any specific authentication steps
const wifiPolicy = ref(""); // Add the library's WiFi usage policy

// In a real application, you might fetch these details from a configuration file or API
</script>

<style scoped>
.connect-wifi-container {
  display: flex;
  min-height: 100vh;
  background-color: #f0f2f5; /* Example background */
  transition: background-color 0.3s ease, color 0.3s ease;
}

body.dark-mode .connect-wifi-container {
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
  justify-content: flex-start;
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

h3 {
  color: #555;
  margin-top: 20px;
  margin-bottom: 10px;
  transition: color 0.3s ease;
}

body.dark-mode h3 {
  color: #f0f0f0;
}

.wifi-instructions {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  width: 90%;
  max-width: 600px;
  transition: background-color 0.3s ease, color 0.3s ease,
    border-color 0.3s ease;
  border: 1px solid #ddd;
}

body.dark-mode .wifi-instructions {
  background-color: #333;
  color: #d4d4d4;
  border-color: #555;
}

.wifi-instructions ol {
  margin-left: 20px;
  color: #333;
  transition: color 0.3s ease;
}

body.dark-mode .wifi-instructions ol {
  color: #d4d4d4;
}

.wifi-status {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  width: 90%;
  max-width: 600px;
  text-align: center;
  transition: background-color 0.3s ease, color 0.3s ease,
    border-color 0.3s ease;
  border: 1px solid #ddd;
}

body.dark-mode .wifi-status {
  background-color: #333;
  color: #d4d4d4;
  border-color: #555;
}

.wifi-status p em {
  color: #777;
  font-style: italic;
  transition: color 0.3s ease;
}

body.dark-mode .wifi-status p em {
  color: #bbb;
}

.wifi-policy {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  transition: background-color 0.3s ease, color 0.3s ease,
    border-color 0.3s ease;
  border: 1px solid #ddd;
}

body.dark-mode .wifi-policy {
  background-color: #333;
  color: #d4d4d4;
  border-color: #555;
}

.wifi-policy pre {
  white-space: pre-wrap;
  background-color: #eee;
  padding: 10px;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #333;
  transition: background-color 0.3s ease, color 0.3s ease;
}

body.dark-mode .wifi-policy pre {
  background-color: #444;
  color: #d4d4d4;
}

.hidden-network-note {
  color: #dc3545; /* Example error color */
  margin-top: 15px;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

body.dark-mode .hidden-network-note {
  color: #f8d7da;
}

.wifi-instructions ol li a {
  color: #007bff; /* Link color */
  text-decoration: none;
  transition: color 0.3s ease;
}

body.dark-mode .wifi-instructions ol li a {
  color: #6dd5ed;
}

.wifi-instructions ol li a:hover {
  text-decoration: underline;
}
</style>
