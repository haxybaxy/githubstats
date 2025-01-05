import { useQuery } from '@apollo/client';
import { useRef } from 'react';
import { SEARCH_USERS } from '../graphql/queries';

export const useSearch = (username: string) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const lastSearchRef = useRef(searchTerm);

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
