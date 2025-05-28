<template>
  <div
    class="check-availability-container"
    :class="{ 'dark-mode': isDarkMode }"
  >
    <div
      class="main-menu-overlay"
      :class="{ 'dark-mode-overlay': isDarkMode }"
    ></div>
    <aside class="side-navigation" :class="{ 'dark-mode': isDarkMode }">
      <NavigationBar />
    </aside>
    <main class="main-content" :class="{ 'dark-mode': isDarkMode }">
      <h2>Check Computer Availability & Reservation</h2>

      <div class="calendar-container" :class="{ 'dark-mode-card': isDarkMode }">
        <div class="month-tabs">
          <div
            v-for="(month, index) in months"
            :key="index"
            class="month-tab"
            :class="{
              active: currentMonth === month,
              'dark-mode-tab': isDarkMode,
              'dark-mode-tab-active': isDarkMode && currentMonth === month,
            }"
            @click="showCalendar(month)"
          >
            {{ month }}
          </div>
        </div>

        <div
          class="calendar-view"
          :class="{ 'dark-mode-calendar-view': isDarkMode }"
        >
          <h3 class="month-header" :class="{ 'dark-mode-header': isDarkMode }">
            {{ currentMonth }} {{ currentYear }}
          </h3>
          <div
            class="days-header"
            :class="{ 'dark-mode-days-header': isDarkMode }"
          >
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
                'past-reservation': isPastReservationDate(date),
                'dark-mode-date-cell': isDarkMode,
                'dark-mode-empty-day': isDarkMode && !date,
                'dark-mode-current-day': isDarkMode && isCurrentDay(date),
                'dark-mode-selected-day': isDarkMode && isSelectedDate(date),
                'dark-mode-has-availability':
                  isDarkMode && date && hasAvailability(date),
                'dark-mode-past-reservation':
                  isDarkMode && isPastReservationDate(date),
              }"
              @click="date && selectDate(date)"
            >
              <span v-if="date">{{ date.getDate() }}</span>
              <span
                v-if="date && hasAvailability(date)"
                class="availability-dot"
                :class="{ 'dark-mode-availability-dot': isDarkMode }"
              ></span>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="selectedDate"
        class="reservation-form"
        :class="{ 'dark-mode-form': isDarkMode }"
      >
        <h3
          v-if="selectedDate >= today"
          :class="{ 'dark-mode-form-header': isDarkMode }"
        >
          Reservation Details for {{ formattedSelectedDate }}
        </h3>
        <template v-if="selectedDate >= today">
          <label for="name" :class="{ 'dark-mode-label': isDarkMode }"
            >Name:</label
          >
          <input
            type="text"
            id="name"
            v-model="name"
            required
            :class="{ 'dark-mode-input': isDarkMode }"
          />

          <label for="startTime" :class="{ 'dark-mode-label': isDarkMode }"
            >Start Time (HH:MM):</label
          >
          <input
            type="time"
            id="startTime"
            v-model="startTime"
            required
            :class="{ 'dark-mode-input': isDarkMode }"
          />
          <div
            class="reservation-note"
            :class="{ 'dark-mode-note': isDarkMode }"
          >
            Reservation will not be lower than current time. Failure to comply
            with the reserved time will result in warnings.
          </div>

          <label for="endTimeOption" :class="{ 'dark-mode-label': isDarkMode }"
            >End Time:</label
          >
          <select
            id="endTimeOption"
            v-model="endTimeOption"
            :class="{ 'dark-mode-select': isDarkMode }"
          >
            <option
              value="specific"
              :class="{ 'dark-mode-option': isDarkMode }"
            >
              Specific Time (HH:MM)
            </option>
            <option
              value="untilDone"
              :class="{ 'dark-mode-option': isDarkMode }"
            >
              Until my work is done
            </option>
          </select>

          <div v-if="endTimeOption === 'specific'">
            <input
              type="time"
              id="endTime"
              v-model="endTime"
              required
              :class="{ 'dark-mode-input': isDarkMode }"
            />
          </div>

          <label for="computer" :class="{ 'dark-mode-label': isDarkMode }"
            >Computer Number:</label
          >
          <select
            id="computer"
            v-model="computer"
            required
            :class="{ 'dark-mode-select': isDarkMode }"
          >
            <option value="" :class="{ 'dark-mode-option': isDarkMode }">
              Select a Computer
            </option>
            <option
              v-for="comp in availableComputersOnDate"
              :key="comp"
              :value="comp"
              :class="{ 'dark-mode-option': isDarkMode }"
            >
              Computer {{ comp }}
            </option>
          </select>

          <button
            type="submit"
            :disabled="
              !selectedDate ||
              !availableComputersOnDate.length ||
              selectedDate < today
            "
            :class="{ 'dark-mode-button': isDarkMode }"
          >
            Reserve
          </button>
          <div
            v-if="selectedDate < today"
            class="past-reservation-note"
            :class="{ 'dark-mode-note': isDarkMode }"
          >
            Note: Reservations cannot be made for past dates.
          </div>
        </template>
        <template v-else-if="pastReservationDetails">
          <h3 :class="{ 'dark-mode-form-header': isDarkMode }">
            Past Reservation Details for {{ formattedSelectedDate }}
          </h3>
          <p :class="{ 'dark-mode-text': isDarkMode }">
            <strong>Name:</strong> {{ pastReservationDetails.name }}
          </p>
          <p :class="{ 'dark-mode-text': isDarkMode }">
            <strong>Computer Reserved:</strong>
            {{ pastReservationDetails.computer }}
          </p>
          <p :class="{ 'dark-mode-text': isDarkMode }">
            <strong>Start Time:</strong> {{ pastReservationDetails.startTime }}
          </p>
          <p :class="{ 'dark-mode-text': isDarkMode }">
            <strong>End Time:</strong>
            {{
              pastReservationDetails.endTime === "Until Done"
                ? "Until work was done"
                : pastReservationDetails.endTime
            }}
          </p>
          <p :class="{ 'dark-mode-text': isDarkMode }">
            <strong>Total Time Used:</strong>
            {{ pastReservationDetails.timeUsed }}
          </p>
          <p :class="{ 'dark-mode-text': isDarkMode }">
            <strong>Time Violated?:</strong>
            {{ pastReservationDetails.violated ? "Yes" : "No" }}
          </p>
        </template>
        <template v-else>
          <h3 :class="{ 'dark-mode-form-header': isDarkMode }">
            Reservation Details for {{ formattedSelectedDate }}
          </h3>
          <div
            class="past-reservation-note"
            :class="{ 'dark-mode-note': isDarkMode }"
          >
            Note: No computer usage recorded for this date.
          </div>
        </template>
      </div>

      <div
        id="confirmation"
        v-if="confirmationMessage"
        :class="{
          error: isError,
          'dark-mode-confirmation': isDarkMode,
          'dark-mode-confirmation-error': isDarkMode && isError,
        }"
      >
        {{ confirmationMessage }}
      </div>

      <div
        v-if="errorMessage"
        class="error-message"
        :class="{ 'dark-mode-error-message': isDarkMode }"
      >
        {{ errorMessage }}
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import NavigationBar from "./NavigationBar.vue";
import { useDarkMode } from "../composables/useDarkMode"; // Import the composable

