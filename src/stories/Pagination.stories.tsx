import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from '../components/RepositoryList/Pagination';
import { ThemeDecorator } from './decorators/ThemeDecorator';
const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [ThemeDecorator]
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstPage: Story = {
  args: {
    currentPage: 1,
    totalPages: 5,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
};

export const FirstPageDark: Story = {
  args: {
    ...FirstPage.args,
  },
  parameters: {
    theme: 'dark',
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#1a1a1a'
        }
      ]
    }
  }
};

export const MiddlePage: Story = {
  args: {
    currentPage: 3,
    totalPages: 5,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 5,
    totalPages: 5,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
};

export const SinglePage: Story = {
  args: {
    currentPage: 1,
    totalPages: 1,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
};
