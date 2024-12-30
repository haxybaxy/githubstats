import { SearchForm } from '../SearchForm/SearchForm';

/**
 * Props for the ComparisonControls component
 *
 * @interface ComparisonControlsProps
 * @property {string} username - Username for the user
 * @property {boolean} loading - Loading state for the user's data
 * @property {(value: string) => void} onUsernameChange - Callback for when the username changes
 * @property {(e: React.FormEvent) => void} onSubmit - Callback for form submission
 */
export interface ComparisonControlsProps {
  username: string;
  loading: boolean;
  onUsernameChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

/**
 * Component that renders the search controls
 *
 * @param props - Component properties
 * @returns The rendered search controls
 */
export function ComparisonControls({
  username,
  loading,
  onUsernameChange,
  onSubmit,
}: ComparisonControlsProps) {
  return (
    <div className="flex justify-center items-center mt-1" data-testid="comparison-controls">
      <SearchForm
        username={username}
        onUsernameChange={onUsernameChange}
        onSubmit={onSubmit}
        placeholder="Enter username..."
        isLoading={loading}
        className="w-full sm:w-auto"
        dataTestId="search-form"
      />
    </div>
  );
}
