import React, { createContext, useContext, useEffect, useState } from 'react';

/**
 * Context type definition for theme management
 */
type ThemeContextType = {
  /** Current dark mode state */
  isDarkMode: boolean;
  /** Function to toggle between light and dark modes */
  toggleDarkMode: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Provider component for managing application theme state
 *
 * Features:
 * - Persistent theme storage in localStorage
 * - System theme preference detection
 * - Smooth transition animations
 * - Automatic class management
 *
 * Theme Management:
 * - Detects and applies system preference
 * - Persists user preference
 * - Handles theme transitions
 * - Manages dark mode classes
 *
 * @param props - Component properties
 * @param props.children - Child components to wrap with theme context
 * @returns The theme provider component
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    // Add the style element for transitions
    const style = document.createElement('style');
    style.innerHTML = `
      * {
        transition: background-color 0.3s ease,
                    color 0.3s ease,
                    border-color 0.3s ease,
                    fill 0.3s ease !important;
      }
    `;
    document.head.appendChild(style);

    // Clean up function
    return () => {
      document.head.removeChild(style);
    };
  }, []); // Run once on mount

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
