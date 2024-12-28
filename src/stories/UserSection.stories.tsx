import type { Meta, StoryObj } from '@storybook/react';
import { UserSection } from '../components/UserSection/UserSection';

const meta = {
  title: 'Components/UserSection',
  component: UserSection,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof UserSection>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseUser = {
  login: 'johndoe',
  name: 'John Doe',
  bio: 'Full-stack developer passionate about React and TypeScript',
  avatarUrl: 'https://avatars.githubusercontent.com/u/1234567',
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

export const Default: Story = {
  args: {
    user: baseUser,
    isWinner: false,
    score: 75.5,
    isComparing: false,
    hasCompetitor: false,
  },
};

export const Winner: Story = {
  args: {
    user: baseUser,
    isWinner: true,
    score: 85.5,
    isComparing: true,
    hasCompetitor: true,
  },
};

export const Loser: Story = {
  args: {
    user: baseUser,
    isWinner: false,
    score: 65.5,
    isComparing: true,
    hasCompetitor: true,
  },
};

export const ComparingWithoutCompetitor: Story = {
  args: {
    user: baseUser,
    isWinner: false,
    score: 75.5,
    isComparing: true,
    hasCompetitor: false,
  },
};
