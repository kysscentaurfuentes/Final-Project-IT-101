<template>
  <div class="check-availability-container">
    <div class="main-menu-overlay"></div>
    <aside class="side-navigation">
      <NavigationBar />
    </aside>
    <main class="main-content">
      <h2>Check Computer Availability & Reservation</h2>

      <div class="calendar-container">
        <div class="month-tabs">
          <div
            v-for="(month, index) in months"
            :key="index"
            class="month-tab"
            :class="{ active: currentMonth === month }"
            @click="showCalendar(month)"
          >
            {{ month }}
          </div>
        </div>

        <div class="calendar-view">
          <h3 class="month-header">{{ currentMonth }} {{ currentYear }}</h3>
          <div class="days-header">
            <div v-for="day in daysOfWeek" :key="day" class="day-header">
              {{ day }}
            </div>
          </div>
          <div class="dates-grid">
            <div
              v-for="(date, index) in getDatesInMonth(
                currentMonth,
                currentYear
              )"
              :key="index"
              class="date-cell"
              :class="{
                'empty-day': !date,
                'current-day': isCurrentDay(date),
                'selected-day': isSelectedDate(date),
                'has-availability': date && hasAvailability(date),
              }"
              @click="date && selectDate(date)"
            >
              <span v-if="date">{{ date.getDate() }}</span>
              <span
                v-if="date && hasAvailability(date)"
                class="availability-dot"
              ></span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="selectedDate" class="reservation-form">
        <h3>Reservation Details for {{ formattedSelectedDate }}</h3>
        <form id="reservationForm" @submit.prevent="submitReservation">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="name" required />

          <label for="startTime">Start Time (HH:MM):</label>
          <input type="time" id="startTime" v-model="startTime" required />

          <label for="endTime">End Time (HH:MM):</label>
          <input type="time" id="endTime" v-model="endTime" required />

          <label for="computer">Computer Number:</label>
          <select id="computer" v-model="computer" required>
            <option value="">Select a Computer</option>
            <option
              v-for="comp in availableComputersOnDate"
              :key="comp"
              :value="comp"
            >
              Computer {{ comp }}
            </option>
          </select>

          <button
            type="submit"
            :disabled="!selectedDate || !availableComputersOnDate.length"
          >
            Reserve
          </button>
        </form>
      </div>

      <div
        id="confirmation"
        v-if="confirmationMessage"
        :class="{ error: isError }"
      >
        {{ confirmationMessage }}
      </div>

      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import NavigationBar from "./NavigationBar.vue";

const name = ref("");
const selectedDate = ref(null);
const startTime = ref("");
const endTime = ref("");
const computer = ref("");
const confirmationMessage = ref("");
const isError = ref(false);
const router = useRouter();
const errorMessage = ref("");

// Calendar Data
const currentYear = ref(new Date().getFullYear());
const currentMonth = ref(
  new Date().toLocaleString("default", { month: "long" })
);
const months = ref([
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]);
const daysOfWeek = ref(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);
const totalComputers = ref(30);

// Simulated availability data (now based on dates only for simplicity)
const availableDates = computed(() => {
  const dates = [];
  const daysInMonth = getDaysInMonth(currentMonth.value, currentYear.value);
  for (let i = 1; i <= daysInMonth; i++) {
    if (Math.random() > 0.6) {
      // Adjust probability
      dates.push(
        new Date(currentYear.value, months.value.indexOf(currentMonth.value), i)
      );
    }
  }
  return dates;
});

const availableComputersOnDate = computed(() => {
  if (selectedDate.value && hasAvailability(selectedDate.value)) {
    return Array.from({ length: totalComputers.value }, (_, i) => i + 1);
  }
  return [];
});

const formattedSelectedDate = computed(() => {
  return (
    selectedDate.value?.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }) || ""
  );
});

const getDaysInMonth = (month, year) => {
  return new Date(year, months.value.indexOf(month) + 1, 0).getDate();
};

const getFirstDayOfMonth = (month, year) => {
  return new Date(year, months.value.indexOf(month), 1).getDay();
};

const getDatesInMonth = (month, year) => {
  const days = getDaysInMonth(month, year);
  const firstDay = getFirstDayOfMonth(month, year);
  const dates = [];

  for (let i = 0; i < firstDay; i++) {
    dates.push(null);
  }

  for (let i = 1; i <= days; i++) {
    dates.push(new Date(year, months.value.indexOf(month), i));
  }

  return dates;
};

const showCalendar = (month) => {
  currentMonth.value = month;
  selectedDate.value = null;
  computer.value = "";
};

