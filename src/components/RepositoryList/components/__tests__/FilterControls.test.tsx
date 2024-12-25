/**
 * @jest-environment jsdom
 */
import { jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { FilterControls } from '../FilterControls';

describe('FilterControls', () => {
  const mockProps = {
    searchQuery: '',
    selectedLanguage: '',
    sortBy: 'stars' as const,
    sortOrder: 'desc' as const,
    languages: ['JavaScript', 'TypeScript', 'Python'],
    onSearchChange: jest.fn(),
    onLanguageChange: jest.fn(),
    onSortByChange: jest.fn(),
    onSortOrderChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all controls correctly', () => {
    render(<FilterControls {...mockProps} />);

    expect(screen.getByPlaceholderText('Search repositories...')).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /filter by language/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /sort by/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sort descending/i })).toBeInTheDocument();
  });
});
