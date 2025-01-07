import type { Meta, StoryObj } from '@storybook/react';
import { FilterControls } from '../components/RepositoryList/FilterControls';
import { ThemeDecorator } from './decorators/ThemeDecorator';
const meta = {
  title: 'Components/FilterControls',
  component: FilterControls,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [ThemeDecorator]
} satisfies Meta<typeof FilterControls>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
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
};

export const DefaultDark: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    theme: 'dark'
  }
};

export const WithFiltersApplied: Story = {
  args: {
    ...Default.args,
    searchQuery: 'test',
    selectedLanguage: 'TypeScript',
    sortBy: 'forks',
    sortOrder: 'asc',
  },
};
