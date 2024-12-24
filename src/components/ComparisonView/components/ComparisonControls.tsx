import { SearchForm } from '../../SearchForm';

interface ComparisonControlsProps {
  username1: string;
  username2: string;
  isComparing: boolean;
  loading1: boolean;
  loading2: boolean;
  onUsernameChange1: (value: string) => void;
  onUsernameChange2: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onToggleComparing: () => void;
}

/**
 * Component that renders the comparison controls including search forms and comparison toggle
 */
export function ComparisonControls({
  username1,
  username2,
  isComparing,
  loading1,
  loading2,
  onUsernameChange1,
  onUsernameChange2,
  onSubmit,
  onToggleComparing,
}: ComparisonControlsProps) {
  return (
    <div className="flex justify-center items-center gap-4 mt-6">
      <SearchForm
        username={username1}
        onUsernameChange={onUsernameChange1}
        onSubmit={onSubmit}
        placeholder={isComparing ? "Enter first username..." : "Enter username..."}
        isLoading={loading1}
      />

      <button
        onClick={onToggleComparing}
        className={`px-4 py-2 rounded-md ${
          isComparing
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-blue-500 hover:bg-blue-600'
        } text-white`}
      >
        {isComparing ? 'Remove VS' : 'VS'}
      </button>

      {isComparing && (
        <SearchForm
          username={username2}
          onUsernameChange={onUsernameChange2}
          onSubmit={onSubmit}
          placeholder="Enter second username..."
          isLoading={loading2}
        />
      )}
    </div>
  );
}
