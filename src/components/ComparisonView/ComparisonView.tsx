import { useState, useEffect } from 'react';
import { useUserQueries } from '../../hooks/useUserQueries';
import { ComparisonControls } from './ComparisonControls';
import { ErrorDisplay } from './ErrorDisplay';
import { UserSection } from '../UserSection/UserSection';
import { RepositoryList } from '../RepositoryList/RepositoryList';
import { motion } from 'framer-motion';
import { useArgs } from '@storybook/preview-api';

/**
 * Props for the ComparisonView component
 */
export interface ComparisonViewProps {
  onSearchStateChange: (isSearchActive: boolean) => void;
  initialUsername?: string;
}

/**
 * View component that displays GitHub profile information
 */
export function ComparisonView({ onSearchStateChange, initialUsername }: ComparisonViewProps) {
  const [username, setUsername] = useState(initialUsername || '');
  const [searchedUsername, setSearchedUsername] = useState(initialUsername || '');

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
