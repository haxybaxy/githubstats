import type { Meta, StoryObj } from '@storybook/react';
import { RepositoryList } from '../components/RepositoryList/RepositoryList';
import { MockedProvider } from '@apollo/client/testing';
import { ThemeDecorator } from './decorators/ThemeDecorator';
import { mockUserReposData, createCommitMock } from './mocks/githubData';

// Use the repositories from our shared mock data
const mockRepositories = mockUserReposData.data.user.repositories.nodes;

const meta = {
  title: 'Components/RepositoryList',
  component: RepositoryList,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    ThemeDecorator,
    (Story, context) => {
      // Create mocks for all repositories
      const mocks = (context.args.repositories || []).map(repo =>
        createCommitMock(context.args.owner, repo.name)
      );

      return (
        <div className="p-6 bg-white dark:bg-gray-900">
          <MockedProvider mocks={mocks} addTypename={true}>
            <Story />
          </MockedProvider>
        </div>
      );
    },
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof RepositoryList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    repositories: mockRepositories,
    loading: false,
    error: undefined,
    owner: 'octocat'
  },
  parameters: {
    theme: 'light',
  },
};

export const Dark: Story = {
  args: {
    repositories: mockRepositories,
    loading: false,
    error: undefined,
    owner: 'octocat'
  },
  parameters: {
    theme: 'dark',

  },
};

export const Loading: Story = {
  args: {
    repositories: [],
    loading: true,
    error: undefined,
    owner: 'example'
  },
  parameters: {
    theme: 'light',
  },
};

export const WithError: Story = {
  args: {
    repositories: [],
    loading: false,
    error: new Error('Failed to fetch repositories'),
    owner: 'example'
  },
  parameters: {
    theme: 'light',
  },
};

export const EmptyList: Story = {
  args: {
    repositories: [],
    loading: false,
    error: undefined,
    owner: 'example'
  },
  parameters: {
    theme: 'light',
  },
};
