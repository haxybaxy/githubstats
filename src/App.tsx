import { ComparisonView } from './components/ComparisonView/ComparisonView';
import { ThemeProvider } from './contexts/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [isSearchActive, setIsSearchActive] = useState(false);

  return (
    <ThemeProvider>
      <div className="min-h-screen w-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 pb-6 relative overflow-hidden">
        {/* Add subtle background pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M0 32L32 0M0 0L32 32" stroke="currentColor" strokeWidth="1" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Add relative positioning to content to appear above pattern */}
        <div className="relative z-10">
          {/* Header - Always visible */}
          <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 mb-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center space-x-4">
                <svg
                  width="30px"
                  height="30px"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-gray-900 dark:text-white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 9L11.5657 14.4343C11.3677 14.6323 11.2687 14.7313 11.1545 14.7684C11.0541 14.8011 10.9459 14.8011 10.8455 14.7684C10.7313 14.7313 10.6323 14.6323 10.4343 14.4343L8.56569 12.5657C8.36768 12.3677 8.26867 12.2687 8.15451 12.2316C8.05409 12.1989 7.94591 12.1989 7.84549 12.2316C7.73133 12.2687 7.63232 12.3677 7.43431 12.5657L3 17M17 9H13M17 9V13M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                  <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                    GitHub Stats
                  </h1>
                </div>
                <ThemeToggle />
              </div>
            </div>
          </header>
        </div>

        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex flex-col items-center"
            initial={{ y: "30vh" }}
            animate={{ y: isSearchActive ? 0 : "30vh" }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
              type: "tween"
            }}
          >
            {/* Title section */}
            <motion.div
              className="text-center space-y-4"
              animate={{
                opacity: isSearchActive ? 0.7 : 1,
                scale: isSearchActive ? 0.95 : 1
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-center space-x-3">
              <svg
                width="40px"
                height="40px"
                viewBox="0 0 24 24"
                fill="none"
                className="text-gray-900 dark:text-white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 9L11.5657 14.4343C11.3677 14.6323 11.2687 14.7313 11.1545 14.7684C11.0541 14.8011 10.9459 14.8011 10.8455 14.7684C10.7313 14.7313 10.6323 14.6323 10.4343 14.4343L8.56569 12.5657C8.36768 12.3677 8.26867 12.2687 8.15451 12.2316C8.05409 12.1989 7.94591 12.1989 7.84549 12.2316C7.73133 12.2687 7.63232 12.3677 7.43431 12.5657L3 17M17 9H13M17 9V13M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                  GitHub Stats
                </h1>
              </div>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                View real-time GitHub profile contribution data.
              </p>
            </motion.div>

            <div className="w-full">
              <ComparisonView onSearchStateChange={setIsSearchActive} />
            </div>

            <AnimatePresence>
              {isSearchActive && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.3 }}
                  className="w-full mt-8"
                >
                  {/* Comparison results will appear here */}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
