import { User } from '../../types/github';
import crownIcon from '../../assets/crown.svg';
import { InfoIcon } from '@primer/octicons-react';
import { UserSocialStats } from './UserSocialStats';

/**
 * Props for the UserProfile component
 *
 * @interface UserProfileProps
 * @property {User} user - The GitHub user data
 * @property {boolean} isWinner - Whether this user is the winner in a comparison
 * @property {number | undefined} score - User's percentile score
 * @property {boolean} isComparing - Whether the component is in comparison mode
 * @property {boolean} [hasCompetitor] - Whether there is another user to compare against
 */
export interface UserProfileProps {
  user: User;
  isWinner: boolean;
  score: number | undefined;
  isComparing: boolean;
  hasCompetitor?: boolean;
}

/**
 * Displays a user's profile information including their avatar, name, bio, and social stats
 *
 * Features:
 * - Avatar display with optional winner crown
 * - User name and login display
 * - Bio with line clamping
 * - Social statistics
 * - Score display with tooltip
 * - Dark mode support
 * - Responsive layout
 *
 * Visual Elements:
 * - User avatar with border
 * - Winner crown (when applicable)
 * - Name and username
 * - Truncated bio
 * - Score badge with tooltip
 * - Social stats display
 *
 * States:
 * - Normal display
 * - Winner state with crown
 * - Comparison mode with score
 * - Loading placeholders
 *
 * Score Display:
 * - Color-coded based on comparison result
 * - Tooltip with explanation
 * - Percentile formatting
 * - Conditional rendering
 *
 * Accessibility:
 * - Semantic HTML structure
 * - ARIA labels
 * - Tooltip keyboard access
 * - Screen reader support
 * - Color contrast compliance
 *
 * @param props - Component properties
 * @param props.user - GitHub user data
 * @param props.isWinner - Whether this user won the comparison
 * @param props.score - User's percentile score
 * @param props.isComparing - Whether in comparison mode
 * @param props.hasCompetitor - Whether there is another user to compare against
 * @returns The rendered user profile
 *
 * @example
 * ```tsx
 * <UserProfile
 *   user={userData}
 *   isWinner={true}
 *   score={98.5}
 *   isComparing={true}
 *   hasCompetitor={true}
 * />
 * ```
 */
export function UserProfile({
  user,
  isWinner,
  score,
  isComparing,
  hasCompetitor
}: UserProfileProps) {
  return (
    <div className="flex items-start space-x-4 min-h-[165px]" data-testid="user-profile">
          {/* Avatar with optional winner crown */}
          <div className="relative flex-shrink-0" data-testid="avatar-container">
            <img
              src={user.avatarUrl}
              alt={user.login}
              className="w-24 h-24 rounded-full border border-gray-200 dark:border-gray-700"
            />
            {isWinner && (
              <img
                src={crownIcon}
                alt="Winner"
                className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-10 h-10"
              />
            )}
          </div>

          {/* User info and social links */}
          <div className="flex-grow min-w-0" data-testid="user-info">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
              <div className="min-w-0">
                <h2 className="text-xl text-left font-semibold text-gray-900 dark:text-white truncate">
                <a
                    href={user.url}
                    className="hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                  {user.name || user.login}
                </a>
                </h2>
                <h3 className="text-base text-left text-gray-600 dark:text-gray-400 mb-2">
                <a
                    href={user.url}
                    className="hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                  {user.login}
                </a>
                </h3>
                {user.bio && (
                  <p className="text-gray-600 text-left dark:text-gray-400 text-sm mb-3 line-clamp-2">
                    {user.bio}
                  </p>
                )}
              </div>
              {score !== undefined && (
                <div className="flex items-center gap-1">
                  <div className={`text-sm font-medium px-3 py-1 rounded-full ${
                    isComparing && hasCompetitor
                      ? isWinner
                        ? 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-300'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-300'
                  }`}>
                    Percentile: {score.toFixed(1)}
                  </div>
                  <div className="group relative">
                    <InfoIcon className="h-4 w-4 text-gray-500 dark:text-gray-400 cursor-help" />
                    <div className="hidden group-hover:block absolute z-10 w-64 px-4 py-2 text-sm text-gray-500 bg-white dark:bg-gray-700 dark:text-gray-300 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 -left-[270px] top-0">
                      This percentile score indicates how this user ranks compared to other GitHub users based on various metrics including commits, stars, and contributions.
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Social stats and info */}
            <UserSocialStats user={user} />

          </div>
        </div>
  );
}
