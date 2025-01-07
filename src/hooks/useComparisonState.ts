import { useState } from 'react';

/**
 * Interface for the comparison state
 * @interface ComparisonState
 * @property {string} username1 - Input value for first username
 * @property {string} username2 - Input value for second username
 * @property {string} searchedUsername1 - Currently searched first username
 * @property {string} searchedUsername2 - Currently searched second username
 * @property {boolean} isComparing - Whether comparison mode is active
 */
export interface ComparisonState {
  username1: string;
  username2: string;
  searchedUsername1: string;
  searchedUsername2: string;
  isComparing: boolean;
}

/**
 * Interface for the hook's return value
 * @interface ComparisonStateHook
 * @property {ComparisonState} state - Current state object
 * @property {React.Dispatch<React.SetStateAction<ComparisonState>>} setState - State setter function
 * @property {(e: React.FormEvent) => void} handleSearch - Handler for form submission
 * @property {() => void} toggleComparing - Handler for toggling comparison mode
 */
export interface ComparisonStateHook {
  state: ComparisonState;
  setState: React.Dispatch<React.SetStateAction<ComparisonState>>;
  handleSearch: (e: React.FormEvent) => void;
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
export function useComparisonState(initialUsername1?: string, initialUsername2?: string): ComparisonStateHook {
  /**
   * Initialize state with default values
   */
  const [state, setState] = useState({
    username1: initialUsername1 || '',
    username2: initialUsername2 || '',
    searchedUsername1: initialUsername1 || '',
    searchedUsername2: initialUsername2 || '',
    isComparing: !!initialUsername2
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
