import { useState } from 'react';

/**
 * Interface for the comparison state
 * @interface ComparisonState
 */
interface ComparisonState {
  /** Input value for first username */
  username1: string;
  /** Input value for second username */
  username2: string;
  /** Currently searched first username */
  searchedUsername1: string;
  /** Currently searched second username */
  searchedUsername2: string;
  /** Whether comparison mode is active */
  isComparing: boolean;
}

/**
 * Interface for the hook's return value
 * @interface ComparisonStateHook
 */
interface ComparisonStateHook {
  /** Current state object */
  state: ComparisonState;
  /** State setter function */
  setState: React.Dispatch<React.SetStateAction<ComparisonState>>;
  /** Handler for form submission */
  handleSearch: (e: React.FormEvent) => void;
  /** Handler for toggling comparison mode */
  toggleComparing: () => void;
}

/**
 * Custom hook for managing comparison state between two GitHub users
 *
 * Features:
 * - Manages input and search state for two usernames
 * - Handles comparison mode toggling
 * - Provides form submission handling
 * - Maintains search history
 *
 * State Management:
 * - Tracks current input values
 * - Stores searched username history
 * - Controls comparison mode
 * - Handles state updates
 *
 * Form Handling:
 * - Prevents default form submission
 * - Updates searched usernames
 * - Manages form state
 *
 * @returns {ComparisonStateHook} State and handlers for comparison functionality
 *
 * @example
 * ```tsx
 * const {
 *   state,
 *   setState,
 *   handleSearch,
 *   toggleComparing
 * } = useComparisonState();
 *
 * // Use in a form
 * <form onSubmit={handleSearch}>
 *   <input
 *     value={state.username1}
 *     onChange={e => setState(prev => ({ ...prev, username1: e.target.value }))}
 *   />
 * </form>
 * ```
 */
export function useComparisonState(): ComparisonStateHook {
  /**
   * Initialize state with default values
   */
  const [state, setState] = useState<ComparisonState>({
    username1: '',
    username2: '',
    searchedUsername1: '',
    searchedUsername2: '',
    isComparing: false,
  });

  /**
   * Handles form submission by updating searched usernames
   * @param {React.FormEvent} e - Form event
   */
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setState(prev => ({
      ...prev,
      searchedUsername1: prev.username1,
      searchedUsername2: prev.username2,
    }));
  };

  /**
   * Toggles comparison mode and resets second username if disabled
   */
  const toggleComparing = () => {
    setState(prev => ({
      ...prev,
      isComparing: !prev.isComparing,
      username2: '',
      searchedUsername2: '',
    }));
  };

  return {
    state,
    setState,
    handleSearch,
    toggleComparing,
  };
}
