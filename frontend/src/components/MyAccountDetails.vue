<template>
  <div class="account-details-container">
    <aside class="side-navigation">
      <NavigationBar />
    </aside>
    <main class="main-content">
      <h2>My Account Details</h2>

      <div class="profile-info">
        <h3>Profile Information</h3>
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="username" readonly />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" />
          <button @click="updateEmail">Update Email</button>
        </div>
        <div class="form-group">
          <label for="profilePicture">Profile Picture</label>
          <div class="profile-picture-preview">
            <img :src="profilePictureUrl" alt="Profile Picture" width="100" />
          </div>
          <input
            type="file"
            id="profilePicture"
            @change="uploadProfilePicture"
          />
          <button @click="updateProfilePicture">Update Picture</button>
        </div>
      </div>

      <div class="linked-accounts">
        <h3>Manage Linked Accounts</h3>
        <p v-if="linkedAccounts.length === 0">No linked accounts yet.</p>
        <ul v-else>
          <li v-for="account in linkedAccounts" :key="account.provider">
            {{ account.provider }}
            <button @click="unlinkAccount(account.provider)">Unlink</button>
          </li>
        </ul>
        <button @click="showLinkAccountOptions = true">Link New Account</button>
        <div v-if="showLinkAccountOptions" class="link-options">
          <h4>Link Account</h4>
          <button @click="linkAccount('google')">Link with Google</button>
          <button @click="linkAccount('facebook')">Link with Facebook</button>
          <button @click="showLinkAccountOptions = false">Cancel</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios"; // Assuming you'll need this for API calls
import NavigationBar from "./NavigationBar.vue"; // Import the NavigationBar component

const username = ref("");
const email = ref("");
const profilePicture = ref(null);
const profilePictureUrl = ref("default-profile.png"); // Replace with your default image path

const linkedAccounts = ref([]);
const showLinkAccountOptions = ref(false);

const router = useRouter();

// Simulate fetching user data on mount
onMounted(async () => {
  try {
    const response = await axios.get("/api/user/profile", {
      // headers: { 'Authorization': `Bearer ${localStorage.getItem('userToken')}` }
    });
    if (response.data.success) {
      username.value = response.data.user.username;
      email.value = response.data.user.email;
      if (response.data.user.profilePicture) {
        profilePictureUrl.value = response.data.user.profilePicture; // Or construct full URL
      }
      linkedAccounts.value = response.data.user.linkedAccounts || []; // Assuming this data exists
    } else {
      console.error("Failed to load profile data");
      // Handle error appropriately
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
    // Handle error appropriately
  }
});

const updateEmail = async () => {
  // Implement your API call to update the email
  console.log("Updating email to:", email.value);
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
    // Implement your API call to update the profile picture
    console.log("Uploading profile picture:", profilePicture.value);
  } else {
    console.log("No new profile picture selected.");
  }
};

const linkAccount = (provider) => {
  // Implement your logic to initiate the linking process with the provider
  console.log("Linking account with:", provider);
  // This might involve redirecting the user to the provider's authentication page
  showLinkAccountOptions.value = false;
};

const unlinkAccount = (provider) => {
  // Implement your API call to unlink the account
  console.log("Unlinking account from:", provider);
};
</script>

<style scoped>
.account-details-container {
  display: flex;
  min-height: 100vh;
  background-color: #e0f7fa; /* Light cyan background */
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

.profile-info,
.linked-accounts {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  width: 90%;
  max-width: 500px;
}

h3 {
  color: #555;
  margin-top: 0;
  margin-bottom: 15px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  text-align: left;
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
}

.profile-picture-preview {
  margin-bottom: 10px;
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 5px;
  background-color: #f9f9f9;
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
  transition: background-color 0.3s ease;
  margin-top: 10px;
  margin-right: 10px;
}

button:hover {
  background-color: #0056b3;
}

.linked-accounts ul {
  list-style: none;
  padding: 0;
}

.linked-accounts li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
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
}

.link-options h4 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #333;
}

.link-options button {
  margin: 5px;
}
</style>
