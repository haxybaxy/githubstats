import type { Meta, StoryObj } from '@storybook/react';
import { RepositoryCard } from './RepositoryCard';

const meta: Meta<typeof RepositoryCard> = {
  component: RepositoryCard,
  title: 'Components/RepositoryCard',
};

export default meta;
type Story = StoryObj<typeof RepositoryCard>;

export const Default: Story = {
  args: {
    repository: {
      id: '1',
      name: 'example-repo',
      description: 'This is an example repository',
      url: 'https://github.com/example/repo',
      stargazerCount: 100,
      forkCount: 20,
      primaryLanguage: {
        name: 'TypeScript',
        color: '#2b7489',
      },
    },
  },
};
