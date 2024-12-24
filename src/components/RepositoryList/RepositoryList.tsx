import { Repository } from '../../types/github';
import { RepositoryCard } from '../RepositoryCard';
import { FilterControls } from './components/FilterControls';
import { Pagination } from './components/Pagination';
import { useRepositoryFiltering } from './hooks/useRepositoryFiltering';

interface RepositoryListProps {
  repositories: Repository[];
  loading: boolean;
  error?: Error;
  owner: string;
}

export function RepositoryList({ repositories, loading, error, owner }: RepositoryListProps) {
  const {
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
  } = useRepositoryFiltering(repositories);

  const { paginatedRepos, totalCount } = getFilteredAndSortedRepos();
  const totalPages = Math.ceil(totalCount / 10);

  return (
    <>
      <FilterControls
        searchQuery={searchQuery}
        selectedLanguage={selectedLanguage}
        sortBy={sortBy}
        sortOrder={sortOrder}
        languages={getUniqueLanguages()}
        onSearchChange={setSearchQuery}
        onLanguageChange={setSelectedLanguage}
        onSortByChange={setSortBy}
        onSortOrderChange={() => setSortOrder(order => order === 'asc' ? 'desc' : 'asc')}
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {loading && <p>Loading repositories...</p>}
        {error && <p className="text-red-500">Error: {error.message}</p>}
        {repositories && paginatedRepos.map((repo: Repository) => (
          <RepositoryCard
            key={repo.id}
            repository={repo}
            owner={owner}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
}
