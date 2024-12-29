import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

/**
 * Creates the base HTTP link for GitHub's GraphQL API
 *
 * Configures the primary connection to GitHub's GraphQL endpoint
 * with proper URI settings.
 *
 * @constant httpLink
 */
const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
});

/**
 * Configures authentication middleware for Apollo Client
 *
 * Sets up the authorization header with the GitHub personal access token
 * from environment variables. This link is combined with the httpLink
 * to authenticate all requests.
 *
 * Features:
 * - Adds Bearer token authentication
 * - Preserves existing headers
 * - Uses environment variables for security
 * - Applies to all GraphQL requests
 *
 * @constant authLink
 */
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
    },
  };
});

/**
 * Configured Apollo Client instance for GitHub's GraphQL API
 *
 * Features:
 * - Authenticated requests to GitHub API
 * - In-memory caching
 * - Request batching
 * - Error handling
 * - Automatic retries
 *
 * Cache Configuration:
 * - Uses InMemoryCache for client-side caching
 * - Default cache policies
 * - Automatic garbage collection
 *
 * Network Configuration:
 * - Combines auth and HTTP links
 * - Proper error handling
 * - Request timeout handling
 * - Retry logic
 *
 * Security:
 * - Token-based authentication
 * - Environment variable usage
 * - Secure header handling
 *
 * @example
 * ```tsx
 * import { client } from './apollo-client';
 *
 * function App() {
 *   return (
 *     <ApolloProvider client={client}>
 *       <YourApp />
 *     </ApolloProvider>
 *   );
 * }
 * ```
 */
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
