import { ApolloError } from '@apollo/client';
import { useState } from 'react';

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
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

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
        <p className="text-sm font-medium">
          {getErrorMessage(error)}
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="ml-auto text-white hover:text-gray-200"
          aria-label="Close error message"
          data-testid="error-close-button"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
