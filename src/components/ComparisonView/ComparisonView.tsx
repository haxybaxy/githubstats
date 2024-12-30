import { useState } from 'react';
import { useUserQueries } from '../../hooks/useUserQueries';
import { ComparisonControls } from './ComparisonControls';
import { ErrorDisplay } from './ErrorDisplay';
import { UserSection } from '../UserSection/UserSection';
import { RepositoryList } from '../RepositoryList/RepositoryList';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

/**
 * Props for the ComparisonView component
 */
export interface ComparisonViewProps {
  onSearchStateChange: (isSearchActive: boolean) => void;
}

/**
 * View component that displays GitHub profile information
 *
 * Features:
 * - Single user profile display
 * - Real-time data fetching from GitHub API
 * - Animated transitions between states
 * - Repository list display
 *
 * Component Structure:
 * - Error display section for API errors
 * - Search controls for user input
 * - User profile section
 *   - Profile information
 *   - Repository list
 *
 * State Management:
 * - Handles user input and search state
 * - Manages loading states
 * - Coordinates data fetching
 *
 * Animation Features:
 * - Smooth fade-in transitions
 * - Staggered content loading
 *
 * Error Handling:
 * - Displays user-friendly error messages
 * - Handles API rate limiting
 * - Manages network errors
 * - Validates user input
 *
 * @param props - Component properties
 * @param props.onSearchStateChange - Callback for search state changes
 * @returns The rendered profile view
 *
 * @example
 * ```tsx
 * <ComparisonView
 *   onSearchStateChange={(isActive) => setSearchActive(isActive)}
 * />
 * ```
 */
export function ComparisonView({ onSearchStateChange }: ComparisonViewProps) {
  const [username, setUsername] = useState('');
  const [searchedUsername, setSearchedUsername] = useState('');

  /**
   * Fetch data for the user
   */
  const {
    userData,
    loading,
    error
  } = useUserQueries(searchedUsername, false);

  /**
   * Handle form submission
   */
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchedUsername(username);
  };

  /**
   * Use an effect to monitor user data and errors
   */
  useEffect(() => {
    const isValidSearch = !!(userData && !error);
    onSearchStateChange(isValidSearch);
  }, [userData, error, onSearchStateChange]);

  return (
    <div data-testid="comparison-view" className="text-center">
      {/* Error Display Section */}
      {error && (
        <div className="max-w-2xl mx-auto" data-testid="error-section">
          <ErrorDisplay error={error} data-testid="error-display" />
        </div>
      )}

      {/* Search Controls Section */}
      <ComparisonControls
        username={username}
        loading={loading}
        onUsernameChange={setUsername}
        onSubmit={handleSearchSubmit}
      />

      {/* User Section */}
      {userData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6"
          data-testid="user-section"
        >
          <UserSection
            user={userData}
            isWinner={false}
            score={undefined}
            isComparing={false}
            hasCompetitor={false}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            data-testid="repository-list"
          >
            <RepositoryList
              repositories={userData.repositories.nodes || []}
              loading={loading}
              error={error || undefined}
              owner={userData.login}
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
