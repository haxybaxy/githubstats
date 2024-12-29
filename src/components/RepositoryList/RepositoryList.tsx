import { Repository } from '../../types/github';
import { RepositoryCard } from '../RepositoryCard/RepositoryCard';
import { FilterControls } from './FilterControls';
import { Pagination } from './Pagination';
import { useRepositoryFiltering } from '../../hooks/useRepositoryFiltering';

/**
 * Props for the RepositoryList component
 *
 * @interface RepositoryListProps
 * @property {Repository[]} repositories - Array of repository data from GitHub
 * @property {boolean} loading - Loading state indicator
 * @property {Error} [error] - Error object if any error occurred
 * @property {string} owner - Repository owner's username
 */
export interface RepositoryListProps {
  repositories: Repository[];
  loading: boolean;
  error?: Error;
  owner: string;
}

/**
 * Component that displays a filterable, sortable list of repositories
 *
 * Features:
 * - Full-text search filtering by repository name
 * - Programming language filtering
 * - Sorting by stars, forks, or update date
 * - Ascending/descending sort order toggle
 * - Pagination with configurable page size
 * - Loading and error states
 * - Responsive grid layout
 *
 * Component Structure:
 * - FilterControls: Search, language filter, and sort controls
 * - Repository Grid: Responsive grid of RepositoryCard components
 * - Pagination: Page navigation controls
 *
 * States Handled:
 * - Loading: Shows loading indicator
 * - Error: Displays error message
 * - Empty: Shows appropriate message when no repositories match filters
 * - Filtered: Updates display based on current filters
 *
 * Filter Capabilities:
 * - Text search in repository names
 * - Language-based filtering
 * - Multiple sort criteria
 * - Sort direction toggle
 * - Pagination controls
 *
 * @param props - Component properties
 * @param props.repositories - Array of GitHub repositories to display
 * @param props.loading - Whether repositories are currently loading
 * @param props.error - Error object if fetch failed
 * @param props.owner - Username of repository owner
 * @returns The rendered repository list with controls
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
export function RepositoryList({
  repositories,
  loading,
  error,
  owner
}: RepositoryListProps) {
  /**
   * Hook providing filtering and sorting functionality
   * Manages state for:
   * - Search query
   * - Language filter
   * - Sort criteria and order
   * - Pagination
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
   * Returns:
   * - paginatedRepos: Current page of filtered/sorted repositories
   * - totalCount: Total number of repositories after filtering
   */
  const { paginatedRepos, totalCount } = getFilteredAndSortedRepos();

  /**
   * Calculate total number of pages based on filtered count
   * Uses fixed page size of 10 repositories per page
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

      {/* Repository grid with responsive layout */}
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
