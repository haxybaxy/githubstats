import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { useSearch } from '../../hooks/useSearch';
import { SearchSuggestions } from './SearchSuggestions';
import { useSuggestions } from '../../hooks/useSuggestions';

/**
 * Props interface for search form components
 *
 * Used by components that implement GitHub username search functionality.
 * Provides consistent prop structure for search-related components.
 *
 * @interface SearchFormProps
 */
export interface SearchFormProps {
  /** Current username value in the search input */
  username: string;

  /** Callback function triggered when username input changes
   * @param username - The new username value
   */
  onUsernameChange: (username: string) => void;

  /** Form submission handler
   * @param e - React form event
   */
  onSubmit: (e: React.FormEvent) => void;

  /** Placeholder text for the search input */
  placeholder?: string;

  /** Optional loading state indicator */
  isLoading?: boolean;

  /** Optional CSS class names for styling */
  className?: string;

  /** Optional data-testid for testing */
  dataTestId?: string;

  /** Callback function triggered when suggestion is selected
   * @param username - The selected username
   */
  onSuggestionSelect: (username: string) => void;
}
/**
 * Search form component for GitHub username search
 *
 * Features:
 * - Real-time search suggestions
 * - Debounced search input
 * - Loading states
 * - Keyboard shortcuts
 * - Dark mode support
 * - Responsive design
 *
 * Visual Elements:
 * - Search icon
 * - Input field with placeholder
 * - Keyboard shortcut indicator
 * - Loading spinner
 * - Search button
 * - Suggestions dropdown
 *
 * Interaction States:
 * - Input focus/blur handling
 * - Loading state display
 * - Suggestion selection
 * - Form submission
 *
 * Accessibility:
 * - ARIA labels and roles
 * - Keyboard navigation
 * - Focus management
 * - Screen reader support
 * - Disabled state handling
 *
 * @param props - Component properties extending SearchFormProps
 * @param props.username - Current username value
 * @param props.onUsernameChange - Username change handler
 * @param props.onSubmit - Form submission handler
 * @param props.placeholder - Input placeholder text
 * @param props.isLoading - Loading state indicator
 * @param props.className - Additional CSS classes
 * @returns The search form component
 *
 * @example
 * ```tsx
 * <SearchForm
 *   username="octocat"
 *   onUsernameChange={(value) => setUsername(value)}
 *   onSubmit={handleSearch}
 *   isLoading={false}
 * />
 * ```
 */
export const SearchForm = ({
  username,
  onUsernameChange,
  onSubmit,
  onSuggestionSelect,
  placeholder = "Search GitHub username",
  isLoading = false,
  className = "",
  dataTestId = "search-form"
}: SearchFormProps) => {
  const { inputRef, data, searchLoading } = useSearch(username);
  const { showSuggestions, setShowSuggestions, suggestionRef } = useSuggestions();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onUsernameChange(value);
  };

  const handleSuggestionClick = (login: string) => {
    setShowSuggestions(false);
    onSuggestionSelect(login);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setShowSuggestions(false);
    flushDebouncedValue(searchTerm);

    // Increase the delay slightly to ensure state updates complete
    await new Promise(resolve => setTimeout(resolve, 50));
    onSubmit(e);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!username.trim()) return;
        setShowSuggestions(false);
        onSubmit(e);
      }}
      className={`my-8 w-full sm:max-w-[500px] ${className}`}
      role="search"
      aria-label="Search GitHub users"
      data-testid={dataTestId || "search-form"}
    >
      <div className="relative flex flex-col sm:flex-row items-center gap-2">
        <div className="relative flex-1 w-full">
          <div className="relative">
            {/* Search icon */}
            <div className="absolute left-3 top-[50%] -translate-y-[50%] text-gray-500 dark:text-gray-400 flex items-center">
              <MagnifyingGlassIcon className="h-5 w-5" />
            </div>

            {/* Username input field */}
            <input
              ref={inputRef}
              type="text"
              value={username}
              onChange={handleInputChange}
              onFocus={() => setShowSuggestions(true)}
              placeholder={placeholder}
              disabled={isLoading}
              className="w-full pl-10 pr-12 h-9 border border-gray-300 dark:border-gray-600
                         rounded-md text-sm bg-transparent
                         focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                         disabled:bg-gray-50 dark:disabled:bg-gray-700
                         placeholder:text-gray-500 dark:placeholder:text-gray-400
                         text-gray-900 dark:text-gray-100"
              aria-label="GitHub username"
              aria-disabled={isLoading}
              autoComplete="off"
            />

            {/* Keyboard shortcut indicator */}
            <div className="absolute right-3 top-[50%] -translate-y-[50%] pointer-events-none flex items-center">
              <kbd className="inline-flex items-center justify-center px-1.5 h-5 text-xs font-medium
                             text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700
                             border border-gray-300 dark:border-gray-600 rounded shadow-sm">/</kbd>
            </div>

            {/* Loading spinner */}
            {isLoading && (
              <div className="absolute right-12 top-1/2 -translate-y-1/2">
                <svg className="h-5 w-5 text-gray-500 animate-[spin_1s_linear_infinite]" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              </div>
            )}

            {/* Suggestions dropdown - positioned absolutely */}
            {showSuggestions && username.length >= 2 && (
              <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-10">
                <SearchSuggestions
                  searchLoading={searchLoading}
                  searchData={data}
                  onSuggestionClick={handleSuggestionClick}
                  suggestionRef={suggestionRef}
                />
              </div>
            )}
          </div>
        </div>

        {/* Search button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto px-4 py-[7px] text-sm font-semibold text-white bg-green-600 hover:bg-green-700
                     disabled:bg-green-300 disabled:cursor-not-allowed
                     rounded-md transition-colors duration-200"
        >
          Search
        </button>
      </div>
    </form>
  );
};
