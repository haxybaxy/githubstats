import { User } from '../../types/github';
import crownIcon from '../../assets/crown.svg';

interface UserSectionProps {
  user: User;
  isWinner?: boolean;
}

export function UserSection({ user, isWinner }: UserSectionProps) {
  const stats = [
    { label: 'Total Commits', value: user.contributionsCollection.totalCommitContributions },
    { label: 'Total PRs', value: user.contributionsCollection.totalPullRequestContributions },
    { label: 'Total Issues', value: user.contributionsCollection.totalIssueContributions },
    { label: 'Total Repositories', value: user.contributionsCollection.totalRepositoryContributions },
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
        <div>
          <h2 className="text-2xl font-bold text-left">{user.name}</h2>
          <p className="text-gray-600 text-left">{user.bio}</p>
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

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
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
