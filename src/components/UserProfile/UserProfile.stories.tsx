import type { Meta, StoryObj } from '@storybook/react';
import { UserProfile } from './UserProfile';

const meta: Meta<typeof UserProfile> = {
  component: UserProfile,
  title: 'Components/UserProfile',
};

export default meta;
type Story = StoryObj<typeof UserProfile>;

export const Default: Story = {
  args: {
    user: {
      name: 'John Doe',
      login: 'johndoe',
      avatarUrl: 'https://avatars.githubusercontent.com/u/1?v=4',
      bio: 'Software Engineer | Open Source Enthusiast',
      followers: {
        totalCount: 1000,
      },
      following: {
        totalCount: 500,
      },
    },
  },
};
