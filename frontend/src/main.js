import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // Import the router
import { useDarkMode } from "./composables/useDarkMode"; // <-- Import your composable here
import "@fortawesome/fontawesome-free/css/all.min.css";

const app = createApp(App);
// Initialize the dark mode composable
// This will run the watch effect and apply the initial dark-mode class to <body>
const { isDarkMode } = useDarkMode();

// You can optionally provide it globally if other components need to directly access it
// without calling useDarkMode() themselves.
// For simple dark mode, just applying to <body> might be enough,
// but providing it can be useful for more complex scenarios or if you want to
// read the state directly in deeply nested components.
app.provide("isDarkMode", isDarkMode);

app.use(router); // Assuming you're using Vue Router
// app.use(store); // If you have a Vuex store, add it here

app.mount("#app");
