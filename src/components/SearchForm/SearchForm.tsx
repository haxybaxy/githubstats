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
  placeholder = "Enter GitHub username",
  isLoading = false
}: SearchFormProps) => (
  <form
    onSubmit={onSubmit}
    className="my-8"
    role="search"
    aria-label="Search GitHub users"
    data-testid="search-form"
  >
    {/* Username input field */}
    <input
      type="text"
      value={username}
      onChange={(e) => onUsernameChange(e.target.value)}
      placeholder={placeholder}
      disabled={isLoading}
      className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
      aria-label="GitHub username"
      aria-disabled={isLoading}
    />

    {/* Submit button */}
    <button
      type="submit"
      disabled={isLoading || !username.trim()}
      className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
      aria-disabled={isLoading || !username.trim()}
    >
      {isLoading ? 'Loading...' : 'Search'}
    </button>
  </form>
);
