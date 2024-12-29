import React, { createContext, useContext, useEffect, useState } from 'react';

/**
 * Context type definition for theme management
 *
 * @interface ThemeContextType
 * @property {boolean} isDarkMode - Current dark mode state
 * @property {() => void} toggleDarkMode - Function to toggle between light and dark modes
 */
export interface ThemeContextType  {
  isDarkMode: boolean;
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

/**
 * Custom hook for accessing theme context
 *
 * Provides access to the current theme state and toggle function.
 * Must be used within a ThemeProvider component.
 *
 * Features:
 * - Type-safe theme state access
 * - Theme toggle functionality
 * - Error handling for usage outside provider
 *
 * @throws {Error} When used outside of ThemeProvider
 * @returns {ThemeContextType} The current theme context
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { isDarkMode, toggleDarkMode } = useTheme();
 *   return (
 *     <button onClick={toggleDarkMode}>
 *       Current theme: {isDarkMode ? 'dark' : 'light'}
 *     </button>
 *   );
 * }
 * ```
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