const { isDarkMode } = useDarkMode(); // Get the isDarkMode ref

// Refs for form inputs and messages
const name = ref("");
const selectedDate = ref(null);
const startTime = ref("");
const endTime = ref("");
const endTimeOption = ref("specific"); // Ref for the selected end time option
const computer = ref("");
const confirmationMessage = ref("");
const isError = ref(false);
const router = useRouter();
const errorMessage = ref("");
const pastReservationDetails = ref(null); // Ref to hold details of past reservations

// Date and Calendar Data
const now = new Date(); // Get current date and time
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Get today's date (without time)
const currentYear = ref(today.getFullYear()); // Ref for the currently displayed year
const currentMonth = ref(
  today.toLocaleString("default", { month: "long" }) // Ref for the currently displayed month (e.g., "May")
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
]); // Array of month names
const daysOfWeek = ref(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]); // Array of day names
const totalComputers = ref(30); // Ref for the total number of computers

// Function to check if a given date is a weekday (Monday to Friday)
const isWeekday = (date) => {
  const day = date.getDay(); // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  return day >= 1 && day <= 5; // Return true if the day is Monday to Friday
};

// Computed property to determine available dates (weekdays for the next 7 days)
const availableDates = computed(() => {
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + i); // Get the date for the next i days
    if (isWeekday(futureDate)) {
      dates.push(
        new Date(
          futureDate.getFullYear(),
          futureDate.getMonth(),
          futureDate.getDate()
        )
      );
    }
  }
  return dates;
});

// Computed property to get available computer numbers for the selected date
const availableComputersOnDate = computed(() => {
  if (selectedDate.value && hasAvailability(selectedDate.value)) {
    return Array.from({ length: totalComputers.value }, (_, i) => i + 1); // Create an array of computer numbers (1 to totalComputers)
  }
  return []; // Return an empty array if no date is selected or no availability
});

