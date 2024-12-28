import { User } from '../../types/github';
import crownIcon from '../../assets/crown.svg';
import { InfoIcon } from '@primer/octicons-react';
import { UserSocialStats } from './UserSocialStats';

/**
 * Props interface for the UserProfile component
 */
interface UserProfileProps {
  /** The GitHub user data */
  user: User;
  /** Whether this user is the winner in a comparison */
  isWinner: boolean;
  /** User's percentile score */
  score: number | undefined;
  /** Whether the component is in comparison mode */
  isComparing: boolean;
  /** Whether there is another user to compare against */
  hasCompetitor?: boolean;
}

/**
 * Displays a user's profile information including their avatar, name, bio, and social stats
 *
 * @param props - Component properties
 * @param props.user - GitHub user data
 * @param props.isWinner - Whether this user won the comparison
 * @param props.score - User's percentile score
 * @param props.isComparing - Whether in comparison mode
 * @param props.hasCompetitor - Whether there is another user to compare against
 * @returns The rendered user profile
 */
export function UserProfile({ user, isWinner, score, isComparing, hasCompetitor }: UserProfileProps) {
  return (
    <div className="flex items-start space-x-4">
          {/* Avatar with optional winner crown */}
          <div className="relative flex-shrink-0">
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
          <div className="flex-grow min-w-0">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
              <div className="min-w-0">
                <h2 className="text-xl text-left font-semibold text-gray-900 dark:text-white truncate">
                  {user.name || user.login}
                </h2>
                <h3 className="text-base text-left text-gray-600 dark:text-gray-400 mb-2">
                  {user.login}
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
