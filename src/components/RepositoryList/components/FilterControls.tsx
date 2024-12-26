import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  FunnelIcon
} from '@heroicons/react/20/solid';

/**
 * Props for the FilterControls component
 * @interface FilterControlsProps
 */
interface FilterControlsProps {
  /** Current search query string */
  searchQuery: string;
  /** Currently selected programming language filter */
  selectedLanguage: string;
  /** Current sort criteria */
  sortBy: 'stars' | 'forks' | 'updated';
  /** Current sort order */
  sortOrder: 'asc' | 'desc';
  /** List of available programming languages */
  languages: string[];
  /** Callback for when search query changes */
  onSearchChange: (value: string) => void;
  /** Callback for when language filter changes */
  onLanguageChange: (value: string) => void;
  /** Callback for when sort criteria changes */
  onSortByChange: (value: 'stars' | 'forks' | 'updated') => void;
  /** Callback for when sort order changes */
  onSortOrderChange: () => void;
}

/**
 * Component that provides filtering and sorting controls for repository list
 *
 * This component renders:
 * - Search input for filtering repositories by name
 * - Language selector for filtering by programming language
 * - Sort criteria selector (stars, forks, update date)
 * - Sort order toggle button
 *
 * @param {FilterControlsProps} props - Component properties
 * @returns {JSX.Element} The rendered filter controls
 *
 * @example
 * ```tsx
 * <FilterControls
 *   searchQuery=""
 *   selectedLanguage=""
 *   sortBy="stars"
 *   sortOrder="desc"
 *   languages={["JavaScript", "TypeScript"]}
 *   onSearchChange={setSearchQuery}
 *   onLanguageChange={setLanguage}
 *   onSortByChange={setSortBy}
 *   onSortOrderChange={toggleSortOrder}
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
    <div className="mb-4 flex flex-wrap items-center gap-4 px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700 rounded-lg">
      {/* Search input */}
      <div className="relative flex-1 min-w-[200px]">
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

      <div className="flex items-center gap-2 text-sm">
        {/* Language filter */}
        <div className="relative">
          <select
            value={selectedLanguage}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="appearance-none pl-7 pr-8 py-[5px] border border-gray-300 dark:border-gray-600
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
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value as 'stars' | 'forks' | 'updated')}
            className="appearance-none pl-3 pr-8 py-[5px] border border-gray-300 dark:border-gray-600
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
          {sortOrder === 'asc'
            ? <ChevronUpIcon className="h-4 w-4" />
            : <ChevronDownIcon className="h-4 w-4" />
          }
        </button>
      </div>
    </div>
  );
}
