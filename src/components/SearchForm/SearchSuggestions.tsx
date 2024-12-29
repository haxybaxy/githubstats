import { SearchUser } from '../../types/search';

interface SearchSuggestionsProps {
  searchLoading: boolean;
  searchData: {
    search: {
      nodes: SearchUser[];
    };
  } | null;
  onSuggestionClick: (login: string) => void;
  suggestionRef: React.RefObject<HTMLDivElement>;
}

export const SearchSuggestions = ({
  searchLoading,
  searchData,
  onSuggestionClick,
  suggestionRef
}: SearchSuggestionsProps) => {
  const users = searchData?.search.nodes?.filter((user: SearchUser | null) => user && user.login) || [];

  return (
    <div
      ref={suggestionRef}
      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto"
    >
      {searchLoading ? (
        <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
          Searching...
        </div>
      ) : users.length === 0 ? (
        <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
          No users found
        </div>
      ) : (
        <div className="py-1">
          {users.map((user: SearchUser) => (
            <button
              key={user.login}
              type="button"
              onClick={() => onSuggestionClick(user.login)}
              className="w-full px-4 py-2 flex items-center gap-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700/50 focus:bg-gray-100 dark:focus:bg-gray-700/50"
            >
              <img
                src={user.avatarUrl}
                alt=""
                className="w-5 h-5 rounded-full"
              />
              <div>
                <div className="text-sm text-gray-900 dark:text-gray-100">
                  {user.login}
                </div>
                {user.name && (
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {user.name}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
