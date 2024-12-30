import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorDisplay } from '../ErrorDisplay';
import type { ApolloError } from '@apollo/client';

describe('ErrorDisplay', () => {
  const createError = (message: string) => ({ message }) as ApolloError;

  it('renders user not found error message correctly', () => {
    render(<ErrorDisplay error={createError('Could not resolve to a User')} />);

    expect(screen.getByText('User not found. Please check the username and try again.')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('renders bad credentials error message correctly', () => {
    render(<ErrorDisplay error={createError('Bad credentials')} />);

    expect(screen.getByText('GitHub API authentication failed. Please check your API token.')).toBeInTheDocument();
  });

  it('renders rate limit error message correctly', () => {
    render(<ErrorDisplay error={createError('API rate limit exceeded')} />);

    expect(screen.getByText('GitHub API rate limit exceeded. Please try again later.')).toBeInTheDocument();
  });

  it('renders generic error message for unknown errors', () => {
    render(<ErrorDisplay error={createError('Unknown error occurred')} />);

    expect(screen.getByText('An error occurred while fetching data. Please try again.')).toBeInTheDocument();
  });

  it('closes the error message when close button is clicked', () => {
    render(<ErrorDisplay error={createError('Any error message')} />);

    const closeButton = screen.getByTestId('error-close-button');
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<ErrorDisplay error={createError('Any error message')} />);

    const alert = screen.getByRole('alert');
    const closeButton = screen.getByLabelText('Close error message');

    expect(alert).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();
  });
});
