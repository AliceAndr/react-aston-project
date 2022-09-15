import React, { useState } from "react";
import { PropsWithChildren } from 'react';

type Theme = string;
type ThemeContextType = { theme: Theme; toggleTheme: () => void };

export const ThemeContext = React.createContext<ThemeContextType>({} as ThemeContextType);

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("dark");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const backgroundColor = theme === "dark" ? "rgba(26, 26, 26, 0.8)" : "#fff";
  document.body.style.backgroundColor = backgroundColor;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
