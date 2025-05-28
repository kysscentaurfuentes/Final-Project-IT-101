<template>
  <div class="settings-container" :class="{ 'dark-mode': isDarkMode }">
    <aside class="side-navigation" :class="{ 'dark-mode': isDarkMode }">
      <NavigationBar />
    </aside>
    <main
      class="main-content"
      :class="['main-content', { 'dark-mode': isDarkMode }]"
    >
      <h2>Settings</h2>
      <div
        v-if="successMessage"
        class="success-message"
        :class="{ 'dark-mode': isDarkMode }"
      >
        <i class="fas fa-check-circle"></i>
        {{ successMessage }}
      </div>

      <div class="theme-section" :class="{ 'dark-mode': isDarkMode }">
        <h3>Theme</h3>
        <div class="form-group">
          <label for="darkMode">Dark Mode</label>
          <input
            type="checkbox"
            id="darkMode"
            v-model="isDarkMode"
            @change="updateThemeSetting('darkMode', isDarkMode)"
          />
        </div>
      </div>

      <div class="security-section" :class="{ 'dark-mode': isDarkMode }">
        <h3>Security</h3>
        <div class="form-group">
          <label for="twoFactorAuth">Enable 2-Step Verification</label>
          <input
            type="checkbox"
            id="twoFactorAuth"
            v-model="twoFactorEnabled"
            @change="updateSetting('twoFactorEnabled', twoFactorEnabled)"
          />
        </div>
        <div class="form-group">
          <label for="changePassword">Change Password</label>
          <button
            @click="showChangePasswordModal = true"
            :class="{ 'dark-mode': isDarkMode }"
          >
            Change Password
          </button>
        </div>
      </div>

      <div class="accessibility-section" :class="{ 'dark-mode': isDarkMode }">
        <h3>Accessibility</h3>
        <div class="form-group">
          <label for="enableSound">Enable Sound (for QR Scan)</label>
          <input
            type="checkbox"
            id="enableSound"
            v-model="soundEnabled"
            @change="updateSetting('soundEnabled', soundEnabled)"
          />
        </div>
        <div class="form-group">
          <label for="enableVibration">Enable Vibration (for QR Scan)</label>
          <input
            type="checkbox"
            id="enableVibration"
            v-model="vibrationEnabled"
            @change="updateSetting('vibrationEnabled', vibrationEnabled)"
          />
        </div>
        <div class="form-group">
          <label for="fontSize">Font Size</label>
          <select
            id="fontSize"
            v-model="selectedFontSize"
            @change="updateFontSize($event.target.value)"
            :class="{ 'dark-mode': isDarkMode }"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
      </div>

      <div class="notifications-section" :class="{ 'dark-mode': isDarkMode }">
        <h3>Notifications</h3>
        <div class="form-group">
          <label for="emailNotifications">Enable Email Notifications</label>
          <input
            type="checkbox"
            id="emailNotifications"
            v-model="emailNotificationsEnabled"
            @change="
              updateSetting(
                'emailNotificationsEnabled',
                emailNotificationsEnabled
              )
            "
          />
        </div>
        <div class="form-group">
          <label for="pushNotifications">Enable Push Notifications</label>
          <input
            type="checkbox"
            id="pushNotifications"
            v-model="pushNotificationsEnabled"
            @change="
              updateSetting(
                'pushNotificationsEnabled',
                pushNotificationsEnabled
              )
            "
          />
        </div>
        <div class="form-group">
          <label for="notificationSounds">Notification Sound Volume</label>
          <input
            type="range"
            id="notificationSounds"
            v-model="notificationSoundVolume"
            min="0"
            max="100"
            @change="
              updateSetting('notificationSoundVolume', notificationSoundVolume)
            "
            :class="{ 'dark-mode': isDarkMode }"
          />
          <span>{{ notificationSoundVolume }}%</span>
        </div>
      </div>

      <div class="privacy-section" :class="{ 'dark-mode': isDarkMode }">
        <h3>Privacy</h3>
        <div class="form-group">
          <label for="shareUsageData">Share Anonymous Usage Data</label>
          <input
            type="checkbox"
            id="shareUsageData"
            v-model="shareUsageDataEnabled"
            @change="
              updateSetting('shareUsageDataEnabled', shareUsageDataEnabled)
            "
          />
        </div>
        <div class="form-group">
          <button
            @click="navigateToPrivacyTerms"
            :class="{ 'dark-mode': isDarkMode }"
          >
            View Privacy Policy & Terms of Service
          </button>
        </div>
      </div>

      <div class="about-section" :class="{ 'dark-mode': isDarkMode }">
        <h3>About</h3>
        <p>Version: 1.0.0</p>
        <p>&copy; 2025 ICT Library Office Sign In. All rights reserved.</p>
      </div>

      <div
        v-if="showChangePasswordModal"
        class="modal"
        :class="{ 'dark-mode': isDarkMode }"
      >
        <div class="modal-content" :class="{ 'dark-mode': isDarkMode }">
          <h3>Change Password</h3>
          <div class="form-group">
            <label for="currentPassword">Current Password</label>
            <input
              type="password"
              id="currentPassword"
              v-model="currentPassword"
              :class="{ 'dark-mode': isDarkMode }"
            />
          </div>
          <div class="form-group">
            <label for="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              v-model="newPassword"
              :class="{ 'dark-mode': isDarkMode }"
            />
          </div>
          <div class="form-group">
            <label for="confirmNewPassword">Confirm New Password</label>
            <input
              type="password"
              id="confirmNewPassword"
              v-model="confirmNewPassword"
              :class="{ 'dark-mode': isDarkMode }"
            />
          </div>
          <div class="modal-actions">
            <button
              @click="updatePassword"
              :class="{ 'dark-mode': isDarkMode }"
            >
              Update Password
            </button>
            <button
              @click="showChangePasswordModal = false"
              :class="{ 'dark-mode': isDarkMode }"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import axios from "axios";
