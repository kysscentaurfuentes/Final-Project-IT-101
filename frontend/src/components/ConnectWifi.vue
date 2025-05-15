<template>
  <div class="connect-wifi-container">
    <aside class="side-navigation">
      <NavigationBar />
    </aside>
    <main class="main-content">
      <h2>Connect to Library WiFi</h2>

      <div class="wifi-instructions">
        <h3>Instructions:</h3>
        <ol>
          <li>Go to your device's WiFi settings.</li>
          <li>
            Look for the network name: <strong>{{ wifiNetworkName }}</strong>
          </li>
          <li v-if="wifiPassword">
            Enter the password: <strong>{{ wifiPassword }}</strong>
          </li>
          <li v-if="authenticationSteps">
            Follow these additional authentication steps:
            <pre>{{ authenticationSteps }}</pre>
          </li>
          <li>Once connected, you should be able to access the internet.</li>
        </ol>
      </div>

      <div class="troubleshooting">
        <h3>Troubleshooting:</h3>
        <ul>
          <li>Make sure WiFi is enabled on your device.</li>
          <li>Double-check the network name and password.</li>
          <li>
            If you're still having trouble, please contact the ICT Office
            support.
          </li>
        </ul>
      </div>

      <div class="wifi-status">
        <h3>WiFi Status:</h3>
        <p>
          <em
            >(This section would ideally show your device's current WiFi
            connection status, but this is usually managed by the OS.)</em
          >
        </p>
        <p>
          Please check your device's WiFi settings to see if you are connected
          to the library network.
        </p>
      </div>

      <div class="wifi-policy" v-if="wifiPolicy">
        <h3>Library WiFi Policy:</h3>
        <pre>{{ wifiPolicy }}</pre>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import NavigationBar from "./NavigationBar.vue"; // Import the NavigationBar component

const router = useRouter();

// Replace these with the actual library WiFi details
const wifiNetworkName = ref("CSU Free WiFi");
const wifiPassword = ref("libraryguest"); // Keep this secure if it's a public repo!
const authenticationSteps = ref(""); // Add any specific authentication steps
const wifiPolicy = ref(""); // Add the library's WiFi usage policy

// In a real application, you might fetch these details from a configuration file or API
</script>

<style scoped>
.connect-wifi-container {
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
  justify-content: flex-start;
}

h2 {
  color: #007bff;
  text-align: center;
  margin-bottom: 20px;
}

h3 {
  color: #555;
  margin-top: 20px;
  margin-bottom: 10px;
}

.wifi-instructions ol {
  margin-left: 20px;
}

.wifi-status p em {
  color: #777;
  font-style: italic;
}

.wifi-policy pre {
  white-space: pre-wrap;
  background-color: #eee;
  padding: 10px;
  border-radius: 4px;
  font-size: 0.9rem;
}
</style>
