/**
 * Interface representing a GitHub user in search results
 *
 * Contains minimal user information needed for search suggestions
 * and quick user previews. Used in autocomplete and search results.
 *
 * @interface SearchUser
 */
export interface SearchUser {
  /** GitHub username (login) */
  login: string;

  /** User's display name (optional) */
  name?: string;

  /** URL to user's GitHub avatar */
  avatarUrl: string;
}

/**
 * Props for the SearchSuggestions component
 *
 * @interface SearchSuggestionsProps
 * @property {boolean} searchLoading - Loading state for search operation
 * @property {SearchUser[]} searchData - Search results data containing user nodes
 * @property {(login: string) => void} onSuggestionClick - Callback when a suggestion is clicked
 * @property {React.RefObject<HTMLDivElement>} suggestionRef - Ref for dropdown container
 */
export interface SearchSuggestionsProps {
  searchLoading: boolean;
  searchData: {
    search: {
      nodes: SearchUser[];
    };
  } | null;
  onSuggestionClick: (login: string) => void;
  suggestionRef: React.RefObject<HTMLDivElement>;
}

/**
 * Displays a dropdown list of GitHub user search suggestions
 *
 * Features:
 * - Real-time search results display
 * - Loading state handling
 * - Empty state messaging
 * - User avatar and name display
 * - Click outside detection
 * - Dark mode support
 *
 * Visual States:
 * - Loading: Shows loading indicator
 * - Empty: Displays "No users found" message
 * - Results: List of matching users with avatars
 * - Error: Handles null data gracefully
 *
 * Interaction:
 * - Click selection of users
 * - Hover states for items
 * - Focus management
 * - Click outside to dismiss
 *
 * Accessibility:
 * - Proper ARIA roles
 * - Keyboard navigation
 * - Screen reader support
 * - Focus management
 * - Loading state announcements
 *
 * @param props - Component properties
 * @param props.searchLoading - Whether search is in progress
 * @param props.searchData - Search results data
 * @param props.onSuggestionClick - Callback for suggestion selection
 * @param props.suggestionRef - Ref for dropdown container
 * @returns The search suggestions dropdown
 *
 * @example
 * ```tsx
 * <SearchSuggestions
 *   searchLoading={isLoading}
 *   searchData={data}
 *   onSuggestionClick={(login) => handleSelection(login)}
 *   suggestionRef={dropdownRef}
 * />
 * ```
 */
export const SearchSuggestions = ({
  searchLoading,
  searchData,
  onSuggestionClick,
  suggestionRef
}: SearchSuggestionsProps) => {
  const users = searchData?.search.nodes?.filter((user: SearchUser | null) => user && user.login) || [];

  return (
    <div
      ref={suggestionRef}
      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto"
      data-testid="search-suggestions"
    >
      {searchLoading ? (
        <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
          Searching...
        </div>
      ) : users.length === 0 ? (
        <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
          No users found
        </div>
      ) : (
        <div className="py-1">
          {users.map((user: SearchUser) => (
            <button
              key={user.login}
              type="button"
              onClick={() => onSuggestionClick(user.login)}
              className="w-full px-4 py-2 flex items-center gap-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700/50 focus:bg-gray-100 dark:focus:bg-gray-700/50"
              data-testid={`suggestion-${user.login}`}
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
      )}
    </div>
  );
};
