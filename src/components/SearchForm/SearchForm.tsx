import { useQuery } from '@apollo/client';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { SEARCH_USERS } from '../../graphql/queries';
import { useEffect, useState, useRef } from 'react';
import debounce from 'lodash/debounce';

/**
 * Props for the SearchForm component
 * @interface SearchFormProps
 */
export interface SearchFormProps {
  /** Current username value */
  username: string;
  /** Callback for when username changes */
  onUsernameChange: (username: string) => void;
  /** Callback for form submission */
  onSubmit: (e: React.FormEvent) => void;
  /** Placeholder text for the input field */
  placeholder: string;
  /** Loading state indicator */
  isLoading?: boolean;
  /** Optional className for the form */
  className?: string;
}

// Add type for search result user
interface SearchUser {
  login: string;
  name?: string;
  avatarUrl: string;
}

/**
 * Component that renders a search form for GitHub usernames
 *
 * This component provides:
 * - Username input field
 * - Submit button
 * - Loading state handling
 * - Form validation
 * - Accessible form controls
 *
 * @param {SearchFormProps} props - Component properties
 * @returns {JSX.Element} The rendered search form
 *
 * @example
 * ```tsx
 * <SearchForm
 *   username="octocat"
 *   onUsernameChange={setUsername}
 *   onSubmit={handleSubmit}
 *   placeholder="Enter GitHub username"
 *   isLoading={false}
 * />
 * ```
 */
export const SearchForm = ({
  username,
  onUsernameChange,
  onSubmit,
  placeholder = "Search GitHub username",
  isLoading = false,
  className = ""
}: SearchFormProps) => {
  const [searchTerm, setSearchTerm] = useState(username);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounced search query
  const { data, loading: searchLoading } = useQuery(SEARCH_USERS, {
    variables: { query: searchTerm },
    skip: searchTerm.length < 2,
    fetchPolicy: 'cache-first',
  });

  // Handle clicks outside suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Create a stable debounced function that won't recreate on every render
  const debouncedOnChange = useRef(
    debounce((value: string) => {
      onUsernameChange(value);
    }, 300)
  ).current;

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedOnChange.cancel();
    };
  }, [debouncedOnChange]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only trigger if typing in an input/textarea isn't already happening
      if (
        e.key === '/' &&
        !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);          // Update local state immediately
    setShowSuggestions(true);      // Show suggestions
    debouncedOnChange(value);      // Debounce the parent update
  };

  const handleSuggestionClick = (login: string) => {
    setSearchTerm(login);
    onUsernameChange(login);
    setShowSuggestions(false);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;
        setShowSuggestions(false);
        onSubmit(e);
      }}
      className={`my-8 w-full sm:max-w-[500px] relative ${className}`}
      role="search"
      aria-label="Search GitHub users"
      data-testid="search-form"
    >
      <div className="relative flex flex-col sm:flex-row items-center gap-2">
        <div className="relative flex-1 w-full">
          {/* Search icon */}
          <div className="absolute left-3 top-[50%] -translate-y-[50%] text-gray-500 dark:text-gray-400 flex items-center">
            <MagnifyingGlassIcon className="h-5 w-5" />
          </div>

          {/* Username input field with shortcut indicator */}
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
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

          {/* Suggestions dropdown */}
          {showSuggestions && searchTerm.length >= 2 && (
            <div
              ref={suggestionRef}
              className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200
                         dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto"
            >
              {searchLoading ? (
                <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                  Searching...
                </div>
              ) : data?.search.nodes?.filter((user: SearchUser | null) => user && user.login)?.length > 0 ? (
                <div className="py-1">
                  {data.search.nodes
                    .filter((user: SearchUser | null) => user && user.login)
                    .map((user: SearchUser) => (
                    <button
                      key={user.login}
                      type="button"
                      onClick={() => handleSuggestionClick(user.login)}
                      className="w-full px-4 py-2 flex items-center gap-3 text-left hover:bg-gray-100
                               dark:hover:bg-gray-700/50 focus:bg-gray-100 dark:focus:bg-gray-700/50"
                    >
                      <img
                        src={user.avatarUrl}
                        alt=""
                        className="w-5 h-5 rounded-full"
                      />
                      <div>
                        <div className="text-sm text-gray-900 dark:text-gray-100">
                          {user.login}
                        </div>
                        {user.name && (
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {user.name}
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                  No users found
                </div>
              )}
            </div>
          )}

          {/* Loading spinner */}
          {isLoading && (
            <div className="absolute right-12 top-1/2 -translate-y-1/2">
              <svg className="h-5 w-5 text-gray-500 animate-[spin_1s_linear_infinite]" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
          )}
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
