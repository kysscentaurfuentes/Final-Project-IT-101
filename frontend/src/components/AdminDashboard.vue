<template>
  <div class="admin-dashboard-container">
    <nav class="admin-nav-bar">
      <ul>
        <li>
          <router-link to="/admin" active-class="active"
            >Dashboard Home</router-link
          >
        </li>
        <li>
          <router-link to="/signin-logs" active-class="active"
            >Sign-In Logs</router-link
          >
        </li>
      </ul>
    </nav>
    <div class="admin-main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
// You can import other components or define logic here if needed
// For example, you might fetch admin-specific data on mount
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
  // Example: Check if the user is an admin, otherwise redirect
  const userRole = localStorage.getItem("userRole"); // Assuming you store the role
  if (userRole !== "admin") {
    router.push("/"); // Redirect to the home page or login
  }
});
</script>

<style scoped>
/* Similar styling to other Vue files */
.admin-dashboard-container {
  font-family: Arial, sans-serif;
  background-color: #f4f6f8;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.admin-nav-bar {
  background-color: #343a40;
  color: white;
  padding: 1rem 0;
  border-bottom: 1px solid #222;
}

.admin-nav-bar ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: flex-start;
  padding-left: 20px;
}

.admin-nav-bar li {
  margin-right: 1.5rem;
}

.admin-nav-bar li:last-child {
  margin-right: 0;
}

.admin-nav-bar a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.admin-nav-bar a:hover,
.admin-nav-bar a.active {
  background-color: #555;
}

.admin-main-content {
  padding: 20px;
  flex-grow: 1;
}

/* You can add more specific styles for the admin dashboard layout */
</style>
