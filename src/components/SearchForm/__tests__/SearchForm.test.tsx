/**
 * @jest-environment jsdom
 */
import { jest } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchForm } from '../SearchForm';

// Create mock functions outside to access them in tests
const mockSetSearchTerm = jest.fn();
const mockSetShowSuggestions = jest.fn();
const mockDebouncedOnChange = jest.fn();

// Mock useSearch hook with controlled state
jest.mock('../../../hooks/useSearch', () => ({
  useSearch: (username: string) => ({
    searchTerm: username,
    setSearchTerm: mockSetSearchTerm,
    showSuggestions: true,
    setShowSuggestions: mockSetShowSuggestions,
    suggestionRef: { current: null },
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
    debouncedOnChange: mockDebouncedOnChange
  })
}));

describe('SearchForm', () => {
  const mockOnUsernameChange = jest.fn();
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    render(
      <SearchForm
        username=""
        onUsernameChange={mockOnUsernameChange}
        onSubmit={mockOnSubmit}
        placeholder="Enter GitHub username"
      />
    );

    expect(screen.getByPlaceholderText('Enter GitHub username')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('calls onSubmit when form is submitted', () => {
    render(
      <SearchForm
        username="testuser"  // Make sure to pass a non-empty username
        onUsernameChange={mockOnUsernameChange}
        onSubmit={mockOnSubmit}
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
        placeholder="Enter GitHub username"
      />
    );

    const form = screen.getByTestId('search-form');
    const input = screen.getByRole('textbox', { name: /github username/i });

    // Clear the input value
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.submit(form);

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('handles input changes correctly', () => {
    render(
      <SearchForm
        username=""
        onUsernameChange={mockOnUsernameChange}
        onSubmit={mockOnSubmit}
        placeholder="Enter GitHub username"
      />
    );

    const input = screen.getByRole('textbox', { name: /github username/i });

    // Trigger change event
    fireEvent.change(input, { target: { value: 'testuser' } });

    // Verify the handlers were called
    expect(mockSetSearchTerm).toHaveBeenCalledWith('testuser');
    expect(mockSetShowSuggestions).toHaveBeenCalledWith(true);
    expect(mockDebouncedOnChange).toHaveBeenCalledWith('testuser');
  });

  it('handles input focus correctly', () => {
    render(
      <SearchForm
        username=""
        onUsernameChange={mockOnUsernameChange}
        onSubmit={mockOnSubmit}
        placeholder="Enter GitHub username"
      />
    );

    const input = screen.getByRole('textbox', { name: /github username/i });
    fireEvent.change(input, { target: { value: 'te' } });
    fireEvent.focus(input);

    expect(mockSetShowSuggestions).toHaveBeenCalledWith(true);
  });

  it('handles suggestion clicks correctly', () => {
    render(
      <SearchForm
        username="te"
        onUsernameChange={mockOnUsernameChange}
        onSubmit={mockOnSubmit}
        placeholder="Enter GitHub username"
      />
    );

    const suggestion = screen.getByTestId('suggestion-suggested-user');
    fireEvent.click(suggestion);

    expect(mockSetSearchTerm).toHaveBeenCalledWith('suggested-user');
    expect(mockOnUsernameChange).toHaveBeenCalledWith('suggested-user');
    expect(mockSetShowSuggestions).toHaveBeenCalledWith(false);
  });
});
