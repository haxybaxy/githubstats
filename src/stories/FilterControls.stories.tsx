import type { Meta, StoryObj } from '@storybook/react';
import { FilterControls } from '../components/RepositoryList/FilterControls';
import { ThemeDecorator } from './decorators/ThemeDecorator';

const meta = {
  title: 'Components/FilterControls',
  component: FilterControls,
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
} satisfies Meta<typeof FilterControls>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    searchQuery: '',
    selectedLanguage: '',
    sortBy: 'stars',
    sortOrder: 'desc',
    languages: ['JavaScript', 'TypeScript', 'Python', 'Ruby', 'Go'],
    onSearchChange: (value) => console.log('Search changed:', value),
    onLanguageChange: (value) => console.log('Language changed:', value),
    onSortByChange: (value) => console.log('Sort by changed:', value),
    onSortOrderChange: () => console.log('Sort order changed'),
  },
  parameters: {
    theme: 'light',
  },
};

export const Dark: Story = {
  args: {
    searchQuery: '',
    selectedLanguage: '',
    sortBy: 'stars',
    sortOrder: 'desc',
    languages: ['JavaScript', 'TypeScript', 'Python', 'Ruby', 'Go'],
    onSearchChange: (value) => console.log('Search changed:', value),
    onLanguageChange: (value) => console.log('Language changed:', value),
    onSortByChange: (value) => console.log('Sort by changed:', value),
    onSortOrderChange: () => console.log('Sort order changed'),
  },
  parameters: {
    theme: 'dark',
  },
};

export const WithFiltersApplied: Story = {
  args: {
    searchQuery: 'test',
    selectedLanguage: 'TypeScript',
    sortBy: 'forks',
    sortOrder: 'asc',
    languages: ['JavaScript', 'TypeScript', 'Python', 'Ruby', 'Go'],
    onSearchChange: (value) => console.log('Search changed:', value),
    onLanguageChange: (value) => console.log('Language changed:', value),
    onSortByChange: (value) => console.log('Sort by changed:', value),
    onSortOrderChange: () => console.log('Sort order changed'),
  },
  parameters: {
    theme: 'light',
  },
};
