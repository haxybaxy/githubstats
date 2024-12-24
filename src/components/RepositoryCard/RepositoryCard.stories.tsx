import type { Meta, StoryObj } from '@storybook/react';
import { RepositoryCard } from './RepositoryCard';

const meta = {
  title: 'Components/RepositoryCard',
  component: RepositoryCard,
  parameters: {
    layout: 'centered',
  },
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
    }
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
    }
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
    }
  },
};
