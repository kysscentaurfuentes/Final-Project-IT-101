<template>
  <div class="check-availability-container">
    <div class="main-menu-overlay"></div>
    <aside class="side-navigation">
      <NavigationBar />
    </aside>
    <main class="main-content">
      <h2>Check Library Visit Log</h2>

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
          <div class="month-navigation">
            <button @click="prevYear" class="month-arrow">&lt;&lt;</button>
            <button @click="prevMonth" class="month-arrow">&lt;</button>
            <h3 class="month-header">
              <span
                @click="showMonthSelect = !showMonthSelect"
                class="month-select-trigger"
              >
                {{ currentMonth }} {{ currentYear }}
              </span>
            </h3>
            <button @click="nextMonth" class="month-arrow">&gt;</button>
            <button @click="nextYear" class="month-arrow">&gt;&gt;</button>
          </div>
          <div v-if="showMonthSelect" class="month-dropdown">
            <div
              v-for="(month, index) in months"
              :key="index"
              @click="selectMonth(month)"
              class="month-dropdown-item"
            >
              {{ month }}
            </div>
          </div>
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
              }"
              @click="date && selectDate(date)"
            >
              <span v-if="date">{{ date.getDate() }}</span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="selectedDate" class="visit-log">
        <p>
          Visited Library at:
          {{
            selectedDate.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
            })
          }}
        </p>
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

const selectedDate = ref(null);
const errorMessage = ref("");
const router = useRouter();

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
const showMonthSelect = ref(false);

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
  showMonthSelect.value = false;
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

const selectDate = (date) => {
  selectedDate.value = date;
  if (date) {
    errorMessage.value = ""; // Clear any previous error
  }
};

const prevMonth = () => {
  const current = new Date(
    currentYear.value,
    months.value.indexOf(currentMonth.value),
    1
  );
  current.setMonth(current.getMonth() - 1);
  currentYear.value = current.getFullYear();
  currentMonth.value = months.value[current.getMonth()];
  showMonthSelect.value = false;
};

const nextMonth = () => {
  const current = new Date(
    currentYear.value,
    months.value.indexOf(currentMonth.value),
    1
  );
  current.setMonth(current.getMonth() + 1);
  currentYear.value = current.getFullYear();
  currentMonth.value = months.value[current.getMonth()];
  showMonthSelect.value = false;
};

const prevYear = () => {
  currentYear.value -= 1;
  showMonthSelect.value = false;
};

const nextYear = () => {
  currentYear.value += 1;
  showMonthSelect.value = false;
};

const selectMonth = (month) => {
  currentMonth.value = month;
  showMonthSelect.value = false;
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
  cursor: pointer;
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

.visit-log {
  width: 90%;
  max-width: 600px;
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-size: 1.1rem;
  color: #333;
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

/* New styles for month navigation */
.month-navigation {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  gap: 10px;
}

.month-navigation button {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.month-navigation button:hover {
  background-color: #0056b3;
}

.month-select-trigger {
  cursor: pointer;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #f0f0f0;
}

.month-dropdown {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 2;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  max-height: 200px;
  overflow-y: auto;
  margin-top: 10px;
}

.month-dropdown-item {
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  text-align: center;
}

.month-dropdown-item:hover {
  background-color: #f0f0f0;
}
</style>