const isCurrentDay = (date) => {
  if (!date) return false;
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

const isSelectedDate = (date) => {
  return (
    selectedDate.value &&
    date &&
    date.getDate() === selectedDate.value.getDate() &&
    date.getMonth() === selectedDate.value.getMonth() &&
    date.getFullYear() === selectedDate.value.getFullYear()
  );
};

const hasAvailability = (date) => {
  return availableDates.value.some(
    (d) =>
      d.getDate() === date.getDate() &&
      d.getMonth() === date.getMonth() &&
      d.getFullYear() === date.getFullYear()
  );
};

const selectDate = (date) => {
  if (hasAvailability(date)) {
    selectedDate.value = date;
    errorMessage.value = "";
  } else if (date) {
    errorMessage.value =
      "No computers are generally available on this date. Please select another date.";
    setTimeout(() => (errorMessage.value = ""), 3000);
    selectedDate.value = null;
    computer.value = "";
  }
};

const submitReservation = () => {
  if (
    !name.value ||
    !selectedDate.value ||
    !startTime.value ||
    !endTime.value ||
    !computer.value
  ) {
    confirmationMessage.value = "Please fill out all reservation details.";
    isError.value = true;
    return;
  }

  // Basic time format validation (you might want more robust validation)
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  if (!timeRegex.test(startTime.value) || !timeRegex.test(endTime.value)) {
    confirmationMessage.value =
      "Invalid time format. Please use HH:MM (24-hour format).";
    isError.value = true;
    return;
  }

  // In a real application, you would send this data to a backend server
  console.log("Reservation Details:", {
    name: name.value,
    date: formattedSelectedDate.value,
    startTime: startTime.value,
    endTime: endTime.value,
    computer: computer.value,
  });

  confirmationMessage.value = `Reservation successful! Thank you, ${name.value}. You have reserved computer number ${computer.value} from ${startTime.value} to ${endTime.value} on ${formattedSelectedDate.value}.`;
  isError.value = false;

  // Reset form fields
  name.value = "";
  selectedDate.value = null;
  startTime.value = "";
  endTime.value = "";
  computer.value = "";
};
</script>

<style scoped>
/* ... (Combined styles from both components - adjust as needed) ... */
.check-availability-container {
  display: flex;
  min-height: 100vh;
  font-family: Arial, sans-serif;
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
  padding: 30px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h2 {
  color: white;
  text-align: center;
  margin-bottom: 25px;
  font-size: 1.8rem;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}

.calendar-container {
  width: 90%;
  max-width: 900px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  margin-bottom: 25px;
}

.month-tabs {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
  margin-bottom: 20px;
}

.month-tab {
  padding: 10px 5px;
  background-color: #007bff;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  text-align: center;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.month-tab:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

.month-tab.active {
  background-color: #004494;
  font-weight: bold;
}

.calendar-view {
  width: 100%;
}

.month-header {
  text-align: center;
  margin-bottom: 15px;
  color: #333;
  font-size: 1.3rem;
}

.days-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 10px;
}

.day-header {
  text-align: center;
  font-weight: bold;
  color: #555;
  padding: 5px;
}

.dates-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
}

.date-cell {
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  padding: 5px;
}

.date-cell:hover:not(.empty-day) {
  background-color: #e9ecef;
  transform: scale(1.05);
}

.empty-day {
  background-color: transparent;
  cursor: default;
}

.current-day {
  border: 2px solid #28a745;
}

.selected-day {
  background-color: #007bff;
  color: white;
  font-weight: bold;
}

.has-availability::after {
  content: "";
  position: absolute;
  bottom: 5px;
  width: 6px;
  height: 6px;
  background-color: #28a745;
  border-radius: 50%;
}

.reservation-form {
  width: 90%;
  max-width: 600px;
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.reservation-form label {
  margin-bottom: 8px;
  display: block;
  color: #555;
}

.reservation-form input[type="text"],
.reservation-form input[type="date"],
.reservation-form input[type="time"],
.reservation-form select {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.reservation-form button[type="submit"] {
  background-color: #4caf50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.reservation-form button[type="submit"]:hover {
  background-color: #45a049;
}

.reservation-form button[type="submit"]:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

#confirmation {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
}

#confirmation.error {
  border-color: #f44336;
  background-color: #ffebee;
  color: #f44336;
}

.error-message {
  padding: 15px;
  background-color: #f8d7da;
  color: #721c24;
  border-radius: 6px;
  margin-top: 15px;
  max-width: 900px;
  width: 90%;
  text-align: center;
}

@media (max-width: 768px) {
  .month-tabs {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
