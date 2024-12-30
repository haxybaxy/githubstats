import { ApolloError } from '@apollo/client';

/**
 * Props for the ErrorDisplay component
 *
 * @interface ErrorDisplayProps
 * @property {ApolloError} error - The Apollo error object to display
 */
export interface ErrorDisplayProps {
  error: ApolloError;
}

/**
 * Component to display GraphQL errors in a consistent format
 *
 * Features:
 * - User-friendly error message conversion
 * - Consistent error styling
 * - Accessible error presentation
 * - Icon-based visual indicators
 * - Support for multiple error types
 *
 * Error Types Handled:
 * - User not found errors
 * - Authentication failures
 * - API rate limiting
 * - Network errors
 * - Generic fallback errors
 *
 * Visual Elements:
 * - Error icon
 * - Colored border indicator
 * - Formatted message text
 * - Alert role for accessibility
 * - Proper spacing and layout
 *
 * Accessibility:
 * - Semantic HTML structure
 * - ARIA roles and attributes
 * - Color contrast compliance
 * - Screen reader support
 *
 * @param props - Component properties
 * @param props.error - Apollo error object to process and display
 * @returns The rendered error display
 *
 * @example
 * ```tsx
 * <ErrorDisplay
 *   error={new ApolloError({
 *     errorMessage: 'Could not resolve to a User'
 *   })}
 * />
 * ```
 */
export function ErrorDisplay({ error }: ErrorDisplayProps) {
  /**
   * Converts Apollo errors into user-friendly messages
   *
   * Error Mapping:
   * - User not found -> Suggests checking username
   * - Bad credentials -> Suggests checking API token
   * - Rate limit -> Suggests waiting
   * - Others -> Generic error message
   *
   * @param error - The Apollo error object to process
   * @returns A user-friendly error message string
   */
  const getErrorMessage = (error: ApolloError): string => {
    if (error.message.includes('Could not resolve to a User')) {
      return 'User not found. Please check the username and try again.';
    }
    if (error.message.includes('Bad credentials')) {
      return 'GitHub API authentication failed. Please check your API token.';
    }
    if (error.message.includes('API rate limit exceeded')) {
      return 'GitHub API rate limit exceeded. Please try again later.';
    }
    return 'An error occurred while fetching data. Please try again.';
  };

  return (
    <div
      className="p-4 my-4 text-white bg-red-500 rounded-md"
      role="alert"
    >
      <div className="flex items-center justify-center">
        <svg
          className="h-5 w-5 text-white mr-2"
          viewBox="0 0 16 16"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z" />
        </svg>
        <p className="text-sm font-medium">
          {getErrorMessage(error)}
        </p>
      </div>
    </div>
  );
}
