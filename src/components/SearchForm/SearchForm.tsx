export interface SearchFormProps {
  username: string;
  onUsernameChange: (username: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  placeholder: string;
  isLoading?: boolean;
}

export const SearchForm = ({
  username,
  onUsernameChange,
  onSubmit,
  placeholder = "Enter GitHub username",
  isLoading = false
}: SearchFormProps) => (
  <form onSubmit={onSubmit} className="my-8">
    <input
      type="text"
      value={username}
      onChange={(e) => onUsernameChange(e.target.value)}
      placeholder={placeholder}
      disabled={isLoading}
      className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
    />
    <button
      type="submit"
      disabled={isLoading || !username.trim()}
      className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
    >
      {isLoading ? 'Loading...' : 'Search'}
    </button>
  </form>
);
