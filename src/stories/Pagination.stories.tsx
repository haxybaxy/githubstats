import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from '../components/RepositoryList/Pagination';
import { ThemeDecorator } from './decorators/ThemeDecorator';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    ThemeDecorator,
    (Story) => (
      <div className="p-6 bg-white dark:bg-gray-900">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    currentPage: 1,
    totalPages: 5,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
  parameters: {
    theme: 'light',
  },
};

export const Dark: Story = {
  args: {
    currentPage: 1,
    totalPages: 5,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
  parameters: {
    theme: 'dark',
  },
};

export const MiddlePage: Story = {
  args: {
    currentPage: 3,
    totalPages: 5,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
  parameters: {
    theme: 'light',
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 5,
    totalPages: 5,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
  parameters: {
    theme: 'light',
  },
};

export const SinglePage: Story = {
  args: {
    currentPage: 1,
    totalPages: 1,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
  parameters: {
    theme: 'light',
  },
};
