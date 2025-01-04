import type { Meta, StoryObj } from '@storybook/react';
import { BackgroundEffects } from '../components/MainView/BackgroundEffects';
import { ThemeDecorator } from './decorators/ThemeDecorator';

const meta = {
  title: 'Components/BackgroundEffects',
  component: BackgroundEffects,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    ThemeDecorator,
    (Story) => (
      <div className="w-screen h-screen bg-gray-50 dark:bg-gray-900">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof BackgroundEffects>;

export default meta;
type Story = StoryObj<typeof BackgroundEffects>;

export const Light: Story = {
  parameters: {
    theme: 'light',
  },
};

export const Dark: Story = {
  parameters: {
    theme: 'dark',
  },
};