// Computed property to format the selected date for display
const formattedSelectedDate = computed(() => {
  return (
    selectedDate.value?.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }) || "" // Format the date as "Month Day, Year" or an empty string if no date is selected
  );
});

// Function to get the number of days in a given month and year
const getDaysInMonth = (month, year) => {
  return new Date(year, months.value.indexOf(month) + 1, 0).getDate(); // The 0th day of the next month gives the last day of the current month
};

// Function to get the day of the week (0-6) of the first day of a given month and year
const getFirstDayOfMonth = (month, year) => {
  return new Date(year, months.value.indexOf(month), 1).getDay();
};

// Function to generate an array of dates for the calendar view
const getDatesInMonth = (month, year) => {
  const days = getDaysInMonth(month, year);
  const firstDay = getFirstDayOfMonth(month, year);
  const dates = [];
  const firstOfMonth = new Date(year, months.value.indexOf(month), 1);

  // Add empty cells for the days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    dates.push(null);
  }

  // Add the dates of the month
  for (let i = 1; i <= days; i++) {
    const currentDate = new Date(year, months.value.indexOf(month), i);
    dates.push(currentDate);
  }

  return dates;
};

// Function to show the calendar for a specific month
const showCalendar = (month) => {
  currentMonth.value = month;
  selectedDate.value = null;
  computer.value = "";
  pastReservationDetails.value = null; // Clear past reservation details when the month changes
};

// Function to check if a given date is the current day
const isCurrentDay = (date) => {
  if (!date) return false;
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

// Function to check if a given date is the currently selected date
const isSelectedDate = (date) => {
  return (
    selectedDate.value &&
    date &&
    date.getDate() === selectedDate.value.getDate() &&
    date.getMonth() === selectedDate.value.getMonth() &&
    date.getFullYear() === selectedDate.value.getFullYear()
  );
};

// Function to check if a given date has general availability for reservations
const hasAvailability = (date) => {
  return availableDates.value.some(
    (d) =>
      d.getDate() === date.getDate() &&
      d.getMonth() === date.getMonth() &&
      d.getFullYear() === date.getFullYear() &&
      d >= today &&
      isWeekday(d)
  );
};

// Function to check if a given date is a specific past date for displaying reservation details
const isPastReservationDate = (date) => {
  const may23_2025 = new Date(2025, 4, 23); // Month is 0-indexed (4 for May)
  return date && date.toDateString() === may23_2025.toDateString();
};

// Function to handle the selection of a date on the calendar
const selectDate = (date) => {
  selectedDate.value = date; // Update the selected date
  pastReservationDetails.value = null; // Clear previous past reservation details

  if (date && isWeekday(date)) {
    if (date >= today) {
      errorMessage.value = "";
    } else {
      errorMessage.value = "Reservations cannot be made for past dates.";
      setTimeout(() => (errorMessage.value = ""), 3000);
      // Simulate fetching past reservation details for May 23rd
      if (isPastReservationDate(date)) {
        pastReservationDetails.value = {
          name: "Kyss Centaur Fuentes",
          computer: "23",
          startTime: "10:00 am",
          endTime: "Until Done",
          timeUsed: "5hrs and 21 mins",
          violated: false,
        };
      }
    }
  } else if (date) {
    errorMessage.value =
      "Reservations are only available from Monday to Friday.";
    setTimeout(() => (errorMessage.value = ""), 3000);
  }
  computer.value = "";
};

// Function to handle the submission of the reservation form
const submitReservation = () => {
  if (
    !name.value ||
    !selectedDate.value ||
    !startTime.value ||
    (endTimeOption.value === "specific" && !endTime.value) ||
    !computer.value
  ) {
    confirmationMessage.value = "Please fill out all reservation details.";
    isError.value = true;
    return;
  }

  // Basic time format validation for specific end time
  if (endTimeOption.value === "specific") {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!timeRegex.test(startTime.value) || !timeRegex.test(endTime.value)) {
      confirmationMessage.value =
        "Invalid time format. Please use HH:MM (24-hour format).";
      isError.value = true;
      return;
    }
  }

  // Time Handling: Ensure start time is not in the past (allowing a 5-minute buffer)
  const selectedStartTime = new Date(selectedDate.value);
  const [startHour, startMinute] = startTime.value.split(":").map(Number);
  selectedStartTime.setHours(startHour, startMinute, 0, 0);

  const nowWithBuffer = new Date();
  nowWithBuffer.setMinutes(nowWithBuffer.getMinutes() - 5); // Allow reservation 5 minutes in the past

  if (selectedStartTime < nowWithBuffer) {
    confirmationMessage.value = "Reservation start time cannot be in the past.";
    isError.value = true;
    return;
  }

  // In a real application, you would send this data to a backend server
  const reservationDetails = {
    name: name.value,
    date: formattedSelectedDate.value,
    startTime: startTime.value,
    endTime: endTimeOption.value === "specific" ? endTime.value : "Until Done",
    computer: computer.value,
    endTimeOption: endTimeOption.value,
  };
  console.log("Reservation Details:", reservationDetails);

  confirmationMessage.value = `Reservation successful! Thank you, ${name.value}. You have reserved computer number ${computer.value} starting at ${startTime.value} on <span class="math-inline">\{formattedSelectedDate\.value\}\. Your end time is set to "</span>{reservationDetails.endTime}".`;
  isError.value = false;

  // Reset form fields
  name.value = "";
  selectedDate.value = null;
  startTime.value = "";
  endTime.value = "";
  endTimeOption.value = "specific";
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
  background-color: #fff; /* Default light background */
  transition: background-color 0.3s ease, color 0.3s ease;
}

