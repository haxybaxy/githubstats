import { useState } from 'react';
import { Repository } from '../types/github';

/**
 * Custom hook for filtering and sorting repository data
 *
 * This hook provides:
 * - Search functionality
 * - Language filtering
 * - Sorting by different criteria
 * - Pagination
 *
 * @param {Repository[]} repositories - Array of repositories to filter and sort
 * @returns {Object} State and functions for filtering repositories
 *
 * @example
 * ```tsx
 * const {
 *   searchQuery,
 *   setSearchQuery,
 *   getFilteredAndSortedRepos
 * } = useRepositoryFiltering(repositories);
 * ```
 */
export function useRepositoryFiltering(repositories: Repository[]) {
  /** Search query state */
  const [searchQuery, setSearchQuery] = useState('');
  /** Selected language filter state */
  const [selectedLanguage, setSelectedLanguage] = useState('');
  /** Sort criteria state */
  const [sortBy, setSortBy] = useState<'stars' | 'forks' | 'updated'>('stars');
  /** Sort order state */
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  /** Current page number state */
  const [currentPage, setCurrentPage] = useState(1);
  /** Number of items to display per page */
  const itemsPerPage = 10;

  /**
   * Filters and sorts repositories based on current state
   * @returns {{ paginatedRepos: Repository[], totalCount: number }} Filtered and paginated repositories
   */
  const getFilteredAndSortedRepos = () => {
    const filtered = repositories
      .filter(repo => {
        const matchesSearch = repo.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesLanguage = !selectedLanguage || repo.primaryLanguage?.name === selectedLanguage;
        return matchesSearch && matchesLanguage;
      })
      .sort((a, b) => {
        const order = sortOrder === 'asc' ? 1 : -1;
        switch (sortBy) {
          case 'stars':
            return (a.stargazerCount - b.stargazerCount) * order;
          case 'forks':
            return (a.forkCount - b.forkCount) * order;
          case 'updated':
            return (new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()) * order;
          default:
            return 0;
        }
      });

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return {
      paginatedRepos: filtered.slice(startIndex, endIndex),
      totalCount: filtered.length
    };
  };

  /**
   * Gets unique programming languages from all repositories
   * @returns {string[]} Array of unique language names
   */
  const getUniqueLanguages = () => {
    const languages = repositories
      .map(repo => repo.primaryLanguage?.name)
      .filter((lang): lang is string => !!lang);
    return Array.from(new Set(languages));
  };

  return {
    searchQuery,
    setSearchQuery,
    selectedLanguage,
    setSelectedLanguage,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    currentPage,
    setCurrentPage,
    getFilteredAndSortedRepos,
    getUniqueLanguages,
    itemsPerPage,
  };
}
