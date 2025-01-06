import { useQuery } from '@apollo/client';
import { useRef } from 'react';
import { SEARCH_USERS } from '../graphql/queries';

/**
 * Custom hook for searching GitHub users
 *
 * Features:
 * - Performs GraphQL query to search GitHub users
 * - Caches results using Apollo Client
 * - Skips queries for inputs shorter than 2 characters
 * - Provides input ref for focus management
 *
 * @param username - The GitHub username to search for
 * @returns Object containing:
 *  - inputRef: Reference to the search input element
 *  - data: Search results from the GraphQL query
 *  - searchLoading: Loading state of the search operation
 *
 * @example
 * ```tsx
 * const { inputRef, data, searchLoading } = useSearch('octocat');
 * ```
 */
export const useSearch = (username: string) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { data, loading: searchLoading } = useQuery(SEARCH_USERS, {
    variables: { query: username },
    skip: username.length < 2,
    fetchPolicy: 'cache-first',
  });

  return {
    inputRef,
    data,
    searchLoading,
  };
};
