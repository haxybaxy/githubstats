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
    <div className="mt-8 mb-4 flex flex-wrap gap-4 justify-center">
      {/* Search input */}
      <input
        type="text"
        placeholder="Search repositories..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="px-4 py-2 border rounded-md"
        aria-label="Search repositories"
      />

      {/* Language filter */}
      <select
        value={selectedLanguage}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="px-4 py-2 border rounded-md"
        aria-label="Filter by language"
      >
        <option value="">All Languages</option>
        {languages.map(lang => (
          <option key={lang} value={lang}>{lang}</option>
        ))}
      </select>

      {/* Sort criteria selector */}
      <select
        value={sortBy}
        onChange={(e) => onSortByChange(e.target.value as 'stars' | 'forks' | 'updated')}
        className="px-4 py-2 border rounded-md"
        aria-label="Sort by"
      >
        <option value="stars">Stars</option>
        <option value="forks">Forks</option>
        <option value="updated">Last Updated</option>
      </select>

      {/* Sort order toggle */}
      <button
        onClick={onSortOrderChange}
        className="px-4 py-2 border rounded-md bg-white"
        aria-label={`Sort ${sortOrder === 'asc' ? 'ascending' : 'descending'}`}
      >
        {sortOrder === 'asc' ? '↑' : '↓'}
      </button>
    </div>
  );
}
