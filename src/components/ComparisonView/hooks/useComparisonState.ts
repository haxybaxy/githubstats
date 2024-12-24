import { useState } from 'react';

interface ComparisonState {
  username1: string;
  username2: string;
  isComparing: boolean;
  searchedUsername1: string;
  searchedUsername2: string;
}

/**
 * Custom hook to manage comparison state
 */
export function useComparisonState() {
  const [state, setState] = useState<ComparisonState>({
    username1: '',
    username2: '',
    isComparing: false,
    searchedUsername1: '',
    searchedUsername2: '',
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setState(prev => ({
      ...prev,
      searchedUsername1: prev.username1,
      searchedUsername2: prev.isComparing ? prev.username2 : '',
    }));
  };

  const toggleComparing = () => {
    setState(prev => ({
      ...prev,
      isComparing: !prev.isComparing,
      username2: '',
      searchedUsername2: '',
    }));
  };

  return {
    state,
    setState,
    handleSearch,
    toggleComparing,
  };
}
