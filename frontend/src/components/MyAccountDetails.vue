<template>
  <div class="account-details-container" :class="fontSizeClass">
    <aside class="side-navigation" :class="{ 'dark-mode': isDarkMode }">
      <NavigationBar />
    </aside>
    <main class="main-content" :class="{ 'dark-mode': isDarkMode }">
      <h2>My Account Details</h2>

      <div class="profile-info" :class="{ 'dark-mode': isDarkMode }">
        <h3>Profile Information</h3>
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            :class="{ 'dark-mode': isDarkMode }"
          />
          <button @click="updateUsername" :class="{ 'dark-mode': isDarkMode }">
            Update Username
          </button>
        </div>
        <div class="form-group">
          <label for="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            v-model="firstName"
            :class="{ 'dark-mode': isDarkMode }"
          />
        </div>
        <div class="form-group">
          <label for="middleName">Middle Name</label>
          <input
            type="text"
            id="middleName"
            v-model="middleName"
            :class="{ 'dark-mode': isDarkMode }"
          />
        </div>
        <div class="form-group">
          <label for="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            v-model="lastName"
            :class="{ 'dark-mode': isDarkMode }"
          />
          <button @click="updateName" :class="{ 'dark-mode': isDarkMode }">
            Update Name
          </button>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            :class="{ 'dark-mode': isDarkMode }"
          />
          <button @click="updateEmail" :class="{ 'dark-mode': isDarkMode }">
            Update Email
          </button>
        </div>
        <div class="form-group">
          <label for="mobileNumber">Mobile Number</label>
          <div class="mobile-number-input" :class="{ 'dark-mode': isDarkMode }">
            <span class="country-code" :class="{ 'dark-mode': isDarkMode }"
              >+63</span
            >
            <span class="ph-flag" :class="{ 'dark-mode': isDarkMode }">🇵🇭</span>
            <input
              type="text"
              id="mobileNumber"
              v-model="mobileNumber"
              @input="formatMobileNumber"
              maxlength="10"
              :class="{ 'dark-mode': isDarkMode }"
            />
          </div>
          <button
            @click="updateMobileNumber"
            :class="{ 'dark-mode': isDarkMode }"
          >
            Update Mobile Number
          </button>
        </div>
        <div class="form-group">
          <label for="profilePicture">Profile Picture</label>
          <div
            class="profile-picture-preview"
            :class="{ 'dark-mode': isDarkMode }"
          >
            <img :src="profilePictureUrl" alt="Profile Picture" width="100" />
          </div>
          <input
            type="file"
            id="profilePicture"
            @change="uploadProfilePicture"
            :class="{ 'dark-mode': isDarkMode }"
          />
          <button
            @click="updateProfilePicture"
            :class="{ 'dark-mode': isDarkMode }"
          >
            Update Picture
          </button>
        </div>
      </div>

      <div class="linked-accounts" :class="{ 'dark-mode': isDarkMode }">
        <h3>Manage Linked Accounts</h3>
        <p v-if="linkedAccounts.length === 0">No linked accounts yet.</p>
        <ul v-else :class="{ 'dark-mode': isDarkMode }">
          <li
            v-for="account in linkedAccounts"
            :key="account.provider"
            :class="{ 'dark-mode': isDarkMode }"
          >
            {{ account.provider }}
            <button
              @click="unlinkAccount(account.provider)"
              :class="{ 'dark-mode': isDarkMode }"
            >
              Unlink
            </button>
          </li>
        </ul>
        <button
          @click="showLinkAccountOptions = true"
          :class="{ 'dark-mode': isDarkMode }"
        >
          Link New Account
        </button>
        <div
          v-if="showLinkAccountOptions"
          class="link-options"
          :class="{ 'dark-mode': isDarkMode }"
        >
          <h4>Link Account</h4>
          <button
            @click="linkAccount('google')"
            :class="{ 'dark-mode': isDarkMode }"
          >
            Link with Google
          </button>
          <button
            @click="linkAccount('facebook')"
            :class="{ 'dark-mode': isDarkMode }"
          >
            Link with Facebook
          </button>
          <button
            @click="showLinkAccountOptions = false"
            :class="{ 'dark-mode': isDarkMode }"
          >
            Cancel
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import NavigationBar from "./NavigationBar.vue";
import { useDarkMode } from "../composables/useDarkMode";
import { useFontSize } from "../composables/useFontSize"; // Import the font size composable

const { isDarkMode } = useDarkMode();
const { fontSizeClass } = useFontSize(); // Get the font size class

const username = ref("");
const firstName = ref("");
const middleName = ref("");
const lastName = ref("");
const email = ref("");
const mobileNumber = ref("");
const profilePicture = ref(null);
const profilePictureUrl = ref("default-profile.png");

const linkedAccounts = ref([]);
const showLinkAccountOptions = ref(false);

const router = useRouter();

