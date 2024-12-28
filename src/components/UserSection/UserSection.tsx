import { User } from '../../types/github';
import { UserProfile } from './UserProfile';
import { UserStatsGrid } from './UserStatsGrid';

/**
 * Props for the UserSection component
 */
interface UserSectionProps {
  /** GitHub user data containing profile and statistics information */
  user: User;
  /** Whether this user won the comparison */
  isWinner: boolean;
  /** User's percentile score (optional) */
  score?: number;
  /** Whether the component is in comparison mode */
  isComparing: boolean;
  /** Whether there is another user to compare against */
  hasCompetitor?: boolean;
}

/**
 * Displays comprehensive information about a GitHub user in a contained section
 *
 * This component serves as the main container for user information, combining:
 * - UserProfile: Avatar, name, bio, and social links
 * - UserStatsGrid: Key statistics in a grid layout
 *
 * When in comparison mode, it can highlight the winning user with a golden shadow
 * and display comparative statistics appropriately.
 *
 * @param props - Component properties
 * @param props.user - GitHub user data
 * @param props.isWinner - Whether this user won the comparison
 * @param props.score - User's percentile score
 * @param props.isComparing - Whether in comparison mode
 * @param props.hasCompetitor - Whether there is another user to compare against
 * @returns The rendered user section
 */
export function UserSection({ user, isWinner, score, isComparing, hasCompetitor }: UserSectionProps) {
  return (
    <div className={`mb-8 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 ${
      isWinner ? 'shadow-[0_0_15px_rgba(255,215,0,0.5)]' : ''
    }`}>
      {/* User profile section */}
      <div className="p-6">
        <UserProfile user={user} isWinner={isWinner} score={score} isComparing={isComparing} hasCompetitor={hasCompetitor} />
      </div>

      {/* Statistics grid */}
      <UserStatsGrid user={user} isComparing={isComparing} />

    </div>
  );
}
