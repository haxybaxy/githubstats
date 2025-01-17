import { useTheme } from '../../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

/**
 * Toggle button component for switching between light and dark themes
 *
 * Features:
 * - Smooth icon rotation animations
 * - Interactive tap feedback
 * - Automatic theme synchronization
 * - Accessible button controls
 * - Dynamic icon switching
 *
 * Visual States:
 * - Light mode: Moon icon
 * - Dark mode: Sun icon
 * - Hover and tap animations
 * - Transition effects
 *
 * @returns The theme toggle button component
 */
export function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <motion.button
      data-testid="theme-toggle"
      onClick={toggleDarkMode}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      whileTap={{ scale: 0.95 }}
      layout
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDarkMode ? 'dark' : 'light'}
          initial={{ opacity: 0, rotate: -180 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 180 }}
          transition={{ duration: 0.3 }}
        >
          {isDarkMode ? (
            <SunIcon className="h-5 w-5 text-yellow-500" />
          ) : (
            <MoonIcon className="h-5 w-5 text-gray-600" />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}
