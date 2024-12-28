import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ComparisonView } from '../ComparisonView';
import { TopHeader } from './TopHeader';
import { BackgroundEffects } from './BackgroundEffects';
import { Logo } from './Logo';

export const MainView = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-slate-100 to-white dark:from-gray-900 dark:to-gray-800 pb-6 relative overflow-hidden">

      <BackgroundEffects />
      <TopHeader />

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
          <Logo size={42} />
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
  )
}
