<template>
  <div id="app" :class="[fontSizeClass, { 'dark-mode': isDarkMode }]">
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import { useDarkMode } from "./composables/useDarkMode";
import { useFontSize } from "./composables/useFontSize"; // Import the font size composable

const { isDarkMode } = useDarkMode();
const { fontSizeClass } = useFontSize(); // Get the font size class
</script>

<style>
body {
  transition: background-color 0.3s ease, color 0.3s ease;
}
body.dark-mode {
  background-color: #1a1a1a; /* Example dark background */
  color: #e0e0e0; /* Example light text */
}

/* Global font size styles */
.font-small {
  font-size: 0.85rem;
}

.font-medium {
  font-size: 1rem; /* Default */
}

.font-large {
  font-size: 1.15rem; /* Slightly adjusted for better scaling */
}

/* You can also target elements inside #app if needed */
</style>
