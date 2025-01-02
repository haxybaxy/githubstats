import type { Meta, StoryObj } from '@storybook/react';
import { Logo } from '../components/MainView/Logo';

const meta = {
  title: 'Components/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  args: {
    size: 30,
  },
};

export const Large: Story = {
  args: {
    size: 60,
  },
};

export const Small: Story = {
  args: {
    size: 20,
  },
};
