import { useQuery, ApolloError } from '@apollo/client';
import { User } from '../types/github';
import { GET_USER_INFO, GET_USER_CONTRIBUTIONS, GET_USER_REPOS } from '../graphql/queries';

/**
 * Result object returned by the useUserQueries hook
 *
 * @interface UserQueryResult
 * @property {User | null} userData Combined user data from all queries, null if any query fails or is loading*
 * @property {boolean} loading Whether any of the queries are still loading
 * @property {ApolloError | null} error Error from any of the queries, null if all successful
 */
export interface UserQueryResult {
  userData: User | null;
  loading: boolean;
  error: ApolloError | null;
}

/**
 * Custom hook to fetch all necessary user data from GitHub
 *
 * Combines three separate GraphQL queries:
 * - Basic user information (profile, bio, etc.)
 * - Contribution statistics
 * - Repository data
 *
 * Features:
 * - Parallel query execution
 * - Combined loading states
 * - Unified error handling
 * - Data aggregation
 * - Skip functionality
 *
 * Query Management:
 * - Handles multiple concurrent queries
 * - Combines results automatically
 * - Manages loading states
 * - Aggregates errors
 *
 * Error Handling:
 * - Returns first encountered error
 * - Maintains type safety
 * - Preserves error details
 *
 * Performance:
 * - Parallel query execution
 * - Efficient data combining
 * - Proper cache usage
 *
 * @param username - GitHub username to fetch data for
 * @param skip - Whether to skip the queries
 * @returns {UserQueryResult} Combined result object containing user data, loading state, and errors
 *
 * @example
 * ```tsx
 * const { userData, loading, error } = useUserQueries('octocat', false);
 *
 * if (loading) return <Loading />;
 * if (error) return <Error error={error} />;
 * if (userData) return <UserProfile user={userData} />;
 * ```
 */
export function useUserQueries(username: string, skip: boolean): UserQueryResult {
  // Query for basic user information
  const { loading: loadingInfo, error: errorInfo, data: dataInfo } = useQuery(GET_USER_INFO, {
    variables: { username },
    skip: skip || !username,
  });

  // Query for user contributions
  const { loading: loadingContrib, error: errorContrib, data: dataContrib } = useQuery(GET_USER_CONTRIBUTIONS, {
    variables: { username },
    skip: skip || !username,
  });

  // Query for user repositories
  const { loading: loadingRepos, error: errorRepos, data: dataRepos } = useQuery(GET_USER_REPOS, {
    variables: { username },
    skip: skip || !username,
  });

  // Combine all user data if available
  const userData = dataInfo?.user && dataContrib?.user && dataRepos?.user
    ? {
        ...dataInfo.user,
        ...dataContrib.user,
        repositories: dataRepos.user.repositories,
      }
    : null;

  // Combine loading and error states
  const loading = loadingInfo || loadingContrib || loadingRepos || false;
  const error = errorInfo || errorContrib || errorRepos || null;

  return { userData, loading, error };
}
