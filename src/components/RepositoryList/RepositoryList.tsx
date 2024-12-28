import { Repository } from '../../types/github';
import { RepositoryCard } from '../RepositoryCard';
import { FilterControls } from './FilterControls';
import { Pagination } from './Pagination';
import { useRepositoryFiltering } from '../../hooks/useRepositoryFiltering';

/**
 * Props for the RepositoryList component
 * @interface RepositoryListProps
 */
interface RepositoryListProps {
  /** Array of repository data from GitHub */
  repositories: Repository[];
  /** Loading state indicator */
  loading: boolean;
  /** Error object if any error occurred */
  error?: Error;
  /** Repository owner's username */
  owner: string;
}

/**
 * Component that displays a filterable, sortable list of repositories
 *
 * This component provides:
 * - Filtering by repository name
 * - Filtering by programming language
 * - Sorting by stars, forks, or update date
 * - Pagination controls
 * - Loading and error states
 *
 * @param {RepositoryListProps} props - Component properties
 * @returns {JSX.Element} The rendered repository list with controls
 *
 * @example
 * ```tsx
 * <RepositoryList
 *   repositories={userRepos}
 *   loading={false}
 *   error={undefined}
 *   owner="octocat"
 * />
 * ```
 */
export function RepositoryList({ repositories, loading, error, owner }: RepositoryListProps) {
  /**
   * Hook providing filtering and sorting functionality
   */
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

  /**
   * Get filtered, sorted, and paginated repositories
   */
  const { paginatedRepos, totalCount } = getFilteredAndSortedRepos();

  /**
   * Calculate total number of pages
   */
  const totalPages = Math.ceil(totalCount / 10);

  return (
    <>
      {/* Filter and sort controls */}
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

      {/* Repository grid */}
      <div className="mt-8 grid gap-4 sm:gap-6 lg:grid-cols-2">
        {/* Loading state */}
        {loading && (
          <p className="text-gray-500">Loading repositories...</p>
        )}

        {/* Error state */}
        {error && (
          <p className="text-red-500">Error: {error.message}</p>
        )}

        {/* Repository cards */}
        {repositories && paginatedRepos.map((repo: Repository) => (
          <RepositoryCard
            key={repo.id}
            repository={repo}
            owner={owner}
          />
        ))}
      </div>

      {/* Pagination controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
}
