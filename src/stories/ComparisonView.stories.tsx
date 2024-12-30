import type { Meta, StoryObj } from '@storybook/react';
import { ComparisonView } from '../components/ComparisonView/ComparisonView';
import { ApolloProvider } from '@apollo/client';
import { client } from '../apollo-client';
import { MockedProvider } from '@apollo/client/testing';
import { GET_USER_INFO, GET_USER_CONTRIBUTIONS, GET_USER_REPOS } from '../graphql/queries';

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
  }
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
