<template>
  <div class="main-menu-container" :class="{ 'dark-mode': isDarkMode }">
    <div
      class="main-menu-overlay"
      :class="{ 'dark-mode-overlay': isDarkMode }"
    ></div>
    <aside class="side-navigation" :class="{ 'dark-mode': isDarkMode }">
      <NavigationBar />
    </aside>
    <main class="main-content" :class="{ 'dark-mode': isDarkMode }">
      <h2 :class="{ 'dark-mode-h2': isDarkMode }">Main Menu</h2>
      <div class="main-content-header">
        <div
          class="smart-search-container"
          :class="{ 'dark-mode-search-container': isDarkMode }"
        >
          <h3 :class="{ 'dark-mode-h3': isDarkMode }">Smart Search</h3>
          <p :class="{ 'dark-mode-p': isDarkMode }">
            Search something here you struggle to find
          </p>
          <input
            type="text"
            placeholder="Search resources..."
            class="smart-search-input"
            :class="{ 'dark-mode-input': isDarkMode }"
          />
          <div class="search-suggestions"></div>
          <div class="search-filters">
            <button :class="{ 'dark-mode-button': isDarkMode }">Search</button>
          </div>
        </div>
      </div>
      <div class="main-content-layout">
        <div class="menu-grid" :class="{ 'dark-mode-grid': isDarkMode }">
          <router-link
            to="/scan-qr"
            class="menu-item"
            :class="{ 'dark-mode-menu-item': isDarkMode }"
          >
            <i class="fas fa-qrcode"></i>
            <span :class="{ 'dark-mode-span': isDarkMode }"
              >QR Code Scanner</span
            >
          </router-link>
          <router-link
            to="/live-view"
            class="menu-item"
            :class="{ 'dark-mode-menu-item': isDarkMode }"
          >
            <i class="fas fa-video"></i>
            <span :class="{ 'dark-mode-span': isDarkMode }">Live View</span>
          </router-link>
          <router-link
            to="/connect-wifi"
            class="menu-item"
            :class="{ 'dark-mode-menu-item': isDarkMode }"
          >
            <i class="fas fa-wifi"></i>
            <span :class="{ 'dark-mode-span': isDarkMode }">Connect WiFi</span>
          </router-link>
          <router-link
            to="/attendance-log"
            class="menu-item"
            :class="{ 'dark-mode-menu-item': isDarkMode }"
          >
            <i class="fas fa-calendar-alt"></i>
            <span :class="{ 'dark-mode-span': isDarkMode }"
              >Attendance Log</span
            >
          </router-link>
          <router-link
            to="/check-availability"
            class="menu-item"
            :class="{ 'dark-mode-menu-item': isDarkMode }"
          >
            <i class="fas fa-search"></i>
            <span :class="{ 'dark-mode-span': isDarkMode }"
              >Check Availability</span
            >
          </router-link>
          <router-link
            to="/open-forum"
            class="menu-item"
            :class="{ 'dark-mode-menu-item': isDarkMode }"
          >
            <i class="fas fa-comments"></i>
            <span :class="{ 'dark-mode-span': isDarkMode }">Open Forums</span>
          </router-link>
          <router-link
            to="/report-issue"
            class="menu-item"
            :class="{ 'dark-mode-menu-item': isDarkMode }"
          >
            <i class="fas fa-exclamation-triangle"></i>
            <span :class="{ 'dark-mode-span': isDarkMode }">Report Issue</span>
          </router-link>
          <router-link
            to="/account-details"
            class="menu-item"
            :class="{ 'dark-mode-menu-item': isDarkMode }"
          >
            <i class="fas fa-user-cog"></i>
            <span :class="{ 'dark-mode-span': isDarkMode }">My Account</span>
          </router-link>
          <router-link
            to="/settings"
            class="menu-item"
            :class="{ 'dark-mode-menu-item': isDarkMode }"
          >
            <i class="fas fa-cog"></i>
            <span :class="{ 'dark-mode-span': isDarkMode }">Settings</span>
          </router-link>
          <router-link
            to="/software-access"
            class="menu-item"
            :class="{ 'dark-mode-menu-item': isDarkMode }"
          >
            <i class="fas fa-laptop-code"></i>
            <span :class="{ 'dark-mode-span': isDarkMode }"
              >Software Access</span
            >
          </router-link>
          <router-link
            to="/printing-services"
            class="menu-item"
            :class="{ 'dark-mode-menu-item': isDarkMode }"
          >
            <i class="fas fa-print"></i>
            <span :class="{ 'dark-mode-span': isDarkMode }"
              >Printing Services</span
            >
          </router-link>
          <router-link
            to="/feedback"
            class="menu-item"
            :class="{ 'dark-mode-menu-item': isDarkMode }"
          >
            <i class="fas fa-comment-dots"></i>
            <span :class="{ 'dark-mode-span': isDarkMode }">Feedback</span>
          </router-link>
          <router-link
            to="/about"
            class="menu-item"
            :class="{ 'dark-mode-menu-item': isDarkMode }"
          >
            <i class="fas fa-info-circle"></i>
            <span :class="{ 'dark-mode-span': isDarkMode }">About</span>
          </router-link>
          <router-link
            to="/log-out"
            class="menu-item"
            :class="{ 'dark-mode-menu-item': isDarkMode }"
          >
            <i class="fas fa-sign-out-alt"></i>
            <span :class="{ 'dark-mode-span': isDarkMode }">Log Out</span>
          </router-link>
        </div>

        <div
          class="announcements-box"
          :class="{ 'dark-mode-announcements': isDarkMode }"
        >
          <h3 :class="{ 'dark-mode-h3': isDarkMode }">Lab Announcements</h3>
          <ul
            class="announcement-list"
            :class="{ 'dark-mode-list': isDarkMode }"
          >
            <li :class="{ 'dark-mode-li': isDarkMode }">
              System downtime scheduled for May 15th, 2:00 PM - 4:00 PM for
              maintenance.
            </li>
            <li :class="{ 'dark-mode-li': isDarkMode }">
              Urgent software update required for Adobe Creative Suite. Please
              update before May 18th.
            </li>
            <li :class="{ 'dark-mode-li': isDarkMode }">
              ICT Lab Room A will be closed for renovation from May 20th to May
              25th.
            </li>
            <li :class="{ 'dark-mode-li': isDarkMode }">
              Notice: One of the high-performance computers in Zone 3 is
              currently experiencing a hardware malfunction. Please avoid using
              it.
            </li>
          </ul>
        </div>

        <div
          class="occupancy-history-box"
          :class="{ 'dark-mode-occupancy': isDarkMode }"
        >
          <h3 :class="{ 'dark-mode-h3': isDarkMode }">Lab Occupancy History</h3>
          <div
            class="occupancy-chart-placeholder"
            :class="{ 'dark-mode-placeholder': isDarkMode }"
          >
            <p :class="{ 'dark-mode-p': isDarkMode }">
              Visual representation of lab occupancy trends will be displayed
              here.
            </p>
            <p :class="{ 'dark-mode-p': isDarkMode }">
              This chart helps you see when the lab is typically busiest.
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import NavigationBar from "./NavigationBar.vue";
import { useDarkMode } from "../composables/useDarkMode";

