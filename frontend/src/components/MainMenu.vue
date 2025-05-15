<template>
  <div class="main-menu-container">
    <div class="main-menu-overlay"></div>
    <aside class="side-navigation">
      <NavigationBar />
    </aside>
    <main class="main-content">
      <h2>Main Menu</h2>
      <div class="main-content-header">
        <div class="smart-search-container">
          <h3>Smart Search</h3>
          <p>Search something here you struggle to find</p>
          <input
            type="text"
            placeholder="Search resources..."
            class="smart-search-input"
          />
          <div class="search-suggestions"></div>
          <div class="search-filters">
            <button>Search</button>
          </div>
        </div>
      </div>
      <div class="main-content-layout">
        <div class="menu-grid">
          <router-link to="/scan-qr" class="menu-item">
            <i class="fas fa-qrcode"></i>
            <span>QR Code Scanner</span>
          </router-link>
          <router-link to="/live-view" class="menu-item">
            <i class="fas fa-video"></i>
            <span>Live View</span>
          </router-link>
          <router-link to="/connect-wifi" class="menu-item">
            <i class="fas fa-wifi"></i>
            <span>Connect WiFi</span>
          </router-link>
          <router-link to="/attendance-log" class="menu-item">
            <i class="fas fa-calendar-alt"></i>
            <span>Attendance Log</span>
          </router-link>
          <router-link to="/check-availability" class="menu-item">
            <i class="fas fa-search"></i>
            <span>Check Availability</span>
          </router-link>
          <router-link to="/open-forum" class="menu-item">
            <i class="fas fa-comments"></i>
            <span>Open Forums</span>
          </router-link>
          <router-link to="/report-issue" class="menu-item">
            <i class="fas fa-exclamation-triangle"></i>
            <span>Report Issue</span>
          </router-link>
          <router-link to="/account-details" class="menu-item">
            <i class="fas fa-user-cog"></i> <span>My Account</span>
          </router-link>
          <router-link to="/settings" class="menu-item">
            <i class="fas fa-cog"></i>
            <span>Settings</span>
          </router-link>
          <router-link to="/software-access" class="menu-item">
            <i class="fas fa-laptop-code"></i>
            <span>Software Access</span>
          </router-link>
          <router-link to="/printing-services" class="menu-item">
            <i class="fas fa-print"></i>
            <span>Printing Services</span>
          </router-link>
          <router-link to="/feedback" class="menu-item">
            <i class="fas fa-comment-dots"></i>
            <span>Feedback</span>
          </router-link>
          <router-link to="/about" class="menu-item">
            <i class="fas fa-info-circle"></i>
            <span>About</span>
          </router-link>
          <router-link to="/log-out" class="menu-item">
            <i class="fas fa-sign-out-alt"></i>
            <span>Log Out</span>
          </router-link>
        </div>

        <div class="announcements-box">
          <h3>Lab Announcements</h3>
          <ul class="announcement-list">
            <li>
              System downtime scheduled for May 15th, 2:00 PM - 4:00 PM for
              maintenance.
            </li>
            <li>
              Urgent software update required for Adobe Creative Suite. Please
              update before May 18th.
            </li>
            <li>
              ICT Lab Room A will be closed for renovation from May 20th to May
              25th.
            </li>
            <li>
              Notice: One of the high-performance computers in Zone 3 is
              currently experiencing a hardware malfunction. Please avoid using
              it.
            </li>
          </ul>
        </div>

        <div class="occupancy-history-box">
          <h3>Lab Occupancy History</h3>
          <div class="occupancy-chart-placeholder">
            <p>
              Visual representation of lab occupancy trends will be displayed
              here.
            </p>
            <p>This chart helps you see when the lab is typically busiest.</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import NavigationBar from "./NavigationBar.vue";
</script>

<style scoped>
.main-menu-container {
  display: flex;
  font-family: Arial, sans-serif;
  min-height: 100vh;
  background-image: url("../assets/images/CSU background.jpg"); /* Set your background image */
  background-size: cover;
  background-position: center;
  position: relative;
}

.main-menu-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3); /* Slightly darken the background */
}

