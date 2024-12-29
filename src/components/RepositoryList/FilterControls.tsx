import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
  ChevronUpIcon,
  FunnelIcon
} from '@heroicons/react/20/solid';
import { motion } from 'framer-motion';

/**
 * Props for the FilterControls component
 *
 * @interface FilterControlsProps
 */
interface FilterControlsProps {
  /** Current search query for filtering repositories */
  searchQuery: string;

  /** Currently selected programming language filter */
  selectedLanguage: string;

  /** Current sort criteria (stars, forks, or updated) */
  sortBy: 'stars' | 'forks' | 'updated';

  /** Current sort direction (ascending or descending) */
  sortOrder: 'asc' | 'desc';

  /** Array of available programming languages to filter by */
  languages: string[];

  /** Callback when search input changes
   * @param value - New search query
   */
  onSearchChange: (value: string) => void;

  /** Callback when language filter changes
   * @param value - Selected language
   */
  onLanguageChange: (value: string) => void;

  /** Callback when sort criteria changes
   * @param value - New sort criteria
   */
  onSortByChange: (value: 'stars' | 'forks' | 'updated') => void;

  /** Callback when sort order is toggled */
  onSortOrderChange: () => void;
}

/**
 * Renders a set of controls for filtering and sorting repositories
 *
 * Features:
 * - Search input with icon for filtering by name
 * - Language dropdown with all available programming languages
 * - Sort criteria selector (stars, forks, updated)
 * - Animated sort direction toggle
 * - Responsive layout (stacks on mobile)
 * - Dark mode support
 * - Accessible form controls
 *
 * Visual Elements:
 * - Search input with magnifying glass icon
 * - Language dropdown with filter icon
 * - Sort criteria dropdown
 * - Animated sort direction toggle button
 * - Consistent hover and focus states
 * - Responsive container with proper spacing
 *
 * Accessibility:
 * - Proper ARIA labels for all controls
 * - Keyboard navigation support
 * - Clear visual focus indicators
 * - Semantic HTML structure
 *
 * @param props - Component properties
 * @param props.searchQuery - Current search filter text
 * @param props.selectedLanguage - Currently selected language filter
 * @param props.sortBy - Current sort criteria
 * @param props.sortOrder - Current sort direction
 * @param props.languages - Available language options
 * @param props.onSearchChange - Search input change handler
 * @param props.onLanguageChange - Language selection handler
 * @param props.onSortByChange - Sort criteria change handler
 * @param props.onSortOrderChange - Sort direction toggle handler
 * @returns The filter controls component
 *
 * @example
 * ```tsx
 * <FilterControls
 *   searchQuery=""
 *   selectedLanguage=""
 *   sortBy="stars"
 *   sortOrder="desc"
 *   languages={['JavaScript', 'TypeScript', 'Python']}
 *   onSearchChange={(query) => setSearch(query)}
 *   onLanguageChange={(lang) => setLanguage(lang)}
 *   onSortByChange={(sort) => setSortBy(sort)}
 *   onSortOrderChange={() => toggleSortOrder()}
 * />
 * ```
 */
export function FilterControls({
  searchQuery,
  selectedLanguage,
  sortBy,
  sortOrder,
  languages,
  onSearchChange,
  onLanguageChange,
  onSortByChange,
  onSortOrderChange,
}: FilterControlsProps) {
  return (
    <div className="mb-4 flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg opacity-90">
      {/* Search input */}
      <div className="relative w-full sm:flex-1 sm:min-w-[200px]">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <MagnifyingGlassIcon className="h-4 w-4" />
        </div>
        <input
          type="text"
          placeholder="Find a repository..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-3 py-[5px] text-sm border border-gray-300 dark:border-gray-600
                     rounded-md bg-white dark:bg-gray-700
                     placeholder:text-gray-500 dark:placeholder:text-gray-400
                     text-gray-900 dark:text-gray-100
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          aria-label="Search repositories"
        />
      </div>

      <div className="flex items-center gap-2 text-sm w-full sm:w-auto">
        {/* Language filter */}
        <div className="relative flex-1 sm:flex-initial">
          <select
            value={selectedLanguage}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="w-full sm:w-auto appearance-none pl-7 pr-8 py-[5px] border border-gray-300 dark:border-gray-600
                       rounded-md bg-white dark:bg-gray-700
                       text-gray-900 dark:text-gray-100
                       hover:bg-gray-50 dark:hover:bg-gray-600
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            aria-label="Filter by language"
          >
            <option value="">Language: All</option>
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
          <FunnelIcon className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <ChevronUpDownIcon className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
        </div>

        {/* Sort dropdown */}
        <div className="relative flex-1 sm:flex-initial">
          <select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value as 'stars' | 'forks' | 'updated')}
            className="w-full sm:w-auto appearance-none pl-3 pr-8 py-[5px] border border-gray-300 dark:border-gray-600
                       rounded-md bg-white dark:bg-gray-700
                       text-gray-900 dark:text-gray-100
                       hover:bg-gray-50 dark:hover:bg-gray-600
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            aria-label="Sort by"
          >
            <option value="stars">Sort by: Stars</option>
            <option value="forks">Sort by: Forks</option>
            <option value="updated">Sort by: Updated</option>
          </select>
          <ChevronUpDownIcon className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
        </div>

        {/* Sort order toggle */}
        <button
          onClick={onSortOrderChange}
          className="p-[5px] border border-gray-300 dark:border-gray-600
                     rounded-md bg-white dark:bg-gray-700
                     text-gray-700 dark:text-gray-300
                     hover:bg-gray-50 dark:hover:bg-gray-600
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          aria-label={`Sort ${sortOrder === 'asc' ? 'ascending' : 'descending'}`}
        >
          <motion.div
            animate={{ rotate: sortOrder === 'asc' ? 0 : 180 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ChevronUpIcon className="h-4 w-4" />
          </motion.div>
        </button>
      </div>
    </div>
  );
}
