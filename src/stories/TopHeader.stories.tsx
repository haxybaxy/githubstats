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
