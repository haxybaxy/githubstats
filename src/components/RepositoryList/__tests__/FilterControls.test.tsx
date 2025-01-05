/**
 * @jest-environment jsdom
 */
import { jest } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import { FilterControls } from '../FilterControls';
import { renderHook, act } from '@testing-library/react';
import { useRepositoryFiltering } from '../../../hooks/useRepositoryFiltering';

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
  it('handles sort by changes for forks', () => {
    render(<FilterControls {...mockProps} />);
    const sortBySelect = screen.getByRole('combobox', { name: /sort by/i });

    fireEvent.change(sortBySelect, { target: { value: 'forks' } });
    expect(mockProps.onSortByChange).toHaveBeenCalledWith('forks');
  });

  it('handles sort by changes for updated date', () => {
    render(<FilterControls {...mockProps} />);
    const sortBySelect = screen.getByRole('combobox', { name: /sort by/i });

    fireEvent.change(sortBySelect, { target: { value: 'updated' } });
    expect(mockProps.onSortByChange).toHaveBeenCalledWith('updated');
  });

  it('renders sort options correctly', () => {
    render(<FilterControls {...mockProps} />);
    const sortBySelect = screen.getByRole('combobox', { name: /sort by/i });

    expect(sortBySelect).toContainHTML('Sort by: Stars');
    expect(sortBySelect).toContainHTML('Sort by: Forks');
    expect(sortBySelect).toContainHTML('Sort by: Updated');
  });
});

describe('../../hooks/useRepositoryFiltering', () => {
  const mockRepositories = [
    {
      id: '1',
      name: 'repo1',
      forkCount: 10,
      stargazerCount: 5,
      updatedAt: '2024-03-01T00:00:00Z',
      primaryLanguage: { name: 'JavaScript' }
    },
    {
      id: '2',
      name: 'repo2',
      forkCount: 5,
      stargazerCount: 10,
      updatedAt: '2024-03-02T00:00:00Z',
      primaryLanguage: { name: 'TypeScript' }
    },
    {
      id: '3',
      name: 'repo3',
      forkCount: 15,
      stargazerCount: 15,
      updatedAt: '2024-03-03T00:00:00Z',
      primaryLanguage: { name: 'Python' }
    }
  ] as any; // Type assertion for brevity

  it('sorts repositories by forks', () => {
    const { result } = renderHook(() => useRepositoryFiltering(mockRepositories));

    act(() => {
      result.current.setSortBy('forks');
    });

    const { paginatedRepos } = result.current.getFilteredAndSortedRepos();
    // Default sort order is 'desc', so highest forks should be first
    expect(paginatedRepos[0].forkCount).toBe(15);
    expect(paginatedRepos[1].forkCount).toBe(10);
    expect(paginatedRepos[2].forkCount).toBe(5);
  });

  it('sorts repositories by update date', () => {
    const { result } = renderHook(() => useRepositoryFiltering(mockRepositories));

    act(() => {
      result.current.setSortBy('updated');
    });

    const { paginatedRepos } = result.current.getFilteredAndSortedRepos();
    // Default sort order is 'desc', so most recent should be first
    expect(paginatedRepos[0].updatedAt).toBe('2024-03-03T00:00:00Z');
    expect(paginatedRepos[1].updatedAt).toBe('2024-03-02T00:00:00Z');
    expect(paginatedRepos[2].updatedAt).toBe('2024-03-01T00:00:00Z');
  });

  it('handles ascending sort order', () => {
    const { result } = renderHook(() => useRepositoryFiltering(mockRepositories));

    act(() => {
      result.current.setSortBy('forks');
      result.current.setSortOrder('asc');
    });

    const { paginatedRepos } = result.current.getFilteredAndSortedRepos();
    expect(paginatedRepos[0].forkCount).toBe(5);
    expect(paginatedRepos[1].forkCount).toBe(10);
    expect(paginatedRepos[2].forkCount).toBe(15);
  });
});
