import { ApolloError } from '@apollo/client';

/**
 * Component to display GraphQL errors in a consistent format
 */
export function ErrorDisplay({ error }: { error: ApolloError }) {
  const getErrorMessage = (error: ApolloError) => {
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
    <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-red-700">
            {getErrorMessage(error)}
          </p>
        </div>
      </div>
    </div>
  );
}
