import { ComparisonView } from './components/ComparisonView/ComparisonView';
import { ThemeProvider } from './contexts/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';
import { MarkGithubIcon } from '@primer/octicons-react';
function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen w-screen bg-gray-100 dark:bg-gray-900 pb-6">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 mb-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo and title */}
              <div className="flex items-center space-x-4">
                <MarkGithubIcon size={32} className="text-gray-900 dark:text-white" />
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  GitHub Stats Comparison
                </h1>
              </div>
              {/* Theme toggle */}
              <ThemeToggle />
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[80vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl text-center">
            GitHub Stats
          </h1>
          <ComparisonView />
        </div>
        </main>
        <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
              <p>
                Built with GitHub's GraphQL API •
                <a
                  href="https://github.com/haxybaxy/githubstats"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 text-blue-600 dark:text-blue-400 hover:underline"
                >
                  View on GitHub
                </a>
              </p>
            </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
