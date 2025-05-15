<template>
  <div class="about-container">
    <div class="main-menu-overlay"></div>
    <aside class="side-navigation">
      <NavigationBar />
    </aside>
    <main class="main-content">
      <h2>About QR Code Scanning in ICT Library Office</h2>
      <div class="content-card">
        <section class="about-section">
          <h3>Our Mission</h3>
          <p>
            Our mission is to revolutionize library management and enhance user
            experience through the implementation of cutting-edge QR code
            technology. We strive to provide efficient solutions that simplify
            access to resources, streamline operations, and foster a more
            connected library community.
          </p>
          <p>
            We are committed to empowering libraries with tools that not only
            meet the evolving needs of their patrons but also promote
            sustainable practices and innovation in library services.
          </p>
        </section>

        <section class="about-section">
          <h3>Key Benefits</h3>
          <ul class="benefits-list">
            <li>
              <i class="fas fa-check-circle"></i> Efficient resource tracking
              and management
            </li>
            <li>
              <i class="fas fa-check-circle"></i> Enhanced accessibility to
              library resources
            </li>
            <li>
              <i class="fas fa-check-circle"></i> Streamlined borrowing and
              returning process
            </li>
            <li>
              <i class="fas fa-check-circle"></i> Real-time availability updates
              for library assets
            </li>
            <li>
              <i class="fas fa-check-circle"></i> Personalized recommendations
              for patrons
            </li>
            <li>
              <i class="fas fa-check-circle"></i> Intuitive user interface for
              easy navigation
            </li>
          </ul>
        </section>

        <section class="about-section owner-section">
          <h3>Owner</h3>
          <div class="owner-card">
            <img
              :src="kyssImage"
              alt="Kyss Centaur Fuentes"
              class="owner-image"
            />
            <div class="owner-details">
              <h4>Kyss Centaur Fuentes</h4>
              <p>Project Leader & Developer</p>
            </div>
          </div>
        </section>
      </div>

      <footer class="content-footer">
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
}

.main-menu-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
}

.side-navigation {
  background-color: #333;
  color: white;
  width: 200px;
  padding: 20px;
  z-index: 1;
}

.main-content {
  flex-grow: 1;
  padding: 20px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h2 {
  color: white;
  text-align: center;
  margin-bottom: 20px;
}

.content-card {
  width: 90%;
  max-width: 800px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  margin-bottom: 20px;
}

.about-section {
  margin-bottom: 25px;
}

.about-section h3 {
  color: #008000;
  margin-bottom: 15px;
  font-size: 1.3rem;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 8px;
}

.about-section p {
  line-height: 1.6;
  margin-bottom: 15px;
  text-align: justify;
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
}

.benefits-list i {
  color: #008000;
  position: absolute;
  left: 0;
  top: 3px;
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
}

.owner-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
  border: 3px solid #008000;
}

.owner-details h4 {
  margin: 0 0 5px 0;
  color: #333;
}

.owner-details p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.content-footer {
  text-align: center;
  padding: 15px;
  color: white;
  font-size: 0.9rem;
  width: 100%;
  max-width: 800px;
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
