import { User } from '../types/github';

export const mockUser: User = {
  login: 'testuser',
  name: 'Test User',
  bio: 'Test bio',
  avatarUrl: 'https://example.com/avatar.jpg',
  location: 'Test Location',
  url: 'https://github.com/testuser',
  websiteUrl: 'https://example.com',
  twitterUsername: 'testuser',
  followers: {
    totalCount: 100
  },
  following: {
    totalCount: 50
  },
  contributionsCollection: {
    totalCommitContributions: 1000,
    totalPullRequestContributions: 150,
    totalIssueContributions: 75,
    totalRepositoryContributions: 30,
    contributionCalendar: {
      totalContributions: 1255,
      weeks: [
        {
          contributionDays: [
            {
              contributionCount: 5,
              date: '2024-01-01'
            }
          ]
        }
      ]
    }
  },
  repositories: {
    totalCount: 30,
    totalStargazers: [
      { stargazerCount: 10 },
      { stargazerCount: 20 },
      { stargazerCount: 30 }
    ],
    nodes: [
      {
        id: '1',
        name: 'test-repo',
        description: 'Test repository',
        url: 'https://github.com/testuser/test-repo',
        stargazerCount: 10,
        forkCount: 5,
        updatedAt: '2024-01-01T00:00:00Z',
        primaryLanguage: {
          name: 'TypeScript',
          color: '#2b7489'
        },
        languages: {
          nodes: [
            {
              name: 'TypeScript',
              color: '#2b7489'
            },
            {
              name: 'JavaScript',
              color: '#f1e05a'
            }
          ]
        }
      }
    ]
  },
  pullRequests: {
    totalCount: 150
  },
  issues: {
    totalCount: 75
  },
  socialAccounts: {
    nodes: [
      {
        provider: 'LINKEDIN',
        url: 'https://linkedin.com/in/testuser'
      }
    ]
  }
};
