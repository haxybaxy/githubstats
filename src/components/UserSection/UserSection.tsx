import { User } from '../../types/github';
import { UserProfile } from './UserProfile';
import { UserStatsGrid } from './UserStatsGrid';

/**
 * Props for the UserSection component
 * @interface UserSectionProps
 */
interface UserSectionProps {
  /** GitHub user data */
  user: User;
  /** Whether this user won the comparison */
  isWinner: boolean;
  /** User's percentile score */
  score?: number;
  /** Whether the component is in comparison mode */
  isComparing: boolean;
  /** Whether there is another user to compare against */
  hasCompetitor?: boolean;
}

/**
 * Displays detailed information about a GitHub user including their profile,
 * statistics, and social links
 *
 * This component renders:
 * - User avatar with optional winner crown
 * - User name and bio
 * - Percentile score with color-coded status
 * - Follower and following counts
 * - Location and social links
 * - Key statistics in a grid layout
 *
 * @param {UserSectionProps} props - Component properties
 * @returns {JSX.Element} The rendered user section
 *
 * @example
 * ```tsx
 * <UserSection
 *   user={userData}
 *   isWinner={true}
 *   score={95.5}
 *   isComparing={true}
 *   hasCompetitor={true}
 * />
 * ```
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
