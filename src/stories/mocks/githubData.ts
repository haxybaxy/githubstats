import { GET_REPO_COMMITS } from '../../graphql/queries';

// Base user data that's common across queries
const baseUserData = {
  login: 'octocat',
  name: 'The Octocat',
  bio: 'Professional cat and GitHub mascot',
  avatarUrl: 'https://avatars.githubusercontent.com/u/583231',
  location: 'San Francisco',
  websiteUrl: 'https://github.blog',
  twitterUsername: 'github',
  socialAccounts: {
    nodes: [
      {
        provider: 'TWITTER',
        url: 'https://twitter.com/github',
        __typename: 'SocialAccount'
      }
    ],
    __typename: 'SocialAccountConnection'
  },
  followers: {
    totalCount: 8000,
    __typename: 'FollowerConnection'
  },
  following: {
    totalCount: 9,
    __typename: 'FollowingConnection'
  },
  __typename: 'User'
};

export const createCommitMock = (owner: string, repoName: string) => {
  const generateDailyCommits = (dayIndex: number) => {
    const baseCommits = Math.sin((dayIndex / 90) * Math.PI * 4) + 1;
    const randomFactor = Math.random() * 0.5 + 0.5;
    return Array.from(
      { length: Math.round(baseCommits * randomFactor * 3) },
      () => ({
        committedDate: new Date(
          new Date().getTime() - (dayIndex * 24 * 60 * 60 * 1000)
        ).toISOString(),
        __typename: 'Commit'
      })
    );
  };

  const commits = Array.from({ length: 90 }, (_, i) => generateDailyCommits(i))
    .flat();

  return {
    request: {
      query: GET_REPO_COMMITS,
      variables: {
        owner,
        name: repoName,
      },
    },
    result: {
      data: {
        repository: {
          defaultBranchRef: {
            target: {
              history: {
                nodes: commits,
                __typename: 'CommitHistoryConnection'
              },
              __typename: 'Commit'
            },
            __typename: 'Ref'
          },
          __typename: 'Repository'
        }
      }
    }
  };
};

export const mockUserReposData = {
  data: {
    user: {
      login: 'octocat',
      repositories: {
        totalCount: 8,
        totalStargazers: [
          { stargazerCount: 500, __typename: 'Repository' },
          { stargazerCount: 300, __typename: 'Repository' }
        ],
        nodes: [
          {
            id: '1',
            name: 'Hello-World',
            description: 'My first repository on GitHub!',
            url: 'https://github.com/octocat/Hello-World',
            primaryLanguage: {
              name: 'JavaScript',
              color: '#f1e05a',
              __typename: 'Language'
            },
            languages: {
              nodes: [
                {
                  name: 'JavaScript',
                  color: '#f1e05a',
                  __typename: 'Language'
                }
              ],
              __typename: 'LanguageConnection'
            },
            stargazerCount: 500,
            forkCount: 200,
            updatedAt: '2024-03-20T12:00:00Z',
            __typename: 'Repository'
          },
          {
            id: '2',
            name: 'githubstats',
            description: 'A beautiful GitHub statistics analyzer and visualizer',
            url: 'https://github.com/octocat/githubstats',
            primaryLanguage: {
              name: 'TypeScript',
              color: '#2b7489',
              __typename: 'Language'
            },
            languages: {
              nodes: [
                {
                  name: 'TypeScript',
                  color: '#2b7489',
                  __typename: 'Language'
                },
                {
                  name: 'JavaScript',
                  color: '#f1e05a',
                  __typename: 'Language'
                }
              ],
              __typename: 'LanguageConnection'
            },
            stargazerCount: 300,
            forkCount: 150,
            updatedAt: '2024-03-19T15:30:00Z',
            __typename: 'Repository'
          }
        ],
        __typename: 'RepositoryConnection'
      },
      __typename: 'User'
    }
  }
};

// Create GraphQL query results
export const mockUserInfoData = {
  data: {
    user: baseUserData
  }
};

// Mock data for user contributions query
export const mockUserContributionsData = {
  data: {
    user: {
      contributionsCollection: {
        totalCommitContributions: 1500,
        totalPullRequestContributions: 200,
        totalIssueContributions: 100,
        totalRepositoryContributions: 8,
        contributionCalendar: {
          totalContributions: 1800,
          weeks: [
            {
              contributionDays: [
                {
                  contributionCount: 5,
                  date: '2024-03-20',
                  __typename: 'ContributionDay'
                }
              ],
              __typename: 'ContributionWeek'
            }
          ],
          __typename: 'ContributionCalendar'
        },
        __typename: 'ContributionsCollection'
      },
      pullRequests: {
        totalCount: 200,
        __typename: 'PullRequestConnection'
      },
      issues: {
        totalCount: 100,
        __typename: 'IssueConnection'
      },
      __typename: 'User'
    }
  }
};


export const repoCommitMocks = mockUserReposData.data.user.repositories.nodes.map(repo =>
  createCommitMock('octocat', repo.name)
);
