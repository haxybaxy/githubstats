import type { Meta, StoryObj } from '@storybook/react';
import { ComparisonView } from '../components/ComparisonView/ComparisonView';
import { ApolloProvider } from '@apollo/client';
import { client } from '../apollo-client';
import { MockedProvider } from '@apollo/client/testing';
import { GET_USER_INFO, GET_USER_CONTRIBUTIONS, GET_USER_REPOS } from '../graphql/queries';
import { mockUserInfoData, mockUserContributionsData, mockUserReposData, repoCommitMocks, secondUserRepoCommitMocks } from './mocks/githubData';
import { mockSecondUserInfoData, mockSecondUserContributionsData, mockSecondUserReposData } from './mocks/githubData';

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
    onSearchStateChange: (state: boolean) => console.log('Search state:', state),
    initialUsername1: 'octocat',
    initialUsername2: 'torvalds'
  },
  decorators: [
    (Story) => {
      const firstUserMocks = [
        {
          request: { query: GET_USER_INFO, variables: { username: 'octocat' } },
          result: mockUserInfoData
        },
        {
          request: { query: GET_USER_CONTRIBUTIONS, variables: { username: 'octocat' } },
          result: mockUserContributionsData
        },
        {
          request: { query: GET_USER_REPOS, variables: { username: 'octocat' } },
          result: mockUserReposData
        },
        ...repoCommitMocks,
        {
          request: { query: GET_USER_INFO, variables: { username: 'octocat' } },
          result: mockUserInfoData
        },
        {
          request: { query: GET_USER_CONTRIBUTIONS, variables: { username: 'octocat' } },
          result: mockUserContributionsData
        },
        {
          request: { query: GET_USER_REPOS, variables: { username: 'octocat' } },
          result: mockUserReposData
        },
        ...repoCommitMocks
      ];

      const secondUserMocks = [
        {
          request: { query: GET_USER_INFO, variables: { username: 'torvalds' } },
          result: mockSecondUserInfoData
        },
        {
          request: { query: GET_USER_CONTRIBUTIONS, variables: { username: 'torvalds' } },
          result: mockSecondUserContributionsData
        },
        {
          request: { query: GET_USER_REPOS, variables: { username: 'torvalds' } },
          result: mockSecondUserReposData
        },
        ...secondUserRepoCommitMocks,
        {
          request: { query: GET_USER_INFO, variables: { username: 'torvalds' } },
          result: mockSecondUserInfoData
        },
        {
          request: { query: GET_USER_CONTRIBUTIONS, variables: { username: 'torvalds' } },
          result: mockSecondUserContributionsData
        },
        {
          request: { query: GET_USER_REPOS, variables: { username: 'torvalds' } },
          result: mockSecondUserReposData
        },
        ...secondUserRepoCommitMocks
      ];

      return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
          <MockedProvider
            mocks={[...firstUserMocks, ...secondUserMocks]}
            addTypename={true}
          >
            <Story />
          </MockedProvider>
        </div>
      );
    }
  ]
};

export const WithPrefilledUserDark: Story = {
  ...WithPrefilledUser,
  parameters: {
    theme: 'dark'
  }
};
