import { SearchForm } from '../SearchForm/SearchForm';

/**
 * Props for the ComparisonControls component
 *
 * @interface ComparisonControlsProps
 * @property {string} username1 - Username for the first user
 * @property {string} username2 - Username for the second user
 * @property {boolean} isComparing - Whether comparison mode is active
 * @property {boolean} loading1 - Loading state for the first user's data
 * @property {boolean} loading2 - Loading state for the second user's data
 * @property {(value: string) => void} onUsernameChange1 - Callback for when the first username changes
 * @property {(value: string) => void} onUsernameChange2 - Callback for when the second username changes
 * @property {(e: React.FormEvent) => void} onSubmit - Callback for form submission
 * @property {() => void} onToggleComparing - Callback for toggling comparison mode
 */
export interface ComparisonControlsProps {
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
 *
 * Features:
 * - Dual search forms for user comparison
 * - Dynamic form visibility based on comparison mode
 * - Loading state indicators
 * - Responsive layout adaptation
 * - Toggle button for comparison mode
 *
 * Visual Elements:
 * - Primary search form (always visible)
 * - Secondary search form (visible in comparison mode)
 * - VS/Remove VS toggle button
 * - Loading spinners during data fetch
 * - Responsive spacing and alignment
 *
 * State Handling:
 * - Manages input field values
 * - Tracks loading states
 * - Controls comparison mode toggle
 * - Handles form submissions
 *
 * Layout Behavior:
 * - Stacks vertically on mobile
 * - Horizontal alignment on desktop
 * - Proper spacing between elements
 * - Centered alignment within container
 *
 * Accessibility:
 * - Proper form labeling
 * - Loading state announcements
 * - Keyboard navigation support
 * - Clear button purposes
 *
 * @param props - Component properties
 * @returns The rendered comparison controls
 *
 * @example
 * ```tsx
 * <ComparisonControls
 *   username1="octocat"
 *   username2=""
 *   isComparing={false}
 *   loading1={false}
 *   loading2={false}
 *   onUsernameChange1={(value) => setUsername1(value)}
 *   onUsernameChange2={(value) => setUsername2(value)}
 *   onSubmit={handleSubmit}
 *   onToggleComparing={() => setIsComparing(!isComparing)}
 * />
 * ```
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
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-1" data-testid="comparison-controls">
      {/* First user search form */}
      <SearchForm
        username={username1}
        onUsernameChange={onUsernameChange1}
        onSubmit={onSubmit}
        placeholder={isComparing ? "Enter first username..." : "Enter username..."}
        isLoading={loading1}
        className="w-full sm:w-auto"
        dataTestId="search-form-1"
      />

      {/* Comparison toggle button */}
      <button
        onClick={onToggleComparing}
        className={`w-full sm:w-auto px-4 py-2 rounded-md ${
          isComparing
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-blue-500 hover:bg-blue-600'
        } text-white`}
        aria-label={isComparing ? "Remove comparison" : "Enable comparison"}
        data-testid="toggle-comparison-button"
      >
        {isComparing ? 'Remove VS' : 'VS'}
      </button>

      {/* Second user search form (only shown when comparing) */}
      {isComparing && (
        <SearchForm
          username={username2}
          onUsernameChange={onUsernameChange2}
          onSubmit={onSubmit}
          placeholder="Enter second username..."
          isLoading={loading2}
          className="w-full sm:w-auto"
          dataTestId="search-form-2"
        />
      )}
    </div>
  );
}
