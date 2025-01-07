import { createContext, useContext } from 'react';

// Create a simplified theme context just for stories
const StorybookThemeContext = createContext<{isDarkMode: boolean}>({ isDarkMode: false });

export const ThemeDecorator = (Story: any, context: any) => {
  const isDarkMode = context.parameters.theme === 'dark';

  return (
    <StorybookThemeContext.Provider value={{ isDarkMode }}>
      <div className={isDarkMode ? 'dark' : ''}>
        <Story />
      </div>
    </StorybookThemeContext.Provider>
  );
};

export const useStorybookTheme = () => useContext(StorybookThemeContext);
