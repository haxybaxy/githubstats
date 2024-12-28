import type { Meta, StoryObj } from '@storybook/react';
import { ComparisonView } from '../components/ComparisonView/ComparisonView';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { GET_USER_INFO, GET_USER_CONTRIBUTIONS, GET_USER_REPOS, SEARCH_USERS } from '../graphql/queries';

// Create mock data for the search functionality
const searchMockData = {
  search: {
    nodes: [
      {
        login: 'johndoe',
        name: 'John Doe',
        avatarUrl: 'https://avatars.githubusercontent.com/u/1234567'
      },
      {
        login: 'janedoe',
        name: 'Jane Doe',
        avatarUrl: 'https://avatars.githubusercontent.com/u/7654321'
      }
    ]
  }
};

// Create mock data for user profiles
const createUserMock = (login: string) => ({
  name: `${login.charAt(0).toUpperCase() + login.slice(1)}`,
  login,
  avatarUrl: `https://avatars.githubusercontent.com/u/${Math.floor(Math.random() * 1000000)}`,
  bio: 'Software Engineer | Open Source Enthusiast',
  location: 'San Francisco, CA',
  websiteUrl: `https://${login}.dev`,
  twitterUsername: login,
  followers: { totalCount: Math.floor(Math.random() * 1000) },
  following: { totalCount: Math.floor(Math.random() * 500) },
  socialAccounts: {
    nodes: [
      { provider: 'TWITTER', url: `https://twitter.com/${login}` }
    ]
  },
  contributionsCollection: {
    totalCommitContributions: Math.floor(Math.random() * 2000),
    totalPullRequestContributions: Math.floor(Math.random() * 200),
    totalIssueContributions: Math.floor(Math.random() * 100),
    totalRepositoryContributions: Math.floor(Math.random() * 50),
    contributionCalendar: {
      totalContributions: Math.floor(Math.random() * 2000),
      weeks: Array(52).fill({
        contributionDays: Array(7).fill({
          contributionCount: Math.floor(Math.random() * 10),
          date: new Date().toISOString()
        })
      })
    }
  },
  repositories: {
    totalCount: Math.floor(Math.random() * 100),
    totalStargazers: Array(10).fill({ stargazerCount: Math.floor(Math.random() * 1000) }),
    nodes: Array(10).fill(null).map((_, i) => ({
      id: `repo${i}`,
      name: `awesome-project-${i}`,
      description: 'A really cool project',
      url: `https://github.com/${login}/awesome-project-${i}`,
      stargazerCount: Math.floor(Math.random() * 1000),
      forkCount: Math.floor(Math.random() * 200),
      updatedAt: new Date().toISOString(),
      primaryLanguage: {
        name: ['TypeScript', 'JavaScript', 'Python', 'Rust'][Math.floor(Math.random() * 4)],
        color: '#2b7489'
      },
      languages: {
        nodes: [
          { name: 'TypeScript', color: '#2b7489' },
          { name: 'JavaScript', color: '#f1e05a' }
        ]
      }
    }))
  },
  pullRequests: { totalCount: Math.floor(Math.random() * 200) },
  issues: { totalCount: Math.floor(Math.random() * 100) }
});

// Create Apollo Client with mocked responses
const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
  },
});

// Add mocked responses
client.setLink({
  request: ({ operationName }) => {
    switch (operationName) {
      case 'SearchUsers':
        return Promise.resolve({ data: searchMockData });
      case 'GetUserInfo':
      case 'GetUserContributions':
      case 'GetUserRepositories':
        return Promise.resolve({ data: { user: createUserMock('johndoe') } });
      default:
        return Promise.resolve({ data: {} });
    }
  }
});

const meta = {
  title: 'Components/ComparisonView',
  component: ComparisonView,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <ApolloProvider client={client}>
        <Story />
      </ApolloProvider>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof ComparisonView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSearchStateChange: (state: boolean) => console.log('Search state:', state)
  }
};

export const WithPrefilledUser: Story = {
  args: {
    onSearchStateChange: (state: boolean) => console.log('Search state:', state)
  },
  parameters: {
    initialState: {
      username1: 'johndoe',
      searchedUsername1: 'johndoe'
    }
  }
};
