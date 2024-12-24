import type { Meta, StoryObj } from '@storybook/react';
import { RepositoryCard } from './RepositoryCard';
import { MockedProvider } from '@apollo/client/testing';
import { GET_REPO_COMMITS } from '../../graphql/queries';

// Helper function to create commit mocks with random patterns
const createCommitMock = (owner: string, repoName: string) => {
  // Create a random pattern of commits
  const generateDailyCommits = (dayIndex: number) => {
    // More commits for recent days (lower index)
    const baseCommits = dayIndex < 30 ? 2 : 1;
    const randomFactor = Math.random();

    // Create multiple commit entries for the same day
    // Reduced multiplier from 5 to 2 for calmer pattern
    return Array.from(
      { length: Math.floor(baseCommits * randomFactor * 2) },
      () => ({
        committedDate: new Date(
          new Date().getTime() - (dayIndex * 24 * 60 * 60 * 1000)
        ).toISOString(),
        __typename: 'Commit'
      })
    );
  };

  // Generate 90 days of commits with random patterns
  const commits = Array.from({ length: 90 }, (_, i) => generateDailyCommits(i))
    .flat(); // Flatten the array of arrays

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

const meta = {
  title: 'Components/RepositoryCard',
  component: RepositoryCard,
  parameters: {
    layout: 'centered',
  },
  // Update decorator to handle multiple mocks
  decorators: [
    (Story, context) => {
      // Get the current story's repository data
      const { repository, owner } = context.args;
      // Create a mock specific to this story's repository
      const mock = createCommitMock(owner, repository.name);

      return (
        <MockedProvider mocks={[mock]} addTypename={true}>
          <Story />
        </MockedProvider>
      );
    },
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof RepositoryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    repository: {
      id: '1',
      name: 'example-repo',
      description: 'This is an example repository with a longer description to show how text wraps.',
      url: 'https://github.com/example/repo',
      primaryLanguage: {
        name: 'TypeScript',
        color: '#2b7489'
      },
      languages: { nodes: [] },
      stargazerCount: 1234,
      forkCount: 567,
      updatedAt: '2024-03-20T12:00:00Z'
    },
    owner: 'example'
  },
};

export const NoDescription: Story = {
  args: {
    repository: {
      id: '2',
      name: 'minimal-repo',
      description: '',
      url: 'https://github.com/example/minimal',
      primaryLanguage: {
        name: 'JavaScript',
        color: '#f1e05a'
      },
      languages: { nodes: [] },
      stargazerCount: 42,
      forkCount: 7,
      updatedAt: '2024-03-20T12:00:00Z'
    },
    owner: 'example'
  },
};

export const NoLanguage: Story = {
  args: {
    repository: {
      id: '3',
      name: 'no-language-repo',
      description: 'A repository without a primary language',
      url: 'https://github.com/example/nolang',
      primaryLanguage: null,
      languages: { nodes: [] },
      stargazerCount: 89,
      forkCount: 12,
      updatedAt: '2024-03-20T12:00:00Z'
    },
    owner: 'example'
  },
};
