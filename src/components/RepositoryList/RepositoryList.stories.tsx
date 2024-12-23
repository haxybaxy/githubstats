import type { Meta, StoryObj } from '@storybook/react';
import { RepositoryList } from './RepositoryList';

const meta = {
  title: 'Components/RepositoryList',
  component: RepositoryList,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RepositoryList>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockRepositories = [
  {
    id: '1',
    name: 'awesome-project',
    description: 'A really awesome project with lots of features',
    url: 'https://github.com/example/awesome',
    primaryLanguage: { name: 'TypeScript', color: '#2b7489' },
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
    stargazerCount: 800,
    forkCount: 150,
    updatedAt: '2024-03-19T12:00:00Z'
  },
  // Add more mock repositories as needed
];

export const Default: Story = {
  args: {
    repositories: mockRepositories,
    loading: false,
    error: undefined,
  },
};

export const Loading: Story = {
  args: {
    repositories: [],
    loading: true,
    error: undefined,
  },
};

export const WithError: Story = {
  args: {
    repositories: [],
    loading: false,
    error: new Error('Failed to fetch repositories'),
  },
};

export const EmptyList: Story = {
  args: {
    repositories: [],
    loading: false,
    error: undefined,
  },
};
