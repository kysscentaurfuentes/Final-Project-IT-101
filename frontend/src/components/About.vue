<template>
  <div class="about-container" :class="{ 'dark-mode': isDarkMode }">
    <div
      class="main-menu-overlay"
      :class="{ 'dark-mode-overlay': isDarkMode }"
    ></div>
    <aside class="side-navigation" :class="{ 'dark-mode': isDarkMode }">
      <NavigationBar />
    </aside>
    <main class="main-content" :class="{ 'dark-mode': isDarkMode }">
      <h2>About QR Code Scanning in ICT Library Office</h2>
      <div class="content-card" :class="{ 'dark-mode-card': isDarkMode }">
        <section
          class="about-section"
          :class="{ 'dark-mode-section': isDarkMode }"
        >
          <h3>Our Mission</h3>
          <p :class="{ 'dark-mode-text': isDarkMode }">
            Our mission is to revolutionize library management and enhance user
            experience through the implementation of cutting-edge QR code
            technology. We strive to provide efficient solutions that simplify
            access to resources, streamline operations, and foster a more
            connected library community.
          </p>
          <p :class="{ 'dark-mode-text': isDarkMode }">
            We are committed to empowering libraries with tools that not only
            meet the evolving needs of their patrons but also promote
            sustainable practices and innovation in library services.
          </p>
        </section>

        <section
          class="about-section"
          :class="{ 'dark-mode-section': isDarkMode }"
        >
          <h3>Key Benefits</h3>
          <ul class="benefits-list">
            <li :class="{ 'dark-mode-list-item': isDarkMode }">
              <i class="fas fa-check-circle"></i> Efficient resource tracking
              and management
            </li>
            <li :class="{ 'dark-mode-list-item': isDarkMode }">
              <i class="fas fa-check-circle"></i> Enhanced accessibility to
              library resources
            </li>
            <li :class="{ 'dark-mode-list-item': isDarkMode }">
              <i class="fas fa-check-circle"></i> Streamlined borrowing and
              returning process
            </li>
            <li :class="{ 'dark-mode-list-item': isDarkMode }">
              <i class="fas fa-check-circle"></i> Real-time availability updates
              for library assets
            </li>
            <li :class="{ 'dark-mode-list-item': isDarkMode }">
              <i class="fas fa-check-circle"></i> Personalized recommendations
              for patrons
            </li>
            <li :class="{ 'dark-mode-list-item': isDarkMode }">
              <i class="fas fa-check-circle"></i> Intuitive user interface for
              easy navigation
            </li>
          </ul>
        </section>

        <section
          class="about-section owner-section"
          :class="{ 'dark-mode-section': isDarkMode }"
        >
          <h3>Author</h3>
          <div
            class="owner-card"
            :class="{ 'dark-mode-owner-card': isDarkMode }"
          >
            <img
              :src="kyssImage"
              alt="Kyss Centaur Fuentes"
              class="owner-image"
            />
            <div
              class="owner-details"
              :class="{ 'dark-mode-owner-details': isDarkMode }"
            >
              <h4>Kyss Centaur Fuentes</h4>
              <p>Project Leader & Developer</p>
            </div>
          </div>
        </section>
      </div>

      <footer
        class="content-footer"
        :class="{ 'dark-mode-footer': isDarkMode }"
      >
        <p>
          &copy; 2025 QR Code Scanning in ICT Library Office. All rights
          reserved.
        </p>
      </footer>
    </main>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import kyssImage from "../assets/images/Kyss.jpg";
import NavigationBar from "./NavigationBar.vue";
import { useDarkMode } from "../composables/useDarkMode"; // Import the composable

const { isDarkMode } = useDarkMode(); // Get the isDarkMode ref
</script>

<style scoped>
.about-container {
  display: flex;
  font-family: Arial, sans-serif;
  min-height: 100vh;
  background-image: url("../assets/images/csu library entrance(4).jpg");
  background-size: cover;
  background-position: center;
  position: relative;
  transition: background-color 0.3s ease; /* For potential background color change in dark mode */
}

body.dark-mode .about-container {
  background-color: #1e1e1e; /* Dark background color */
  background-image: none; /* Optionally remove the background image in dark mode */
  color: #d4d4d4; /* Default text color in dark mode */
}

.main-menu-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s ease;
}

body.dark-mode .main-menu-overlay {
  background-color: rgba(0, 0, 0, 0.7); /* Darker overlay in dark mode */
}

.side-navigation {
  background-color: #333;
  color: white;
  width: 200px;
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
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: color 0.3s ease;
}

body.dark-mode .main-content {
  color: #d4d4d4;
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

.content-card {
  width: 90%;
  max-width: 800px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  margin-bottom: 20px;
  transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
}

body.dark-mode .content-card {
  background-color: rgba(40, 40, 40, 0.9);
  color: #f0f0f0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}

.about-section {
  margin-bottom: 25px;
  transition: color 0.3s ease;
}

body.dark-mode .about-section {
  color: #f0f0f0;
}

.about-section h3 {
  color: #008000;
  margin-bottom: 15px;
  font-size: 1.3rem;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 8px;
  transition: color 0.3s ease, border-color 0.3s ease;
}

body.dark-mode .about-section h3 {
  color: #98c379; /* A different accent color for dark mode */
  border-color: #555;
}

.about-section p {
  line-height: 1.6;
  margin-bottom: 15px;
  text-align: justify;
  transition: color 0.3s ease;
}

body.dark-mode .about-section p {
  color: #d4d4d4;
}

.benefits-list {
  list-style: none;
  padding-left: 0;
}

.benefits-list li {
  margin-bottom: 10px;
  padding-left: 25px;
  position: relative;
  line-height: 1.5;
  transition: color 0.3s ease;
}

body.dark-mode .benefits-list li {
  color: #d4d4d4;
}

.benefits-list i {
  color: #008000;
  position: absolute;
  left: 0;
  top: 3px;
  transition: color 0.3s ease;
}

body.dark-mode .benefits-list i {
  color: #98c379;
}

.owner-section {
  text-align: center;
}

.owner-card {
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 15px;
  max-width: 400px;
  margin: 0 auto;
  transition: background-color 0.3s ease, color 0.3s ease,
    border-color 0.3s ease;
}

body.dark-mode .owner-card {
  background-color: #444;
  color: #f0f0f0;
  border: 1px solid #555;
}

.owner-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
  border: 3px solid #008000;
  transition: border-color 0.3s ease;
}

body.dark-mode .owner-image {
  border-color: #98c379;
}

.owner-details h4 {
  margin: 0 0 5px 0;
  color: #333;
  transition: color 0.3s ease;
}

body.dark-mode .owner-details h4 {
  color: #f0f0f0;
}

.owner-details p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

body.dark-mode .owner-details p {
  color: #bbb;
}

.content-footer {
  text-align: center;
  padding: 15px;
  color: white;
  font-size: 0.9rem;
  width: 100%;
  max-width: 800px;
  background-color: white(
    0,
    0,
    0,
    0.5
  ); /* Slightly transparent dark background for footer */
  transition: background-color 0.3s ease, color 0.3s ease;
}

body.dark-mode .content-footer {
  background-color: #252525;
  color: #d4d4d4;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .owner-card {
    flex-direction: column;
    text-align: center;
  }

  .owner-image {
    margin-right: 0;
    margin-bottom: 15px;
  }
}
</style>
