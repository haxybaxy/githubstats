import type { Meta, StoryObj } from '@storybook/react';
import { UserSection } from './UserSection';

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

export const Default: Story = {
  args: {
    user: {
      login: 'johndoe',
      name: 'John Doe',
      bio: 'Full-stack developer passionate about React and TypeScript',
      avatarUrl: 'https://avatars.githubusercontent.com/u/1234567',
      followers: { totalCount: 150 },
      following: { totalCount: 89 },
      location: 'San Francisco, CA',
      websiteUrl: 'https://johndoe.dev',
      twitterUsername: 'johndoedev',
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
    },
  },
};

export const MinimalProfile: Story = {
  args: {
    user: {
      login: 'minimaluser',
      name: 'Minimal User',
      bio: '',
      avatarUrl: 'https://avatars.githubusercontent.com/u/7654321',
      followers: { totalCount: 10 },
      following: { totalCount: 5 },
      location: '',
      websiteUrl: '',
      twitterUsername: '',
      contributionsCollection: {
        totalCommitContributions: 50,
        totalPullRequestContributions: 5,
        totalIssueContributions: 2,
        totalRepositoryContributions: 3,
        contributionCalendar: {
          totalContributions: 0,
          weeks: [],
        },
      },
    },
  },
};

export const HighlyActive: Story = {
  args: {
    user: {
      login: 'superdev',
      name: 'Super Developer',
      bio: 'Open source enthusiast | Core contributor to major projects',
      avatarUrl: 'https://avatars.githubusercontent.com/u/8765432',
      followers: { totalCount: 5000 },
      following: { totalCount: 200 },
      location: 'Remote',
      websiteUrl: 'https://superdev.tech',
      twitterUsername: 'superdev',
      contributionsCollection: {
        totalCommitContributions: 15000,
        totalPullRequestContributions: 2000,
        totalIssueContributions: 500,
        totalRepositoryContributions: 150,
        contributionCalendar: {
          totalContributions: 0,
          weeks: [],
        },
      },
    },
  },
};

export const LongBioAndLinks: Story = {
  args: {
    user: {
      login: 'verbose',
      name: 'Verbose Developer',
      bio: 'Senior Software Engineer with 10+ years of experience in web development. Specialized in React, Node.js, and cloud architecture. Currently working on improving developer experience and building scalable solutions.',
      avatarUrl: 'https://avatars.githubusercontent.com/u/9876543',
      followers: { totalCount: 300 },
      following: { totalCount: 150 },
      location: 'New York City, NY',
      websiteUrl: 'https://really-long-website-name-that-might-overflow.com',
      twitterUsername: 'really_long_twitter_handle_that_might_overflow',
      contributionsCollection: {
        totalCommitContributions: 3000,
        totalPullRequestContributions: 450,
        totalIssueContributions: 200,
        totalRepositoryContributions: 75,
        contributionCalendar: {
          totalContributions: 0,
          weeks: [],
        },
      },
    },
  },
};
