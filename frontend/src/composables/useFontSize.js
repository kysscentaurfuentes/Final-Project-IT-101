import { ref, computed } from "vue";

const defaultFontSize = localStorage.getItem("fontSize") || "medium";
const fontSize = ref(defaultFontSize);

const fontSizeClass = computed(() => {
  return `font-${fontSize.value}`;
});

const setFontSize = (newSize) => {
  fontSize.value = newSize;
  localStorage.setItem("fontSize", newSize); // Save to localStorage
};

export function useFontSize() {
  return {
    fontSize,
    fontSizeClass,
    setFontSize,
  };
}
