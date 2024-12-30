/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchSuggestions } from '../SearchSuggestions';
import { SearchUser } from '../../../types/search';

describe('SearchSuggestions', () => {
  const mockOnSuggestionClick = jest.fn();
  const mockRef = { current: null };

  const mockUsers: { search: { nodes: SearchUser[] } } = {
    search: {
      nodes: [
        {
          login: 'user1',
          name: 'User One',
          avatarUrl: 'https://example.com/avatar1.jpg'
        },
        {
          login: 'user2',
          name: undefined,
          avatarUrl: 'https://example.com/avatar2.jpg'
        }
      ]
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading state', () => {
    render(
      <SearchSuggestions
        searchLoading={true}
        searchData={null}
        onSuggestionClick={mockOnSuggestionClick}
        suggestionRef={mockRef}
      />
    );

    expect(screen.getByText('Searching...')).toBeInTheDocument();
  });

  it('shows "No users found" when there are no results', () => {
    render(
      <SearchSuggestions
        searchLoading={false}
        searchData={{ search: { nodes: [] } }}
        onSuggestionClick={mockOnSuggestionClick}
        suggestionRef={mockRef}
      />
    );

    expect(screen.getByText('No users found')).toBeInTheDocument();
  });

  it('renders user suggestions correctly', () => {
    render(
      <SearchSuggestions
        searchLoading={false}
        searchData={mockUsers}
        onSuggestionClick={mockOnSuggestionClick}
        suggestionRef={mockRef}
      />
    );

    expect(screen.getByText('user1')).toBeInTheDocument();
    expect(screen.getByText('User One')).toBeInTheDocument();
    expect(screen.getByText('user2')).toBeInTheDocument();
    expect(screen.queryByText('null')).not.toBeInTheDocument();
  });

  it('calls onSuggestionClick when a suggestion is clicked', () => {
    render(
      <SearchSuggestions
        searchLoading={false}
        searchData={mockUsers}
        onSuggestionClick={mockOnSuggestionClick}
        suggestionRef={mockRef}
      />
    );

    fireEvent.click(screen.getByText('user1'));
    expect(mockOnSuggestionClick).toHaveBeenCalledWith('user1');
  });

  it('handles null searchData gracefully', () => {
    render(
      <SearchSuggestions
        searchLoading={false}
        searchData={null}
        onSuggestionClick={mockOnSuggestionClick}
        suggestionRef={mockRef}
      />
    );

    expect(screen.getByText('No users found')).toBeInTheDocument();
  });
});