body.dark-mode .check-availability-container {
  background-color: #1e1e1e;
  color: #d4d4d4;
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
  background-color: rgba(0, 0, 0, 0.7);
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
  padding: 30px;
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
  margin-bottom: 25px;
  font-size: 1.8rem;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  transition: color 0.3s ease;
}

body.dark-mode h2 {
  color: #6dd5ed;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
}

.calendar-container {
  width: 90%;
  max-width: 900px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  margin-bottom: 25px;
  transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
}

body.dark-mode .calendar-container {
  background-color: rgba(40, 40, 40, 0.9);
  color: #f0f0f0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
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
  transition: all 0.2s ease, background-color 0.3s ease, color 0.3s ease;
}

.month-tab:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

.month-tab.active {
  background-color: #004494;
  font-weight: bold;
}

body.dark-mode .month-tab {
  background-color: #3a86ff;
  color: #f8f8f2;
}

body.dark-mode .month-tab:hover {
  background-color: #2c69d9;
}

body.dark-mode .month-tab.active {
  background-color: #1e3a8a;
  color: #fff;
}

.calendar-view {
  width: 100%;
  transition: color 0.3s ease;
}

body.dark-mode .calendar-view {
  color: #f0f0f0;
}

.month-header {
  text-align: center;
  margin-bottom: 15px;
  color: #333;
  font-size: 1.3rem;
  transition: color 0.3s ease;
}

body.dark-mode .month-header {
  color: #f0f0f0;
}

.days-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 10px;
  transition: color 0.3s ease;
}

body.dark-mode .days-header {
  color: #bbb;
}

.day-header {
  text-align: center;
  font-weight: bold;
  color: #555;
  padding: 5px;
  transition: color 0.3s ease;
}

body.dark-mode .day-header {
  color: #eee;
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
  transition: all 0.2s ease, background-color 0.3s ease, color 0.3s ease,
    border-color 0.3s ease;
  position: relative;
  padding: 5px;
  color: #333;
}

.date-cell:hover:not(.empty-day) {
  background-color: #e9ecef;
  transform: scale(1.05);
}

