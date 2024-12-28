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
 */
interface UserStatsGridProps {
  /** The GitHub user data */
  user: User;
  /** Whether the component is in comparison mode */
  isComparing: boolean;
}

/**
 * Displays a grid of user statistics including commits, stars, PRs, issues, and repositories
 *
 * The grid adapts its layout based on screen size and whether it's in comparison mode.
 * Each statistic is displayed with an icon and value.
 *
 * Layout behavior:
 * - Mobile: 2 columns with last item spanning full width
 * - Desktop: 5 equal columns
 * - Comparison mode: Icons stack vertically instead of horizontal alignment
 *
 * @param props - Component properties
 * @param props.user - GitHub user data containing statistics
 * @param props.isComparing - Whether in comparison mode, affects layout
 * @returns The rendered statistics grid
 */
export function UserStatsGrid({ user, isComparing }: UserStatsGridProps) {
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
  );
}
