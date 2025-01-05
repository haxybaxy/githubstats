import { User } from '../../types/github';
import { InfoIcon } from '@primer/octicons-react';
import { UserSocialStats } from './UserSocialStats';

/**
 * Props for the UserProfile component
 *
 * @interface UserProfileProps
 * @property {User} user - The GitHub user data
 * @property {number | undefined} score - User's percentile score
 */
export interface UserProfileProps {
  user: User;
  score: number | undefined;
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
 *
 * @param props - Component properties
 * @param props.user - GitHub user data
 * @param props.score - User's percentile score
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
  score,
}: UserProfileProps) {
  return (
    <div className="flex items-start space-x-4" data-testid="user-profile">
          {/* Avatar with optional winner crown */}
          <div className="relative flex-shrink-0" data-testid="avatar-container">
            <img
              src={user.avatarUrl}
              alt={user.login}
              className="w-24 h-24 rounded-full border border-gray-200 dark:border-gray-700"
            />
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
                  <div className={`text-sm font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-300`}>
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
