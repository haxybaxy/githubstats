import { User } from '../../types/github';
import crownIcon from '../../assets/crown.svg';
import {
  PeopleIcon,
  PersonIcon,
  LocationIcon,
  LinkExternalIcon,
  RepoIcon,
  StarIcon,
  GitCommitIcon,
  IssueOpenedIcon,
  GitPullRequestIcon,
  BriefcaseIcon,
  InfoIcon
} from '@primer/octicons-react';

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
  /**
   * Calculates the total number of stars across all repositories
   * @returns {number} Total star count
   */
  const totalStars = user.repositories.totalStargazers.reduce(
    (sum, repo) => sum + repo.stargazerCount,
    0
  );

  /**
   * User statistics to display in the grid
   * @type {{ label: string; value: number }[]}
   */
  const stats = [
    {
      label: 'Total Commits',
      value: user.contributionsCollection.totalCommitContributions,
      icon: <GitCommitIcon className="h-5 w-5" />
    },
    {
      label: 'Total Stars',
      value: totalStars,
      icon: <StarIcon className="h-5 w-5" />
    },
    {
      label: 'Total PRs',
      value: user.pullRequests.totalCount,
      icon: <GitPullRequestIcon className="h-5 w-5" />
    },
    {
      label: 'Total Issues',
      value: user.issues.totalCount,
      icon: <IssueOpenedIcon className="h-5 w-5" />
    },
    {
      label: 'Total Repositories',
      value: user.repositories.totalCount,
      icon: <RepoIcon className="h-5 w-5" />
    },
  ];

  return (
    <div className={`mb-8 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 ${
      isWinner ? 'shadow-[0_0_15px_rgba(255,215,0,0.5)]' : ''
    }`}>
      {/* User profile section */}
      <div className="p-6">
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
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <PeopleIcon className="h-4 w-4" />
                <span className="font-medium text-gray-900 dark:text-white">
                  {user.followers.totalCount}
                </span>
                <span>followers</span>
              </div>
              <div className="flex items-center gap-1">
                <PersonIcon className="h-4 w-4" />
                <span className="font-medium text-gray-900 dark:text-white">
                  {user.following.totalCount}
                </span>
                <span>following</span>
              </div>

              {user.location && (
                <div className="flex items-center gap-1">
                  <LocationIcon className="h-4 w-4" />
                  <span>{user.location}</span>
                </div>
              )}

              {user.websiteUrl && (
                <div className="flex items-center gap-1">
                  <LinkExternalIcon className="h-4 w-4" />
                  <a
                    href={user.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline dark:text-blue-400"
                  >
                    {user.websiteUrl.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}

              {user.socialAccounts?.nodes.find(account => account.provider === 'LINKEDIN')?.url && (
                <div className="flex items-center gap-1">
                  <BriefcaseIcon className="h-4 w-4" />
                  <a
                    href={user.socialAccounts.nodes.find(account => account.provider === 'LINKEDIN')?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline dark:text-blue-400"
                  >
                    LinkedIn
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Statistics grid */}
      <div className="border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-2 md:grid-cols-5 divide-x md:divide-y-0 dark:divide-gray-700">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`p-3 md:p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors flex flex-col h-full ${
                index === stats.length - 1 ? 'col-span-2 md:col-span-1' : ''
              } ${
                index > 1 ? 'border-t border-gray-200 dark:border-gray-700 md:border-t-0' : ''
              }`}
            >
              <div className={`flex flex-col items-center ${
                isComparing ? 'md:flex-col' : 'md:flex-row md:gap-1.5'
              } text-gray-600 dark:text-gray-400`}>
                {stat.icon}
                <h3 className="text-sm leading-tight">{stat.label}</h3>
              </div>
              <p className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mt-auto pt-1">
                {stat.value.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