import NavigationBar from "./NavigationBar.vue";
import { useRouter, useRoute } from "vue-router";
import { useDarkMode } from "../composables/useDarkMode";
import { useFontSize } from "../composables/useFontSize"; // Import the font size composable

const router = useRouter();
const route = useRoute();

const { isDarkMode } = useDarkMode();
const { fontSize, setFontSize, fontSizeClass } = useFontSize(); // Get the font size state and setter

// Security
const twoFactorEnabled = ref(false);

// Accessibility
const soundEnabled = ref(false);
const vibrationEnabled = ref(false);
const selectedFontSize = ref(fontSize.value); // Initialize with the global state

// Notifications
const emailNotificationsEnabled = ref(false);
const pushNotificationsEnabled = ref(false);
const notificationSoundVolume = ref(50);

// Privacy
const shareUsageDataEnabled = ref(false);

const successMessage = ref("");

// Change Password Modal State
const showChangePasswordModal = ref(false);
const currentPassword = ref("");
const newPassword = ref("");
const confirmNewPassword = ref("");

const navigateToPrivacyTerms = () => {
  sessionStorage.setItem("previousRoute", route.name);
  router.push({ name: "PrivacyTerms" });
};

const updateSetting = async (key, value) => {
  successMessage.value = "";
  try {
    const response = await axios.post(
      "/api/user/settings/update",
      { [key]: value },
      {}
    );
    if (response.data.success) {
      successMessage.value = `Setting "${key}" updated successfully!`;
    } else {
      console.error(
        `Failed to update setting "${key}":`,
        response.data.message
      );
    }
  } catch (error) {
    console.error(`Error updating setting "${key}":`, error);
  }
};

const updateThemeSetting = (key, value) => {
  isDarkMode.value = value;
  updateSetting(key, value);
};

