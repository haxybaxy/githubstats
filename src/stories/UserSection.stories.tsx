import type { Meta, StoryObj } from '@storybook/react';
import { UserSection } from '../components/UserSection/UserSection';
import { ThemeDecorator } from './decorators/ThemeDecorator';

const meta = {
  title: 'Components/UserSection',
  component: UserSection,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [ThemeDecorator],
} satisfies Meta<typeof UserSection>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseUser = {
  login: 'johndoe',
  name: 'John Doe',
  bio: 'Full-stack developer passionate about React and TypeScript',
  avatarUrl: 'https://avatars.githubusercontent.com/u/1234567',
  url: 'https://github.com/johndoe',
  followers: { totalCount: 150 },
  following: { totalCount: 89 },
  location: 'San Francisco, CA',
  websiteUrl: 'https://johndoe.dev',
  twitterUsername: 'johndoedev',
  repositories: {
    totalCount: 45,
    totalStargazers: [{ stargazerCount: 100 }],
    nodes: []
  },
  pullRequests: { totalCount: 156 },
  issues: { totalCount: 89 },
  contributionsCollection: {
    totalCommitContributions: 1234,
    totalPullRequestContributions: 156,
    totalIssueContributions: 89,
    totalRepositoryContributions: 45,
    contributionCalendar: {
      totalContributions: 0,
      weeks: [],
    },
  },
  socialAccounts: {
    nodes: []
  }
};

export const Light: Story = {
  args: {
    user: baseUser,
    score: 75.5,
  },
  parameters: {
    theme: 'light',
  },
};

export const Dark: Story = {
  args: {
    user: baseUser,
    score: 75.5,
  },
  parameters: {
    theme: 'dark',
  },
};
