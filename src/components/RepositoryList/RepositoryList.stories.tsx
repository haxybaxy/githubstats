import type { Meta, StoryObj } from '@storybook/react';
import { RepositoryList } from './RepositoryList';
import { MockedProvider } from '@apollo/client/testing';
import { GET_REPO_COMMITS } from '../../graphql/queries';

// Reuse the same commit mock generator
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

const mockRepositories = [
  {
    id: '1',
    name: 'awesome-project',
    description: 'A really awesome project with lots of features',
    url: 'https://github.com/example/awesome',
    primaryLanguage: { name: 'TypeScript', color: '#2b7489' },
    languages: { nodes: [] },
    pullRequests: { totalCount: 0 },
    stargazerCount: 1200,
    forkCount: 300,
    updatedAt: '2024-03-20T12:00:00Z'
  },
  {
    id: '2',
    name: 'cool-lib',
    description: 'A cool library for doing cool things',
    url: 'https://github.com/example/cool-lib',
    primaryLanguage: { name: 'JavaScript', color: '#f1e05a' },
    languages: { nodes: [] },
    pullRequests: { totalCount: 0 },
    stargazerCount: 800,
    forkCount: 150,
    updatedAt: '2024-03-19T12:00:00Z'
  },
];

const meta = {
  title: 'Components/RepositoryList',
  component: RepositoryList,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story, context) => {
      // Create mocks for all repositories
      const mocks = (context.args.repositories || []).map(repo =>
        createCommitMock('example', repo.name)
      );

      return (
        <MockedProvider mocks={mocks} addTypename={true}>
          <Story />
        </MockedProvider>
      );
    },
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof RepositoryList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    repositories: mockRepositories,
    loading: false,
    error: undefined,
    owner: 'example'
  },
};

export const Loading: Story = {
  args: {
    repositories: [],
    loading: true,
    error: undefined,
    owner: 'example'
  },
};

export const WithError: Story = {
  args: {
    repositories: [],
    loading: false,
    error: new Error('Failed to fetch repositories'),
    owner: 'example'
  },
};

export const EmptyList: Story = {
  args: {
    repositories: [],
    loading: false,
    error: undefined,
    owner: 'example'
  },
};
