/**
 * @jest-environment jsdom
 */
import { jest } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
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

    expect(screen.getByPlaceholderText('Find a repository...')).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /filter by language/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /sort by/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sort descending/i })).toBeInTheDocument();
  });

  it('handles language selection changes', () => {
    render(<FilterControls {...mockProps} />);
    const languageSelect = screen.getByRole('combobox', { name: /filter by language/i });

    fireEvent.change(languageSelect, { target: { value: 'TypeScript' } });
    expect(mockProps.onLanguageChange).toHaveBeenCalledWith('TypeScript');
  });

  it('handles sort by changes', () => {
    render(<FilterControls {...mockProps} />);
    const sortBySelect = screen.getByRole('combobox', { name: /sort by/i });

    fireEvent.change(sortBySelect, { target: { value: 'updated' } });
    expect(mockProps.onSortByChange).toHaveBeenCalledWith('updated');
  });

  it('handles sort order toggle', () => {
    render(<FilterControls {...mockProps} />);
    const sortOrderButton = screen.getByLabelText('Sort descending');

    fireEvent.click(sortOrderButton);
    expect(mockProps.onSortOrderChange).toHaveBeenCalled();
  });

  it('displays all available language options', () => {
    render(<FilterControls {...mockProps} />);
    const languageSelect = screen.getByRole('combobox', { name: /filter by language/i });

    mockProps.languages.forEach(language => {
      expect(languageSelect).toContainHTML(language);
    });
  });

  it('renders with initial values', () => {
    const initialProps = {
      ...mockProps,
      searchQuery: 'initial search',
      selectedLanguage: 'TypeScript',
      sortBy: 'updated' as const,
      sortOrder: 'asc' as const,
    };

    render(<FilterControls {...initialProps} />);

    expect(screen.getByLabelText('Find a repository')).toHaveValue('initial search');
    expect(screen.getByLabelText('Filter by language')).toHaveValue('TypeScript');
    expect(screen.getByLabelText('Sort by')).toHaveValue('updated');
    expect(screen.getByLabelText('Sort ascending')).toBeInTheDocument();
  });
});
