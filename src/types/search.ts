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
  placeholder: string;

  /** Optional loading state indicator */
  isLoading?: boolean;

  /** Optional CSS class names for styling */
  className?: string;

  /** Optional data-testid for testing */
  dataTestId?: string;
}

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
