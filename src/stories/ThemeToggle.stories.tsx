import type { Meta, StoryObj } from '@storybook/react';
import { ThemeToggle } from '../components/MainView/ThemeToggle';
import { ThemeProvider } from '../contexts/ThemeContext';

const meta = {
  title: 'Components/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

export const Default: Story = {};

// You can add more stories if needed, but since this component
// handles its own state through context, a single story might be sufficient
