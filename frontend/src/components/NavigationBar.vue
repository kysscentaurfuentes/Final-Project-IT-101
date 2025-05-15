<template>
  <nav class="navigation-bar">
    <ul>
      <li>
        <RouterLink to="/main-menu" active-class="router-link-active" exact>
          <i class="fas fa-home"></i>
          <span>Home</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/scan-qr" active-class="router-link-active">
          <i class="fas fa-qrcode"></i>
          <span>Scan QR Code</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/live-view" active-class="router-link-active">
          <i class="fas fa-video"></i>
          <span>Live View</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/connect-wifi" active-class="router-link-active">
          <i class="fas fa-wifi"></i>
          <span>Connect WiFi</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/attendance-log" active-class="router-link-active">
          <i class="fas fa-calendar-alt"></i>
          <span>Attendance Log</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/check-availability" active-class="router-link-active">
          <i class="fas fa-search"></i>
          <span>Check Availability</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/open-forum" active-class="router-link-active">
          <i class="fas fa-comments"></i>
          <span>Open Forums</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/report-issue" active-class="router-link-active">
          <i class="fas fa-exclamation-triangle"></i>
          <span>Report Issue</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/account-details" active-class="router-link-active">
          <i class="fas fa-user-cog"></i>
          <span>My Account</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/settings" active-class="router-link-active">
          <i class="fas fa-cog"></i>
          <span>Settings</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/software-access" active-class="router-link-active">
          <i class="fas fa-laptop-code"></i>
          <span>Software Access</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/printing-services" active-class="router-link-active">
          <i class="fas fa-print"></i>
          <span>Printing Services</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/feedback" active-class="router-link-active">
          <i class="fas fa-comment-dots"></i>
          <span>Feedback</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/about" active-class="router-link-active">
          <i class="fas fa-info-circle"></i>
          <span>About</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/log-out" active-class="router-link-active">
          <i class="fas fa-sign-out-alt"></i>
          <span>Log Out</span>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { useRouter, RouterLink } from "vue-router";
</script>

<style scoped>
.navigation-bar {
  background-color: #333;
  color: white;
  padding: 1rem 0;
}

.navigation-bar ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column; /* Stack items vertically for a sidebar */
  align-items: flex-start; /* Align items to the left */
}

.navigation-bar li {
  margin-bottom: 0.75rem;
  width: 100%; /* Make each item take full width of the sidebar */
}

.navigation-bar li a {
  display: block;
  color: white;
  text-decoration: none;
  padding: 0.75rem 1rem;
  transition: background-color 0.3s ease;
  border-radius: 4px;
}

.navigation-bar li a:hover {
  background-color: #555;
}

.navigation-bar li a i {
  margin-right: 0.5rem;
}

.router-link-active {
  background-color: #555;
  color: white;
}
</style>
