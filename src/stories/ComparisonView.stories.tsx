import type { Meta, StoryObj } from '@storybook/react';
import { ComparisonView } from '../components/ComparisonView/ComparisonView';
import { ApolloProvider } from '@apollo/client';
import { client } from '../apollo-client';
import { MockedProvider } from '@apollo/client/testing';
import { GET_USER_INFO, GET_USER_CONTRIBUTIONS, GET_USER_REPOS, GET_REPO_COMMITS } from '../graphql/queries';

const meta = {
  title: 'Components/ComparisonView',
  component: ComparisonView,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ComparisonView>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper function to create commit mocks with random patterns
const createCommitMock = (owner: string, repoName: string) => {
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

// Mock data for a pre-populated user
const mockUserData = {
  data: {
    user: {
      login: 'octocat',
      name: 'The Octocat',
      bio: 'Professional cat and GitHub mascot',
      avatarUrl: 'https://avatars.githubusercontent.com/u/583231',
      followers: { totalCount: 8000 },
      following: { totalCount: 9 },
      location: 'San Francisco',
      websiteUrl: 'https://github.blog',
      twitterUsername: 'github',
      repositories: {
        totalCount: 8,
        totalStargazers: [{ stargazerCount: 500 }],
        nodes: [
          {
            id: '1',
            name: 'Hello-World',
            description: 'My first repository on GitHub!',
            url: 'https://github.com/octocat/Hello-World',
            primaryLanguage: { name: 'JavaScript', color: '#f1e05a' },
            languages: { nodes: [] },
            stargazerCount: 500,
            forkCount: 200,
            updatedAt: '2024-03-20T12:00:00Z'
          }
        ]
      },
      pullRequests: { totalCount: 200 },
      issues: { totalCount: 100 },
      contributionsCollection: {
        totalCommitContributions: 1500,
        totalPullRequestContributions: 200,
        totalIssueContributions: 100,
        totalRepositoryContributions: 8,
        contributionCalendar: {
          totalContributions: 1800,
          weeks: []
        }
      },
      socialAccounts: {
        nodes: []
      }
    }
  }
};

// Create commit mocks for each repository
const repoCommitMocks = mockUserData.data.user.repositories.nodes.map(repo =>
  createCommitMock('octocat', repo.name)
);

// Mock responses for Apollo queries
const mocks = [
  {
    request: {
      query: GET_USER_INFO,
      variables: { username: 'octocat' }
    },
    result: mockUserData
  },
  {
    request: {
      query: GET_USER_CONTRIBUTIONS,
      variables: { username: 'octocat' }
    },
    result: mockUserData
  },
  {
    request: {
      query: GET_USER_REPOS,
      variables: { username: 'octocat' }
    },
    result: mockUserData
  },
  ...repoCommitMocks
];

export const Default: Story = {
  args: {
    onSearchStateChange: (state: boolean) => console.log('Search state:', state)
  },
  decorators: [
    (Story) => (
      <ApolloProvider client={client}>
        <Story />
      </ApolloProvider>
    ),
  ],
};

export const PrePopulated: Story = {
  args: {
    onSearchStateChange: (state: boolean) => console.log('Search state:', state),
    initialUsername: 'octocat'
  },
  decorators: [
    (Story) => (
      <MockedProvider mocks={mocks} addTypename={false}>
        <Story />
      </MockedProvider>
    ),
  ]
};
