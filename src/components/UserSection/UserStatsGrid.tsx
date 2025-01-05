import { User } from '../../types/github';
import {
  RepoIcon,
  StarIcon,
  GitCommitIcon,
  IssueOpenedIcon,
  GitPullRequestIcon,
} from '@primer/octicons-react';

/**
 * Props interface for the UserStatsGrid component
 *
 * @interface UserStatsGridProps
 * @property {User} user - The GitHub user data containing statistics
 * @property {boolean} isComparing - Whether the component is in comparison mode
 */
export interface UserStatsGridProps {
  user: User;
}

/**
 * Displays a grid of user statistics including commits, stars, PRs, issues, and repositories
 *
 * Features:
 * - Responsive grid layout
 * - Icon-based statistics display
 * - Automatic number formatting
 * - Dark mode support
 * - Comparison mode layout
 * - Hover state effects
 *
 * Grid Layout:
 * - Mobile: 2 columns with last item spanning full width
 * - Desktop: 5 equal columns
 * - Proper borders and dividers
 *
 * Statistics Displayed:
 * - Total Commits (with GitCommit icon)
 * - Total Stars (with Star icon)
 * - Total PRs (with GitPullRequest icon)
 * - Total Issues (with IssueOpened icon)
 * - Total Repositories (with Repo icon)
 *
 * Visual Features:
 * - Icon and label alignment
 * - Hover state highlighting
 * - Consistent spacing
 * - Border separators
 * - Number formatting
 *
 * @param props - Component properties
 * @param props.user - GitHub user data containing statistics
 * @returns The rendered statistics grid
 *
 * @example
 * ```tsx
 * <UserStatsGrid
 *   user={userData}
 * />
 * ```
 */
export function UserStatsGrid({
  user,
}: UserStatsGridProps) {
  /**
   * Calculates the total number of stars across all repositories
   * Reduces the stargazer counts from each repository into a single sum
   */
  const totalStars = user.repositories.totalStargazers.reduce(
    (sum, repo) => sum + repo.stargazerCount,
    0
  );

  /**
   * Array of statistics to display in the grid
   * Each stat includes:
   * - label: Display name of the statistic
   * - value: Numerical value from user data
   * - icon: Primer Octicon component for visual representation
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
    <div className="border-t border-gray-200 dark:border-gray-700" data-testid="stats-grid">
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
              <div className={`flex flex-col items-center md:flex-row md:gap-1.5 text-gray-600 dark:text-gray-400`}>
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
  );
}
