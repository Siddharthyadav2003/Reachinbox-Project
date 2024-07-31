'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode

  useEffect(() => {
    // Apply the theme class to the body when the theme changes
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
  }, [isDarkMode]);

  const login = (userData) => {
    setUser(userData);
    // Here you would typically store the user data in localStorage or a secure cookie
  };

  const logout = () => {
    setUser(null);
    // Clear user data from storage
  };

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <AppContext.Provider value={{ user, login, logout, isDarkMode, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);