const updatePassword = async () => {
  if (newPassword.value && newPassword.value === confirmNewPassword.value) {
    try {
      const response = await axios.post(
        "/api/user/settings/password",
        {
          currentPassword: currentPassword.value,
          newPassword: newPassword.value,
        },
        {}
      );
      if (response.data.success) {
        successMessage.value = "Password updated successfully!";
        showChangePasswordModal.value = false;
        currentPassword.value = "";
        newPassword.value = "";
        confirmNewPassword.value = "";
      } else {
        console.error("Failed to update password:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating password:", error);
    }
  } else {
    console.error("New passwords do not match.");
  }
};

const updateFontSize = (size) => {
  selectedFontSize.value = size; // Update the local selected value
  setFontSize(size); // Update the global font size state
};

onMounted(async () => {
  try {
    const response = await axios.get("/api/user/settings", {});
    if (response.data.success) {
      const settings = response.data.settings || {};
      twoFactorEnabled.value = settings.twoFactorEnabled || false;
      soundEnabled.value = settings.soundEnabled || false;
      vibrationEnabled.value = settings.vibrationEnabled || false;
      selectedFontSize.value = settings.fontSize || "medium";
      setFontSize(selectedFontSize.value); // Initialize global state on mount
      emailNotificationsEnabled.value =
        settings.emailNotificationsEnabled || false;
      pushNotificationsEnabled.value =
        settings.pushNotificationsEnabled || false;
      notificationSoundVolume.value =
        settings.notificationSoundVolume !== undefined
          ? settings.notificationSoundVolume
          : 50;
      shareUsageDataEnabled.value = settings.shareUsageDataEnabled || false;

      if (settings.darkMode !== undefined) {
        isDarkMode.value = settings.darkMode;
      }
    } else {
      console.error("Failed to load settings:", response.data.message);
    }
  } catch (error) {
    console.error("Error fetching settings:", error);
  }
});
</script>

<style scoped>
.settings-container {
  display: flex;
  min-height: 100vh;
  background-color: #f0fff0; /* Default light background */
  transition: background-color 0.3s ease;
}

.settings-container.dark-mode {
  background-color: #1e1e1e; /* Dark background */
  color: #d4d4d4; /* Light text for dark mode */
}

.side-navigation {
  background-color: #333;
  color: white;
  width: 200px; /* Adjust as needed */
  padding: 20px;
  z-index: 1;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.side-navigation.dark-mode {
  background-color: #252525; /* Darker sidebar */
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

.main-content.dark-mode {
  background-color: #252525; /* Dark background for content */
  color: #d4d4d4;
}

h2 {
  color: #007bff;
  text-align: center;
  margin-bottom: 20px;
  transition: color 0.3s ease;
}

.main-content.dark-mode h2 {
  color: #6dd5ed; /* Lighter blue for dark mode */
}

.success-message {
  background-color: #d4edda;
  color: #155724;
  padding: 10px;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
  margin-bottom: 15px;
}

.success-message.dark-mode {
  background-color: #28a745;
  color: #f0fff0;
  border-color: #1e7e34;
}

.theme-section,
.security-section,
.accessibility-section,
.language-section,
.notifications-section,
.privacy-section,
.about-section {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  width: 90%;
  max-width: 500px;
  transition: background-color 0.3s ease, border-color 0.3s ease,
    color 0.3s ease;
}

.main-content.dark-mode .theme-section,
.main-content.dark-mode .security-section,
.main-content.dark-mode .accessibility-section,
.main-content.dark-mode .language-section,
.main-content.dark-mode .notifications-section,
.main-content.dark-mode .privacy-section,
.main-content.dark-mode .about-section {
  background-color: #333;
  border-color: #555;
  color: #d4d4d4;
}

h3 {
  color: #555;
  margin-top: 0;
  margin-bottom: 15px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  text-align: left;
  transition: color 0.3s ease, border-color 0.3s ease;
}

.main-content.dark-mode h3 {
  color: #f8f8f2;
  border-color: #555;
}

.form-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  color: #333;
  transition: color 0.3s ease;
}

.main-content.dark-mode label {
  color: #f0f0f0;
}

input[type="checkbox"],
select,
button,
input[type="range"] {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  transition: background-color 0.3s ease, border-color 0.3s ease,
    color 0.3s ease;
}

.main-content.dark-mode input[type="checkbox"],
.main-content.dark-mode select,
.main-content.dark-mode input[type="range"] {
  background-color: #444;
  border-color: #666;
  color: #d4d4d4;
}

select {
  width: 150px;
}

button {
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.main-content.dark-mode button {
  background-color: #3a86ff;
  color: #f8f8f2;
}

button:hover {
  background-color: #0056b3;
}

.main-content.dark-mode button:hover {
  background-color: #2c69d9;
}

/* Modal Styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.main-content.dark-mode .modal-content {
  background-color: #333;
  color: #d4d4d4;
}

.modal-content h3 {
  text-align: center;
  margin-bottom: 15px;
  color: #333;
  transition: color 0.3s ease;
}

.main-content.dark-mode .modal-content h3 {
  color: #f8f8f2;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.modal-actions button {
  padding: 10px 15px;
}

.main-content.dark-mode .modal-actions button {
  color: #f8f8f2;
}

.font-small {
  font-size: 12px;
}

.font-medium {
  font-size: 16px;
}

.font-large {
  font-size: 20px;
}

.font-small h2,
.font-small h3,
.font-small label,
.font-small button,
.font-small select,
.font-small input {
  font-size: 0.85rem;
}

.font-large h2,
.font-large h3,
.font-large label,
.font-large button,
.font-large select,
.font-large input {
  font-size: 1.25rem;
}
</style>
