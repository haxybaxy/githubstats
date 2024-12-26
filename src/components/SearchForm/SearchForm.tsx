import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';

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
  isLoading = false
}: SearchFormProps) => (
  <form
    onSubmit={onSubmit}
    className="my-8 max-w-[500px]"
    role="search"
    aria-label="Search GitHub users"
    data-testid="search-form"
  >
    <div className="relative flex items-center gap-2">
      <div className="relative flex-1">
        {/* Search icon */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
          <MagnifyingGlassIcon className="h-5 w-5" />
        </div>

        {/* Username input field */}
        <input
          type="text"
          value={username}
          onChange={(e) => onUsernameChange(e.target.value)}
          placeholder={placeholder}
          disabled={isLoading}
          className="w-full pl-10 pr-3 py-[7px] border border-gray-300 dark:border-gray-600
                     rounded-md text-sm bg-transparent
                     focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                     disabled:bg-gray-50 dark:disabled:bg-gray-700
                     placeholder:text-gray-500 dark:placeholder:text-gray-400
                     text-gray-900 dark:text-gray-100"
          aria-label="GitHub username"
          aria-disabled={isLoading}
        />

        {/* Loading spinner (optional) */}
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <svg className="h-4 w-4 text-gray-500" viewBox="0 0 24 24">
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
        className="px-4 py-[7px] text-sm font-semibold text-white bg-green-600 hover:bg-green-700
                 disabled:bg-green-300 disabled:cursor-not-allowed
                 rounded-md transition-colors duration-200"
      >
        Search
      </button>
    </div>
  </form>
);
