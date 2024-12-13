import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

interface User {
  name: string;
  login: string;
  avatarUrl: string;
  bio: string;
  location: string;
  websiteUrl: string;
  twitterUsername: string;
  followers: {
    totalCount: number;
  };
  following: {
    totalCount: number;
  };
  contributionsCollection: {
    totalCommitContributions: number;
    totalPullRequestContributions: number;
    totalIssueContributions: number;
    totalRepositoryContributions: number;
    contributionCalendar: {
      totalContributions: number;
      weeks: {
        contributionDays: {
          contributionCount: number;
          date: string;
        }[];
      }[];
    };
  };
}

interface Repository {
  id: string;
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  forkCount: number;
  updatedAt: string;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
  languages: {
    nodes: {
      name: string;
      color: string;
    }[];
  };
  issues: {
    totalCount: number;
  };
  pullRequests: {
    totalCount: number;
  };
}

const GET_USER_REPOS = gql`
  query GetUserRepositories($username: String!) {
    user(login: $username) {
      # Basic user info
      name
      login
      avatarUrl
      bio
      location
      websiteUrl
      twitterUsername
      followers {
        totalCount
      }
      following {
        totalCount
      }

      # Contribution stats
      contributionsCollection {
        totalCommitContributions
        totalPullRequestContributions
        totalIssueContributions
        totalRepositoryContributions
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }

      # Repository stats
      repositories(first: 100, orderBy: { field: STARGAZERS, direction: DESC }) {
        totalCount
        nodes {
          id
          name
          description
          url
          stargazerCount
          forkCount
          updatedAt
          primaryLanguage {
            name
            color
          }
          languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
            nodes {
              name
              color
            }
          }
          issues {
            totalCount
          }
          pullRequests {
            totalCount
          }
        }
      }
    }
  }
`;

function App() {
  const [username, setUsername] = useState('');
  const [searchExecuted, setSearchExecuted] = useState(false);

  const { loading, error, data } = useQuery(GET_USER_REPOS, {
    variables: { username },
    skip: !searchExecuted,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchExecuted(true);
  };

  return (
    <div className="min-h-screen w-screen bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            GitStats
          </h1>
          <form onSubmit={handleSearch} className="mt-8">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter GitHub username"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Search
            </button>
          </form>

          {data?.user && (
            <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center space-x-4">
                <img
                  src={data.user.avatarUrl}
                  alt={data.user.login}
                  className="w-20 h-20 rounded-full"
                />
                <div>
                  <h2 className="text-2xl font-bold">{data.user.name}</h2>
                  <p className="text-gray-600">{data.user.bio}</p>
                  <div className="mt-2 flex space-x-4">
                    <span>👥 {data.user.followers.totalCount} followers</span>
                    <span>👤 {data.user.following.totalCount} following</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="stat-card">
                  <h3>Total Commits</h3>
                  <p>{data.user.contributionsCollection.totalCommitContributions}</p>
                </div>
                <div className="stat-card">
                  <h3>Total PRs</h3>
                  <p>{data.user.contributionsCollection.totalPullRequestContributions}</p>
                </div>
                <div className="stat-card">
                  <h3>Total Issues</h3>
                  <p>{data.user.contributionsCollection.totalIssueContributions}</p>
                </div>
                <div className="stat-card">
                  <h3>Total Repositories</h3>
                  <p>{data.user.repositories.totalCount}</p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {loading && <p>Loading repositories...</p>}
            {error && <p className="text-red-500">Error: {error.message}</p>}
            {data?.user?.repositories.nodes.map((repo: Repository) => (
              <div
                key={repo.id}
                className="bg-white p-6 rounded-lg shadow-md text-left"
              >
                <h2 className="text-xl font-semibold">
                  <a href={repo.url} className="text-blue-600 hover:underline">
                    {repo.name}
                  </a>
                </h2>
                <p className="mt-2 text-black">{repo.description}</p>
                <div className="mt-4 flex items-center space-x-4">
                  {repo.primaryLanguage && (
                    <span className="flex items-center">
                      <span
                        className="w-3 h-3 rounded-full mr-1"
                        style={{ backgroundColor: repo.primaryLanguage.color }}
                      ></span>
                      {repo.primaryLanguage.name}
                    </span>
                  )}
                  <span>⭐ {repo.stargazerCount}</span>
                  <span>🍴 {repo.forkCount}</span>
                </div>
              </div>
            ))}
          </div>


        </div>
      </div>
    </div>
  );
}

export default App;
