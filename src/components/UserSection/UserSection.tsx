import { User } from '../../types/github';
import { UserProfile } from './UserProfile';
import { UserStatsGrid } from './UserStatsGrid';

/**
 * Props for the UserSection component
 *
 * @interface UserSectionProps
 * @property {User} user - GitHub user data containing profile and statistics information
 * @property {number} [score] - User's percentile score (optional)
 * @property {string} [dataTestId] - Optional data-testid for testing
 */
export interface UserSectionProps {
  /** GitHub user data containing profile and statistics information */
  user: User;

  /** User's percentile score (optional) */
  score?: number;

  /** Optional data-testid for testing */
  dataTestId?: string;
}

/**
 * Displays comprehensive information about a GitHub user in a contained section
 *
 * Features:
 * - Complete user profile display
 * - Statistics grid layout
 * - Winner highlighting
 * - Score display
 * - Dark mode support
 * - Responsive design
 *
 * Component Structure:
 * - UserProfile component
 *   - Avatar and basic info
 *   - Social links
 *   - Bio
 * - UserStatsGrid component
 *   - Repository stats
 *   - Contribution data
 *   - Activity metrics
 *
 * Layout Features:
 * - Responsive padding
 * - Proper spacing between sections
 * - Border and shadow styling
 * - Rounded corners
 * - Background colors
 *
 *
 * @param props - Component properties
 * @param props.user - GitHub user data
 * @param props.score - User's percentile score
 * @param props.dataTestId - Optional data-testid for testing
 * @returns The rendered user section
 *
 * @example
 * ```tsx
 * <UserSection
 *   user={userData}
 *   isWinner={true}
 *   score={98.5}
 *   isComparing={true}
 *   hasCompetitor={true}
 *   dataTestId="user-section"
 * />
 * ```
 */
export function UserSection({
  user,
  score,
  dataTestId = 'user-section'
}: UserSectionProps) {
  return (
    <div className={`mb-8 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800`} data-testid={dataTestId}>
      {/* User profile section */}
      <div className="p-6">
        <UserProfile user={user} score={score}  />
      </div>

      {/* Statistics grid */}
      <UserStatsGrid user={user}  />

    </div>
  );
}
