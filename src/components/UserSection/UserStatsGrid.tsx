import { User } from '../../types/github';
import {
  RepoIcon,
  StarIcon,
  GitCommitIcon,
  IssueOpenedIcon,
  GitPullRequestIcon,
} from '@primer/octicons-react';

interface UserStatsGridProps {
  user: User;
  isComparing: boolean;
}

export function UserStatsGrid({ user, isComparing }: UserStatsGridProps) {
  const totalStars = user.repositories.totalStargazers.reduce(
    (sum, repo) => sum + repo.stargazerCount,
    0
  );

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
