import { ThemeToggle } from "./ThemeToggle";
import { Logo } from "./Logo";
export const TopHeader = () => {
  return (
    <div className="relative z-10">
          {/* Header - Always visible */}
          <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 mb-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center space-x-4">
                <Logo size={30} />
                  <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                    GitHub Stats
                  </h1>
                </div>
                <ThemeToggle />
              </div>
            </div>
          </header>
        </div>
  )
}