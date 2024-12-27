import { useComparisonState } from './hooks/useComparisonState';
import { useUserQueries } from './hooks/useUserQueries';
import { ComparisonControls } from './components/ComparisonControls';
import { ErrorDisplay } from './components/ErrorDisplay';
import { UserSection } from '../UserSection/UserSection';
import { RepositoryList } from '../RepositoryList/RepositoryList';
import { useGitHubRank } from '../../hooks/useGitHubRank';

/**
 * ComparisonView component that allows users to compare GitHub profiles
 *
 * This component orchestrates the comparison of two GitHub users by:
 * - Managing user input and search state
 * - Fetching user data from GitHub's API
 * - Calculating and displaying comparison results
 * - Rendering user profiles and repository lists
 *
 * @returns {JSX.Element} The rendered comparison view
 *
 * @example
 * ```tsx
 * <ComparisonView />
 * ```
 */
export function ComparisonView({ onSearchStateChange }: any) {

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
   * Update the handleSearch function to trigger the animation
   */
  const handleSearchSubmit = (e: React.FormEvent) => {
    handleSearch(e);
    onSearchStateChange(true);
  };

  return (
    <div className="text-center">
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
          <div className={state.isComparing ? '' : 'col-span-full'}>
            <UserSection
              user={user1Data}
              isWinner={state.isComparing && isWinner(1)}
              score={rankingResult?.user1Score}
              isComparing={state.isComparing}
              hasCompetitor={!!user2Data}
            />
            <RepositoryList
              repositories={user1Data.repositories.nodes || []}
              loading={loading1}
              error={error1 || undefined}
              owner={user1Data.login}
            />
          </div>
        )}

        {/* Second User Section */}
        {state.isComparing && (
          <div>
            {user2Data ? (
              <>
                <UserSection
                  user={user2Data}
                  isWinner={isWinner(2)}
                  score={rankingResult?.user2Score}
                  isComparing={state.isComparing}
                  hasCompetitor={true}
                />
                <RepositoryList
                  repositories={user2Data.repositories.nodes || []}
                  loading={loading2}
                  error={error2 || undefined}
                  owner={user2Data.login}
                />
              </>
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
