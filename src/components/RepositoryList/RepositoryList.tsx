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

  const getFilteredAndSortedRepos = (repos: Repository[]) => {
    return repos
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
  };

  const getUniqueLanguages = (repos: Repository[]) => {
    const languages = repos
      .map(repo => repo.primaryLanguage?.name)
      .filter((lang): lang is string => !!lang);
    return Array.from(new Set(languages));
  };

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
        {repositories && getFilteredAndSortedRepos(repositories).map((repo: Repository) => (
          <RepositoryCard key={repo.id} repository={repo} />
        ))}
      </div>
    </>
  );
}
