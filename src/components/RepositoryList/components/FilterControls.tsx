interface FilterControlsProps {
  searchQuery: string;
  selectedLanguage: string;
  sortBy: 'stars' | 'forks' | 'updated';
  sortOrder: 'asc' | 'desc';
  languages: string[];
  onSearchChange: (value: string) => void;
  onLanguageChange: (value: string) => void;
  onSortByChange: (value: 'stars' | 'forks' | 'updated') => void;
  onSortOrderChange: () => void;
}

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
      <input
        type="text"
        placeholder="Search repositories..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="px-4 py-2 border rounded-md"
      />

      <select
        value={selectedLanguage}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="px-4 py-2 border rounded-md"
      >
        <option value="">All Languages</option>
        {languages.map(lang => (
          <option key={lang} value={lang}>{lang}</option>
        ))}
      </select>

      <select
        value={sortBy}
        onChange={(e) => onSortByChange(e.target.value as 'stars' | 'forks' | 'updated')}
        className="px-4 py-2 border rounded-md"
      >
        <option value="stars">Stars</option>
        <option value="forks">Forks</option>
        <option value="updated">Last Updated</option>
      </select>

      <button
        onClick={onSortOrderChange}
        className="px-4 py-2 border rounded-md bg-white"
      >
        {sortOrder === 'asc' ? '↑' : '↓'}
      </button>
    </div>
  );
}