onMounted(async () => {
  try {
    const response = await axios.get("/api/user/profile");
    if (response.data.success) {
      username.value = response.data.user.username;
      firstName.value = response.data.user.firstName || "";
      middleName.value = response.data.user.middleName || "";
      lastName.value = response.data.user.lastName || "";
      email.value = response.data.user.email;
      mobileNumber.value = response.data.user.mobileNumber || "";
      if (response.data.user.profilePicture) {
        profilePictureUrl.value = response.data.user.profilePicture;
      }
      linkedAccounts.value = response.data.user.linkedAccounts || [];
    } else {
      console.error("Failed to load profile data");
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
});

const updateUsername = async () => {
  console.log("Updating username to:", username.value);
};

const updateName = async () => {
  console.log(
    "Updating name to:",
    firstName.value,
    middleName.value,
    lastName.value
  );
};

const updateEmail = async () => {
  console.log("Updating email to:", email.value);
};

const updateMobileNumber = async () => {
  console.log("Updating mobile number to:", mobileNumber.value);
};

const uploadProfilePicture = (event) => {
  const file = event.target.files[0];
  if (file) {
    profilePicture.value = file;
    profilePictureUrl.value = URL.createObjectURL(file);
  }
};

const updateProfilePicture = async () => {
  if (profilePicture.value) {
    const formData = new FormData();
    formData.append("profilePicture", profilePicture.value);
    console.log("Uploading profile picture:", profilePicture.value);
  } else {
    console.log("No new profile picture selected.");
  }
};

const linkAccount = (provider) => {
  console.log("Linking account with:", provider);
  showLinkAccountOptions.value = false;
};

const unlinkAccount = (provider) => {
  console.log("Unlinking account from:", provider);
};

const formatMobileNumber = () => {
  mobileNumber.value = mobileNumber.value.replace(/[^0-9]/g, "");
  if (mobileNumber.value.length > 10) {
    mobileNumber.value = mobileNumber.value.slice(0, 10);
  }
};
</script>

<style scoped>
.account-details-container {
  display: flex;
  min-height: 100vh;
  background-color: #e0f7fa; /* Light cyan background */
  transition: background-color 0.3s ease, color 0.3s ease;
}

body.dark-mode .account-details-container {
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

body.dark-mode .side-navigation {
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

body.dark-mode .main-content {
  background-color: #252525; /* Dark background for content */
  color: #d4d4d4;
}

h2 {
  color: #007bff;
  text-align: center;
  margin-bottom: 20px;
  transition: color 0.3s ease;
}

body.dark-mode h2 {
  color: #6dd5ed; /* Lighter blue for dark mode */
}

.profile-info,
.linked-accounts {
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

body.dark-mode .profile-info,
body.dark-mode .linked-accounts {
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

body.dark-mode h3 {
  color: #f8f8f2;
  border-color: #555;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
  transition: color 0.3s ease;
}

body.dark-mode label {
  color: #f0f0f0;
}

input[type="text"],
input[type="email"],
input[type="password"],
input[type="file"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 1rem;
  transition: background-color 0.3s ease, border-color 0.3s ease,
    color 0.3s ease;
}

body.dark-mode input[type="text"],
body.dark-mode input[type="email"],
body.dark-mode input[type="password"],
body.dark-mode input[type="file"] {
  background-color: #444;
  border-color: #666;
  color: #d4d4d4;
}

.profile-picture-preview {
  margin-bottom: 10px;
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 5px;
  background-color: #f9f9f9;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

body.dark-mode .profile-picture-preview {
  background-color: #333;
  border-color: #555;
}

.profile-picture-preview img {
  display: block;
  max-width: 100%;
  height: auto;
}

button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease, color 0.3s ease;
  margin-top: 10px;
  margin-right: 10px;
}

body.dark-mode button {
  background-color: #3a86ff;
  color: #f8f8f2;
}

button:hover {
  background-color: #0056b3;
}

body.dark-mode button:hover {
  background-color: #2c69d9;
}

.linked-accounts ul {
  list-style: none;
  padding: 0;
}

body.dark-mode .linked-accounts ul {
  color: #d4d4d4;
}

.linked-accounts li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
  transition: border-color 0.3s ease, color 0.3s ease;
}

body.dark-mode .linked-accounts li {
  border-bottom-color: #555;
  color: #d4d4d4;
}

.linked-accounts li:last-child {
  border-bottom: none;
}

.link-options {
  margin-top: 15px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
  text-align: center;
  transition: background-color 0.3s ease, border-color 0.3s ease,
    color 0.3s ease;
}

body.dark-mode .link-options {
  background-color: #333;
  border-color: #555;
  color: #d4d4d4;
}

.link-options h4 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #333;
  transition: color 0.3s ease;
}

body.dark-mode .link-options h4 {
  color: #f8f8f2;
}

.link-options button {
  margin: 5px;
}

/* Styles for Mobile Number Input */
.mobile-number-input {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  overflow: hidden; /* Hide any potential overflow */
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

body.dark-mode .mobile-number-input {
  border-color: #666;
  background-color: #444;
  color: #d4d4d4;
}

.country-code {
  padding: 10px;
  background-color: #f0f0f0;
  border-right: 1px solid #ccc;
  font-size: 1rem;
  color: #333;
  transition: background-color 0.3s ease, border-color 0.3s ease,
    color 0.3s ease;
}

body.dark-mode .country-code {
  background-color: #555;
  border-right-color: #666;
  color: #d4d4d4;
}

.ph-flag {
  margin-left: 5px;
  margin-right: 5px;
  font-size: 1.2rem; /* Adjust flag size as needed */
  color: #333;
  transition: color 0.3s ease;
}

body.dark-mode .ph-flag {
  color: #d4d4d4;
}

#mobileNumber {
  width: calc(100% - 80px); /* Adjust width to fit within container */
  padding: 10px;
  border: none;
  box-sizing: border-box;
  font-size: 1rem;
  outline: none;
  transition: background-color 0.3s ease, color 0.3s ease;
}

body.dark-mode #mobileNumber {
  background-color: #444;
  color: #d4d4d4;
}
</style>
