export interface SearchFormProps {
  username: string;
  onUsernameChange: (username: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  placeholder: string;
}

export const SearchForm = ({ username, onUsernameChange, onSubmit, placeholder = "Enter GitHub username" }: SearchFormProps) => (
  <form onSubmit={onSubmit} className="my-8">
    <input
      type="text"
      value={username}
      onChange={(e) => onUsernameChange(e.target.value)}
      placeholder={placeholder}
      className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      type="submit"
      className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Search
    </button>
  </form>
);
