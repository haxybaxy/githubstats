import { useQuery } from '@apollo/client';
import { useEffect, useRef, useState } from 'react';
import debounce from 'lodash/debounce';
import { SEARCH_USERS } from '../graphql/queries';

export const useSearch = (username: string, onUsernameChange: (username: string) => void) => {
  const [searchTerm, setSearchTerm] = useState(username);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data, loading: searchLoading } = useQuery(SEARCH_USERS, {
    variables: { query: searchTerm },
    skip: searchTerm.length < 2,
    fetchPolicy: 'cache-first',
  });

  const debouncedOnChange = useRef(
    debounce((value: string) => {
      onUsernameChange(value);
    }, 300)
  ).current;

  const flushDebouncedValue = (value: string) => {
    debouncedOnChange.cancel();
    onUsernameChange(value);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  useEffect(() => {
    return () => {
      debouncedOnChange.cancel();
    };
  }, [debouncedOnChange]);

  return {
    searchTerm,
    setSearchTerm,
    showSuggestions,
    setShowSuggestions,
    suggestionRef,
    inputRef,
    data,
    searchLoading,
    debouncedOnChange,
    flushDebouncedValue
  };
};
