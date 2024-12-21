import { Repository } from '../../types/github';
import { RepositoryCard } from '../RepositoryCard';
import { useState } from 'react';

interface RepositoryListProps {
  repositories: Repository[];
  loading: boolean;
  error?: Error;
}

export function RepositoryList({ repositories, loading, error }: RepositoryListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [sortBy, setSortBy] = useState<'stars' | 'forks' | 'updated'>('stars');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // You can adjust this number or make it configurable

  const getFilteredAndSortedRepos = (repos: Repository[]) => {
    const filtered = repos
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

    // Calculate pagination slice
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return {
      paginatedRepos: filtered.slice(startIndex, endIndex),
      totalCount: filtered.length
    };
  };

  const getUniqueLanguages = (repos: Repository[]) => {
    const languages = repos
      .map(repo => repo.primaryLanguage?.name)
      .filter((lang): lang is string => !!lang);
    return Array.from(new Set(languages));
  };

  const { paginatedRepos, totalCount } = getFilteredAndSortedRepos(repositories);
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <>
      <div className="mt-8 mb-4 flex flex-wrap gap-4 justify-center">
        <input
          type="text"
          placeholder="Search repositories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded-md"
        />

        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">All Languages</option>
          {getUniqueLanguages(repositories).map(lang => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'stars' | 'forks' | 'updated')}
          className="px-4 py-2 border rounded-md"
        >
          <option value="stars">Stars</option>
          <option value="forks">Forks</option>
          <option value="updated">Last Updated</option>
        </select>

        <button
          onClick={() => setSortOrder(order => order === 'asc' ? 'desc' : 'asc')}
          className="px-4 py-2 border rounded-md bg-white"
        >
          {sortOrder === 'asc' ? '↑' : '↓'}
        </button>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {loading && <p>Loading repositories...</p>}
        {error && <p className="text-red-500">Error: {error.message}</p>}
        {repositories && paginatedRepos.map((repo: Repository) => (
          <RepositoryCard key={repo.id} repository={repo} />
        ))}
      </div>

      {/* Add pagination controls */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-md bg-white disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-md bg-white disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