.side-navigation {
  background-color: #333;
  color: white;
  width: 200px; /* Adjust as needed */
  padding: 20px;
  z-index: 1; /* Ensure sidebar is above the overlay */
}

.main-content {
  flex-grow: 1;
  padding: 20px;
  z-index: 1; /* Ensure content is above the overlay */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main-content-header {
  display: flex;
  justify-content: flex-end; /* Align to the right */
  width: 90%;
  max-width: 1200px;
  margin-bottom: 20px; /* Space below the search bar */
}

.main-content-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 1200px;
}

h2 {
  color: white;
  text-align: center;
  margin-bottom: 20px;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 15px;
  padding: 20px;
  background-color: rgba(
    255,
    255,
    255,
    0.7
  ); /* Glass effect, reduced opacity */
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  margin-bottom: 20px; /* Space between menu and announcements */
  width: 100%; /* Make the menu grid take full width */
}

.menu-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  background-color: #e0e0e0;
  border-radius: 8px;
  text-decoration: none;
  color: #333;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.menu-item:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.menu-item i {
  font-size: 2rem;
  margin-bottom: 10px;
}

.menu-item span {
  font-weight: bold;
  font-size: 0.9rem;
  white-space: nowrap;
}

/* Glaze Effect */
.menu-item::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: rgba(255, 255, 255, 0.2);
  transform: rotate(-45deg) translate(-50%, -50%);
  transition: transform 0.3s ease-in-out;
  pointer-events: none;
}

.menu-item:hover::before {
  transform: rotate(-45deg) translate(50%, 50%);
}

.announcements-box,
.occupancy-history-box {
  background-color: rgba(
    255,
    255,
    255,
    0.7
  ); /* Glass effect, reduced opacity */
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  padding: 20px;
  width: 100%; /* Make them take full width */
  margin-bottom: 20px; /* Space between boxes */
}

.announcements-box h3,
.occupancy-history-box h3 {
  color: #333;
  margin-top: 0;
  margin-bottom: 15px;
  text-align: center;
}

.announcement-list {
  list-style: disc;
  padding-left: 20px;
  color: #555;
}

.announcement-list li {
  margin-bottom: 8px;
}

.occupancy-chart-placeholder {
  color: #555;
  text-align: center;
  padding: 20px 0;
  border: 1px dashed #ccc;
  border-radius: 8px;
}

.smart-search-container {
  background-color: rgba(
    255,
    255,
    255,
    0.7
  ); /* Glass effect, reduced opacity */
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 15px;
  text-align: left; /* Align content to the right */
  display: flex;
  align-items: left;
  gap: 10px; /* Space between elements */
  width: 100%; /* Make it take the full width of its parent */
}

.smart-search-container h3 {
  color: #333;
  margin-top: 0;
  margin-bottom: 0; /* Adjust margin */
  margin-right: auto;
  font-size: 2rem; /* Smaller heading */
}

.smart-search-container p {
  color: #555;
  font-size: 0.8rem;
  margin-bottom: 0;
}

.smart-search-input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 0;
  width: 170px; /* Reduced width */
}

.search-suggestions {
  position: absolute; /* Position below the input */
  top: 100%;
  right: 0;
  background-color: white;
  border: 1px solid #eee;
  border-radius: 4px;
  margin-top: 2px;
  width: 200px;
  text-align: left;
  z-index: 10; /* Ensure it's above other elements */
  /* Add styles for displaying suggestions */
}

.search-filters {
  display: flex;
  gap: 10px;
}

.search-filters button {
  padding: 6px 8px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.7rem;
  cursor: pointer;
}

/* Style for NavigationBar */
.side-navigation .navigation-bar {
  background-color: transparent;
  border-bottom: none;
}

.side-navigation .navigation-bar ul {
  flex-direction: column;
  align-items: flex-start;
}

.side-navigation .navigation-bar li {
  margin: 0 0 1rem 0;
  width: 100%;
}

.side-navigation .navigation-bar li a {
  display: block;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  color: white;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.side-navigation .navigation-bar li a:hover {
  background-color: #555;
}

.side-navigation .navigation-bar li a i {
  margin-right: 0.5rem;
}

.side-navigation .navigation-bar li a.router-link-active {
  background-color: #555;
  color: white;
}
</style>
