import type { Meta, StoryObj } from '@storybook/react';
import { StatsGrid } from './StatsGrid';

const meta: Meta<typeof StatsGrid> = {
  component: StatsGrid,
  title: 'Components/StatsGrid',
};

export default meta;
type Story = StoryObj<typeof StatsGrid>;

export const Default: Story = {
  args: {
    stats: [
      { label: 'Total Commits', value: 1234 },
      { label: 'Total PRs', value: 567 },
      { label: 'Total Issues', value: 89 },
      { label: 'Total Repositories', value: 45 },
    ],
  },
};

export const SingleStat: Story = {
  args: {
    stats: [
      { label: 'Total Commits', value: 1234 },
    ],
  },
};
