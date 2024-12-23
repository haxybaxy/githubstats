import { useState } from 'react';
import { Repository } from '../../../types/github';

export function useRepositoryFiltering(repositories: Repository[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [sortBy, setSortBy] = useState<'stars' | 'forks' | 'updated'>('stars');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
