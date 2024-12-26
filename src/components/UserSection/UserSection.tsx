import { User } from '../../types/github';
import crownIcon from '../../assets/crown.svg';

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
    { label: 'Total Commits', value: user.contributionsCollection.totalCommitContributions },
    { label: 'Total Stars', value: totalStars },
    { label: 'Total PRs', value: user.pullRequests.totalCount },
    { label: 'Total Issues', value: user.issues.totalCount },
    { label: 'Total Repositories', value: user.repositories.totalCount },
  ];

  return (
    <div className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      {/* User profile section */}
      <div className="flex items-center space-x-4">
        {/* Avatar with optional winner crown */}
        <div className="relative">
          <img
            src={user.avatarUrl}
            alt={user.login}
            className="w-20 h-20 rounded-full"
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
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-left text-gray-900 dark:text-white">
                {user.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-left">{user.bio}</p>
            </div>
            {score !== undefined && (
              <div className={`text-lg font-semibold ${
                isComparing && hasCompetitor
                  ? isWinner
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                  : 'text-blue-600 dark:text-blue-400'
              }`}>
                Percentile: {score.toFixed(1)}
              </div>
            )}
          </div>
          {/* Follower stats */}
          <div className="mt-2 flex space-x-4 text-gray-700 dark:text-gray-300">
            <span>👥 {user.followers.totalCount} followers</span>
            <span>👤 {user.following.totalCount} following</span>
          </div>
          {/* Contact and social info */}
          <div className="mt-2 text-left text-gray-600 dark:text-gray-400">
            {user.location && <div>📍 {user.location}</div>}
            {user.websiteUrl && (
              <div>
                🌐 <a href={user.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {user.websiteUrl}
                </a>
              </div>
            )}
            {user.twitterUsername && (
              <div>
                🐦 <a href={`https://twitter.com/${user.twitterUsername}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  @{user.twitterUsername}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Statistics grid */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-gray-600 dark:text-gray-400">{stat.label}</h3>
            <p className="text-gray-900 dark:text-white font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
