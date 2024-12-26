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
                  GitHub Stats
                </h1>
              </div>
              {/* Theme toggle */}
              <ThemeToggle />
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[80vh]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-8">
              <div className="flex items-center justify-center space-x-3">
                <svg className="w-8 h-8 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                  GitHub Stats
                </h1>
              </div>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Compare GitHub profiles side by side. Analyze repositories, contributions, and other key metrics to see how different developers stack up.
              </p>
              <div className="flex justify-center space-x-4 text-sm">
                <span className="flex items-center text-gray-600 dark:text-gray-400">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Real-time data
                </span>
                <span className="flex items-center text-gray-600 dark:text-gray-400">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Detailed metrics
                </span>
              </div>
            </div>
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
