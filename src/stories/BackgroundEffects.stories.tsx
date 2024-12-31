import type { Meta, StoryObj } from '@storybook/react';
import { BackgroundEffects } from '../components/MainView/BackgroundEffects';

const meta = {
  title: 'Components/BackgroundEffects',
  component: BackgroundEffects,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="w-screen h-screen">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof BackgroundEffects>;

export default meta;
type Story = StoryObj<typeof BackgroundEffects>;

export const Default: Story = {};

export const InDarkMode: Story = {
  parameters: {
    backgrounds: {
      default: 'dark',
    },
    themes: {
      default: 'dark',
    },
  },
};
