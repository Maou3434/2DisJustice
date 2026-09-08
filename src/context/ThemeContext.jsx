import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext({
  theme: 'tsushima',
  toggleTheme: () => {},
  setTheme: () => {}
});

export const ThemeProvider = ({ children }) => {
  const theme = 'tsushima';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'tsushima');
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme: () => {}, setTheme: () => {} }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
