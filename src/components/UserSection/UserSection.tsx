import { User } from '../../types/github';
import { UserProfile } from './UserProfile';
import { UserStatsGrid } from './UserStatsGrid';

/**
 * Props for the UserSection component
 *
 * @interface UserSectionProps
 * @property {User} user - GitHub user data containing profile and statistics information
 * @property {boolean} isWinner - Whether this user won the comparison
 * @property {number} [score] - User's percentile score (optional)
 * @property {boolean} isComparing - Whether the component is in comparison mode
 * @property {boolean} [hasCompetitor] - Whether there is another user to compare against
 */
export interface UserSectionProps {
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
 * Features:
 * - Complete user profile display
 * - Statistics grid layout
 * - Winner highlighting
 * - Score display
 * - Dark mode support
 * - Responsive design
 *
 * Component Structure:
 * - Container with optional winner highlight
 * - UserProfile component
 *   - Avatar and basic info
 *   - Social links
 *   - Bio
 * - UserStatsGrid component
 *   - Repository stats
 *   - Contribution data
 *   - Activity metrics
 *
 * Visual States:
 * - Normal display
 * - Winner state with golden shadow
 * - Comparison mode with scores
 * - Dark/light mode variants
 *
 * Layout Features:
 * - Responsive padding
 * - Proper spacing between sections
 * - Border and shadow styling
 * - Rounded corners
 * - Background colors
 *
 * Accessibility:
 * - Semantic structure
 * - ARIA attributes
 * - Color contrast
 * - Focus management
 * - Screen reader support
 *
 * @param props - Component properties
 * @param props.user - GitHub user data
 * @param props.isWinner - Whether this user won the comparison
 * @param props.score - User's percentile score
 * @param props.isComparing - Whether in comparison mode
 * @param props.hasCompetitor - Whether there is another user to compare against
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
 * />
 * ```
 */
export function UserSection({
  user,
  isWinner,
  score,
  isComparing,
  hasCompetitor
}: UserSectionProps) {
  return (
    <div className={`mb-8 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 ${
      isWinner ? 'shadow-[0_0_15px_rgba(255,215,0,0.5)]' : ''
    }`} data-testid="user-section">
      {/* User profile section */}
      <div className="p-6">
        <UserProfile user={user} isWinner={isWinner} score={score} isComparing={isComparing} hasCompetitor={hasCompetitor} />
      </div>

      {/* Statistics grid */}
      <UserStatsGrid user={user} isComparing={isComparing} />

    </div>
  );
}
