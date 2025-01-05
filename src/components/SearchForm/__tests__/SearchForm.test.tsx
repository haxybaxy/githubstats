/**
 * @jest-environment jsdom
 */
import { jest } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchForm } from '../SearchForm';

// Mock useSearch hook with controlled state
jest.mock('../../../hooks/useSearch', () => ({
  useSearch: () => ({
    inputRef: { current: null },
    data: {
      search: {
        nodes: [
          {
            login: 'suggested-user',
            avatarUrl: 'test.jpg',
            name: 'Test User'
          }
        ]
      }
    },
    searchLoading: false,
  })
}));

describe('SearchForm', () => {
  const mockOnUsernameChange = jest.fn();
  const mockOnSubmit = jest.fn();
  const mockOnSuggestionSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    render(
      <SearchForm
        username=""
        onUsernameChange={mockOnUsernameChange}
        onSubmit={mockOnSubmit}
        onSuggestionSelect={mockOnSuggestionSelect}
        placeholder="Enter GitHub username"
      />
    );

    expect(screen.getByPlaceholderText('Enter GitHub username')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('calls onSubmit when form is submitted', () => {
    render(
      <SearchForm
        username="testuser"
        onUsernameChange={mockOnUsernameChange}
        onSubmit={mockOnSubmit}
        onSuggestionSelect={mockOnSuggestionSelect}
        placeholder="Enter GitHub username"
      />
    );

    const form = screen.getByTestId('search-form');
    fireEvent.submit(form);

    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it('prevents submission when username is empty', () => {
    render(
      <SearchForm
        username=""
        onUsernameChange={mockOnUsernameChange}
        onSubmit={mockOnSubmit}
        onSuggestionSelect={mockOnSuggestionSelect}
        placeholder="Enter GitHub username"
      />
    );

    const form = screen.getByTestId('search-form');
    fireEvent.submit(form);

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('handles input changes correctly', () => {
    render(
      <SearchForm
        username=""
        onUsernameChange={mockOnUsernameChange}
        onSubmit={mockOnSubmit}
        onSuggestionSelect={mockOnSuggestionSelect}
        placeholder="Enter GitHub username"
      />
    );

    const input = screen.getByRole('textbox', { name: /github username/i });
    fireEvent.change(input, { target: { value: 'testuser' } });

    expect(mockOnUsernameChange).toHaveBeenCalledWith('testuser');
  });

  it('handles suggestion clicks correctly', () => {
    render(
      <SearchForm
        username="te"
        onUsernameChange={mockOnUsernameChange}
        onSubmit={mockOnSubmit}
        onSuggestionSelect={mockOnSuggestionSelect}
        placeholder="Enter GitHub username"
      />
    );

    // First focus the input to show suggestions
    const input = screen.getByRole('textbox', { name: /github username/i });
    fireEvent.focus(input);

    // Now the suggestions should be visible
    const suggestion = screen.getByTestId('suggestion-suggested-user');
    fireEvent.click(suggestion);

    expect(mockOnSuggestionSelect).toHaveBeenCalledWith('suggested-user');
  });
});
