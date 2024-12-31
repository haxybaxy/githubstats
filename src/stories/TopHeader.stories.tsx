import type { Meta, StoryObj } from '@storybook/react';
import { TopHeader } from '../components/MainView/TopHeader';
import { ThemeProvider } from '../contexts/ThemeContext';

const meta = {
  title: 'Components/TopHeader',
  component: TopHeader,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof TopHeader>;

export default meta;
type Story = StoryObj<typeof TopHeader>;

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

// Optional: Show with different widths
export const NarrowScreen: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const WideScreen: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};
