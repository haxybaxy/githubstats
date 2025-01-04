import type { Meta, StoryObj } from '@storybook/react';
import { ComparisonView } from '../components/ComparisonView/ComparisonView';
import { MockedProvider } from '@apollo/client/testing';
import { GET_USER_INFO, GET_USER_CONTRIBUTIONS, GET_USER_REPOS } from '../graphql/queries';
import { ThemeDecorator } from './decorators/ThemeDecorator';
import { mockUserInfoData, mockUserReposData, mockUserContributionsData, repoCommitMocks } from './mocks/githubData';

const meta = {
  title: 'Components/ComparisonView',
  component: ComparisonView,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    ThemeDecorator,
    (Story) => (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof ComparisonView>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Light: Story = {
  args: {
    onSearchStateChange: (state: boolean) => console.log('Search state:', state)
  },
  decorators: [
    (Story) => (
      <MockedProvider mocks={[]} addTypename={true}>
        <Story />
      </MockedProvider>
    ),
  ],
  parameters: {
    theme: 'light',
  },
};

export const Dark: Story = {
  args: {
    onSearchStateChange: (state: boolean) => console.log('Search state:', state)
  },
  decorators: [
    (Story) => (
      <MockedProvider mocks={[]} addTypename={true}>
        <Story />
      </MockedProvider>
    ),
  ],
  parameters: {
    theme: 'dark',
  },
};

export const PrePopulated: Story = {
  args: {
    onSearchStateChange: (state: boolean) => console.log('Search state:', state),
    initialUsername: 'octocat'
  },
  decorators: [
    (Story) => {
      const baseMocks = [
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

      return (
        <MockedProvider mocks={[...baseMocks, ...baseMocks, ...baseMocks]} addTypename={true}>
          <Story />
        </MockedProvider>
      );
    },
  ],
  parameters: {
    theme: 'light',
  },
};

export const PrePopulatedDark: Story = {
  args: {
    onSearchStateChange: (state: boolean) => console.log('Search state:', state),
    initialUsername: 'octocat'
  },
  decorators: [
    (Story) => {
      const baseMocks = [
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

      return (
        <MockedProvider mocks={[...baseMocks, ...baseMocks, ...baseMocks]} addTypename={true}>
          <Story />
        </MockedProvider>
      );
    },
  ],
  parameters: {
    theme: 'dark',
  },
};

export const WithError: Story = {
  args: {
    onSearchStateChange: (state: boolean) => console.log('Search state:', state),
    initialUsername: 'octocat'
  },
  decorators: [
    (Story) => {
      const errorMock = {
        request: { query: GET_USER_INFO, variables: { username: 'octocat' } },
        error: new Error('Rate limit exceeded. Please try again later.')
      };

      return (
        <MockedProvider mocks={[errorMock]} addTypename={true}>
          <Story />
        </MockedProvider>
      );
    },
  ],
  parameters: {
    theme: 'light',
  },
};