const { isDarkMode } = useDarkMode();
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
  background-color: #fff; /* Default light background */
  transition: background-color 0.3s ease, color 0.3s ease;
}

body.dark-mode .main-menu-container {
  background-color: #1e1e1e;
  color: #d4d4d4;
}

.main-menu-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3); /* Slightly darken the background */
  transition: background-color 0.3s ease;
}

body.dark-mode .main-menu-overlay {
  background-color: rgba(0, 0, 0, 0.7);
}

.side-navigation {
  background-color: #333;
  color: white;
  width: 200px; /* Adjust as needed */
  padding: 20px;
  z-index: 1; /* Ensure sidebar is above the overlay */
  transition: background-color 0.3s ease, color 0.3s ease;
}

body.dark-mode .side-navigation {
  background-color: #252525;
  color: #d4d4d4;
}

.main-content {
  flex-grow: 1;
  padding: 20px;
  z-index: 1; /* Ensure content is above the overlay */
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: color 0.3s ease;
}

body.dark-mode .main-content {
  color: #d4d4d4;
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
  transition: color 0.3s ease;
}

body.dark-mode h2 {
  color: #6dd5ed;
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
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

body.dark-mode .menu-grid {
  background-color: rgba(40, 40, 40, 0.7);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
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
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out,
    background-color 0.3s ease, color 0.3s ease;
  text-align: center;
  position: relative;
  overflow: hidden;
}

body.dark-mode .menu-item {
  background-color: #444;
  color: #eee;
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
  transition: color 0.3s ease;
}

body.dark-mode .menu-item span {
  color: #f0f0f0;
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

body.dark-mode .menu-item::before {
  background: rgba(80, 80, 80, 0.2);
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
  transition: background-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease;
}

body.dark-mode .announcements-box,
body.dark-mode .occupancy-history-box {
  background-color: rgba(40, 40, 40, 0.7);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  color: #f0f0f0;
}

.announcements-box h3,
.occupancy-history-box h3 {
  color: #333;
  margin-top: 0;
  margin-bottom: 15px;
  text-align: center;
  transition: color 0.3s ease;
}

body.dark-mode .announcements-box h3,
body.dark-mode .occupancy-history-box h3 {
  color: #6dd5ed;
}

.announcement-list {
  list-style: disc;
  padding-left: 20px;
  color: #555;
  transition: color 0.3s ease;
}

body.dark-mode .announcement-list {
  color: #bbb;
}

.announcement-list li {
  margin-bottom: 8px;
  transition: color 0.3s ease;
}

body.dark-mode .announcement-list li {
  color: #eee;
}

.occupancy-chart-placeholder {
  color: #555;
  text-align: center;
  padding: 20px 0;
  border: 1px dashed #ccc;
  border-radius: 8px;
  transition: color 0.3s ease, border-color 0.3s ease;
}

body.dark-mode .occupancy-chart-placeholder {
  color: #bbb;
  border-color: #777;
}

.smart-search-container {
  background-color: rgba(
    255,
    255,
    255,
    0.7
  ); /* Glass effect, reduced opacity */
  border-radius: 8px;
  box-shadow: 0 2px4px rgba(0, 0, 0, 0.1);
  padding: 15px;
  text-align: left; /* Align content to the right */
  display: flex;
  align-items: center;
  gap: 10px; /* Space between elements */
  width: 100%; /* Make it take the full width of its parent */
  transition: background-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease;
}

body.dark-mode .smart-search-container {
  background-color: rgba(40, 40, 40, 0.7);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  color: #f0f0f0;
}

.smart-search-container h3 {
  color: #333;
  margin-top: 0;
  margin-bottom: 0; /* Adjust margin */
  margin-right: auto;
  font-size: 2rem; /* Smaller heading */
  transition: color 0.3s ease;
}

body.dark-mode .smart-search-container h3 {
  color: #6dd5ed;
}

.smart-search-container p {
  color: #555;
  font-size: 0.8rem;
  margin-bottom: 0;
  transition: color 0.3s ease;
}

body.dark-mode .smart-search-container p {
  color: #bbb;
}

.smart-search-input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 0;
  width: 170px; /* Reduced width */
  transition: border-color 0.3s ease, background-color 0.3s ease,
    color 0.3s ease;
}

body.dark-mode .smart-search-input {
  background-color: #444;
  color: #eee;
  border-color: #777;
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

body.dark-mode .search-suggestions {
  background-color: #333;
  border-color: #555;
  color: #f0f0f0;
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
  transition: background-color 0.3s ease, color 0.3s ease,
    border-color 0.3s ease;
}

body.dark-mode .search-filters button {
  background-color: #555;
  color: #eee;
  border-color: #777;
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
  transition: background-color 0.3s ease, color 0.3s ease;
}

body.dark-mode .side-navigation .navigation-bar li a {
  color: #d4d4d4;
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
