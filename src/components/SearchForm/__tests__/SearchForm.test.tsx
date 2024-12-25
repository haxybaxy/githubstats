/**
 * @jest-environment jsdom
 */
import { jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { SearchForm } from '../SearchForm';

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
    expect(screen.getByRole('button')).toHaveTextContent('Search');
  });
});
