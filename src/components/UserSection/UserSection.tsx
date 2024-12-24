import { User } from '../../types/github';
import crownIcon from '../../assets/crown.svg';

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
 * @param props - Component properties
 * @param props.user - GitHub user data
 * @param props.isWinner - Whether this user won the comparison
 * @param props.score - User's percentile score
 * @param props.isComparing - Whether the component is in comparison mode
 * @param props.hasCompetitor - Whether there is another user to compare against
 */
export function UserSection({ user, isWinner, score, isComparing, hasCompetitor }: UserSectionProps) {
  /**
   * Calculates the total number of stars across all repositories
   */
  const totalStars = user.repositories.totalStargazers.reduce(
    (sum, repo) => sum + repo.stargazerCount,
    0
  );

  /**
   * User statistics to display
   */
  const stats = [
    { label: 'Total Commits', value: user.contributionsCollection.totalCommitContributions },
    { label: 'Total Stars', value: totalStars },
    { label: 'Total PRs', value: user.pullRequests.totalCount },
    { label: 'Total Issues', value: user.issues.totalCount },
    { label: 'Total Repositories', value: user.repositories.totalCount },
  ];

  return (
    <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center space-x-4">
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
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-left">{user.name}</h2>
              <p className="text-gray-600 text-left">{user.bio}</p>
            </div>
            {score !== undefined && (
              <div className={`text-lg font-semibold ${
                isComparing && hasCompetitor
                  ? isWinner
                    ? 'text-green-600'
                    : 'text-red-600'
                  : 'text-blue-600'
              }`}>
                Percentile: {score.toFixed(1)}
              </div>
            )}
          </div>
          <div className="mt-2 flex space-x-4">
            <span>👥 {user.followers.totalCount} followers</span>
            <span>👤 {user.following.totalCount} following</span>
          </div>
          <div className="mt-2 text-left text-gray-600">
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

      <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card">
            <h3>{stat.label}</h3>
            <p>{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
