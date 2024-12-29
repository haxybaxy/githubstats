import { useComparisonState } from '../../hooks/useComparisonState';
import { useUserQueries } from '../../hooks/useUserQueries';
import { ComparisonControls } from './ComparisonControls';
import { ErrorDisplay } from './ErrorDisplay';
import { UserSection } from '../UserSection/UserSection';
import { RepositoryList } from '../RepositoryList/RepositoryList';
import { useGitHubRank } from '../../hooks/useGitHubRank';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

/**
 * Props for the ComparisonView component
 *
 * @interface ComparisonViewProps
 * @property {boolean} isSearchActive - Whether a search is currently active
 */
export interface ComparisonViewProps {
  onSearchStateChange: (isSearchActive: boolean) => void;
}

/**
 * ComparisonView component that allows users to compare GitHub profiles
 *
 * Features:
 * - Single or dual user profile comparison
 * - Real-time data fetching from GitHub API
 * - Animated transitions between states
 * - Responsive grid layout
 * - Score calculation and winner determination
 * - Repository list display for each user
 *
 * Component Structure:
 * - Error display section for API errors
 * - Search controls for user input
 * - User comparison grid
 *   - User sections with profile information
 *   - Repository lists for each user
 *
 * State Management:
 * - Handles user input and search state
 * - Manages loading states
 * - Tracks comparison mode
 * - Coordinates data fetching
 *
 * Animation Features:
 * - Smooth fade-in transitions
 * - Staggered content loading
 * - Layout animations for grid changes
 *
 * Error Handling:
 * - Displays user-friendly error messages
 * - Handles API rate limiting
 * - Manages network errors
 * - Validates user input
 *
 * @param props - Component properties
 * @param props.onSearchStateChange - Callback for search state changes
 * @returns The rendered comparison view
 *
 * @example
 * ```tsx
 * <ComparisonView
 *   onSearchStateChange={(isActive) => setSearchActive(isActive)}
 * />
 * ```
 */
export function ComparisonView({ onSearchStateChange }: ComparisonViewProps) {

  const { state, setState, handleSearch, toggleComparing } = useComparisonState();

  /**
   * Fetch data for the first user
   */
  const {
    userData: user1Data,
    loading: loading1,
    error: error1
  } = useUserQueries(state.searchedUsername1, false);

  /**
   * Fetch data for the second user (only when comparison is enabled)
   */
  const {
    userData: user2Data,
    loading: loading2,
    error: error2
  } = useUserQueries(state.searchedUsername2, !state.isComparing);

  /**
   * Calculate ranking results between the two users
   */
  const rankingResult = useGitHubRank(
    user1Data,
    (state.isComparing && user2Data) || user1Data || null
  );

  /**
   * Determines if a given user number is the winner of the comparison
   * @param {1 | 2} userNumber - The user number to check
   * @returns {boolean} True if the user is the winner
   */
  const isWinner = (userNumber: 1 | 2) => {
    return rankingResult?.winner === userNumber;
  };

  /**
   * Update the handleSearch function to only trigger animation on valid search
   */
  const handleSearchSubmit = async (e: React.FormEvent) => {
    handleSearch(e);
    // Don't trigger animation immediately - let the data load first
  };

  /**
   * Use an effect to monitor user data and errors
   */
  useEffect(() => {
    // Only trigger the animation if we have valid user data and no errors
    const isValidSearch = !!(user1Data && !error1);
    onSearchStateChange(isValidSearch);
  }, [user1Data, error1, onSearchStateChange]);

  return (
    <div data-testid="comparison-view" className="text-center">
      {/* Error Display Section */}
      {(error1 || error2) && (
        <div className="max-w-2xl mx-auto">
          {error1 && <ErrorDisplay error={error1} />}
          {error2 && <ErrorDisplay error={error2} />}
        </div>
      )}

      {/* Search Controls Section */}
      <ComparisonControls
        username1={state.username1}
        username2={state.username2}
        isComparing={state.isComparing}
        loading1={loading1}
        loading2={loading2}
        onUsernameChange1={(value) => setState(prev => ({ ...prev, username1: value }))}
        onUsernameChange2={(value) => setState(prev => ({ ...prev, username2: value }))}
        onSubmit={handleSearchSubmit}
        onToggleComparing={toggleComparing}
      />

      {/* User Comparison Grid */}
      <div className={`grid gap-4 mt-6 ${state.isComparing ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
        {/* First User Section */}
        {user1Data && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={state.isComparing ? '' : 'col-span-full'}
          >
            <UserSection
              user={user1Data}
              isWinner={state.isComparing && isWinner(1)}
              score={rankingResult?.user1Score}
              isComparing={state.isComparing}
              hasCompetitor={!!user2Data}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <RepositoryList
                repositories={user1Data.repositories.nodes || []}
                loading={loading1}
                error={error1 || undefined}
                owner={user1Data.login}
              />
            </motion.div>
          </motion.div>
        )}

        {/* Second User Section */}
        {state.isComparing && (
          <div>
            {user2Data ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <UserSection
                  user={user2Data}
                  isWinner={isWinner(2)}
                  score={rankingResult?.user2Score}
                  isComparing={state.isComparing}
                  hasCompetitor={true}
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <RepositoryList
                    repositories={user2Data.repositories.nodes || []}
                    loading={loading2}
                    error={error2 || undefined}
                    owner={user2Data.login}
                  />
                </motion.div>
              </motion.div>
            ) : (
              <div className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center justify-center h-40">
                <p className="text-gray-500 dark:text-gray-400">Enter a second username to compare</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
