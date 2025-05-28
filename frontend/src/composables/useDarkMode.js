// src/composables/useDarkMode.js
import { ref, watch } from "vue";

// isDarkMode will hold the current dark mode state
// It's initialized by checking localStorage
const isDarkMode = ref(localStorage.getItem("darkMode") === "true");

// This watch effect runs whenever isDarkMode changes
watch(
  isDarkMode,
  (newValue) => {
    // Save the new value to localStorage for persistence
    localStorage.setItem("darkMode", newValue);
    // Toggle the 'dark-mode' class on the <body> element
    // This is crucial for global styling
    document.body.classList.toggle("dark-mode", newValue);
  },
  { immediate: true }
); // 'immediate: true' makes the watch run once immediately on component mount/app load

// Export the composable function
export function useDarkMode() {
  return {
    isDarkMode, // Return the reactive state
  };
}
