"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Create a context for theme
const ThemeContext = createContext();

// Theme provider component
export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize theme from localStorage on component mount
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    const initialMode = savedMode === "true";
    setIsDarkMode(initialMode);

    // Apply theme class to document
    if (initialMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    // Save to localStorage
    localStorage.setItem("darkMode", newMode.toString());

    // Apply to document element for global styling
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Context value
  const value = {
    isDarkMode,
    toggleDarkMode,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// Custom hook to use the theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