.empty-day {
  background-color: transparent;
  cursor: default;
  color: transparent;
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

body.dark-mode .date-cell {
  background-color: #333;
  color: #d4d4d4;
}

body.dark-mode .date-cell:hover:not(.empty-day) {
  background-color: #555;
}

body.dark-mode .empty-day {
  background-color: transparent;
  color: transparent;
}

body.dark-mode .current-day {
  border-color: #98c379;
  color: #98c379; /* Keep text color for current day visible */
}

body.dark-mode .selected-day {
  background-color: #3a86ff;
  color: #f8f8f2;
}

body.dark-mode .has-availability::after {
  background-color: #98c379;
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
  transition: background-color 0.3s ease, color 0.3s ease,
    border-color 0.3s ease, box-shadow 0.3s ease;
}

body.dark-mode .reservation-form {
  background-color: rgba(40, 40, 40, 0.9);
  color: #f0f0f0;
  border-color: #555;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.reservation-form label {
  margin-bottom: 8px;
  display: block;
  color: #555;
  transition: color 0.3s ease;
}

body.dark-mode .reservation-form label {
  color: #bbb;
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
  transition: background-color 0.3s ease, color 0.3s ease,
    border-color 0.3s ease;
}

body.dark-mode .reservation-form input[type="text"],
body.dark-mode .reservation-form input[type="date"],
body.dark-mode .reservation-form input[type="time"],
body.dark-mode .reservation-form select {
  background-color: #444;
  color: #d4d4d4;
  border-color: #666;
}

.reservation-form option {
  background-color: #fff;
  color: #333;
}

body.dark-mode .reservation-form option {
  background-color: #333;
  color: #f0f0f0;
}

.reservation-form button[type="submit"] {
  background-color: #4caf50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.reservation-form button[type="submit"]:hover {
  background-color: #45a049;
}

body.dark-mode .reservation-form button[type="submit"] {
  background-color: #98c379;
  color: #282c34;
}

body.dark-mode .reservation-form button[type="submit"]:hover {
  background-color: #7bbd61;
}

.reservation-form button[type="submit"]:disabled {
  background-color: #ccc;
  cursor: not-allowed;
  color: #888;
}

body.dark-mode .reservation-form button[type="submit"]:disabled {
  background-color: #555;
  color: #bbb;
}

#confirmation {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
  transition: background-color 0.3s ease, color 0.3s ease,
    border-color 0.3s ease;
}

body.dark-mode #confirmation {
  background-color: #333;
  color: #f0f0f0;
  border-color: #555;
}

#confirmation.error {
  border-color: #f44336;
  background-color: #ffebee;
  color: #f44336;
}

body.dark-mode #confirmation.error {
  border-color: #a71d2a;
  background-color: #6a1a21;
  color: #f8d7da;
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
  transition: background-color 0.3s ease, color 0.3s ease,
    border-color 0.3s ease;
}

body.dark-mode .error-message {
  background-color: #a71d2a;
  color: #f8d7da;
  border-color: #842029;
}

.reservation-note {
  font-size: 0.8em;
  color: #777;
  margin-top: -10px;
  margin-bottom: 10px;
  font-style: italic;
  transition: color 0.3s ease;
}

body.dark-mode .reservation-note {
  color: #bbb;
}

.past-reservation-details {
  width: 90%;
  max-width: 600px;
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #aaa;
  border-radius: 5px;
  background-color: rgba(245, 245, 245, 0.9);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.05);
  transition: background-color 0.3s ease, color 0.3s ease,
    border-color 0.3s ease, box-shadow 0.3s ease;
}

body.dark-mode .past-reservation-details {
  background-color: rgba(40, 40, 40, 0.9);
  color: #f0f0f0;
  border-color: #555;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}

.past-reservation-details h3 {
  color: #333;
  margin-top: 0;
  margin-bottom: 15px;
  text-align: center;
  transition: color 0.3s ease;
}

body.dark-mode .past-reservation-details h3 {
  color: #f0f0f0;
}

.past-reservation-details p {
  margin-bottom: 8px;
  color: #555;
  transition: color 0.3s ease;
}

body.dark-mode .past-reservation-details p {
  color: #d4d4d4;
}

.past-reservation-note {
  color: #d32f2f;
  font-size: 0.9em;
  margin-top: 5px;
  transition: color 0.3s ease;
}

body.dark-mode .past-reservation-note {
  color: #f44336;
}

.date-cell.past-reservation {
  background-color: #fdd; /* Indicate a past reservation date visually */
}

body.dark-mode .date-cell.past-reservation {
  background-color: #6a1a21;
  color: #f8d7da;
}

.date-cell.selected-day {
  background-color: #007bff; /* Keep the blue highlight for selected dates */
  color: white;
  font-weight: bold;
}

body.dark-mode .date-cell.selected-day {
  background-color: #3a86ff;
  color: #f8f8f2;
}

.reservation-form.view-only input,
.reservation-form.view-only select,
.reservation-form.view-only button {
  background-color: #eee;
  border-color: #ddd;
  color: #777;
  cursor: not-allowed;
}

body.dark-mode .reservation-form.view-only input,
body.dark-mode .reservation-form.view-only select,
body.dark-mode .reservation-form.view-only button {
  background-color: #555;
  border-color: #777;
  color: #bbb;
}

.reservation-form.view-only button:hover {
  background-color: #eee;
}

body.dark-mode .reservation-form.view-only button:hover {
  background-color: #555;
}

.availability-dot {
  position: absolute;
  bottom: 5px;
  width: 6px;
  height: 6px;
  background-color: #28a745;
  border-radius: 50%;
}

body.dark-mode .availability-dot {
  background-color: #98c379;
}
</style>
