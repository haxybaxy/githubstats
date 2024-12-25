/**
 * @jest-environment jsdom
 */
import { jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { RepositoryCard } from '../RepositoryCard';

// Mock the CommitChart component
jest.mock('../CommitChart', () => ({
  CommitChart: () => <div data-testid="mock-commit-chart">Commit Chart</div>,
}));

describe('RepositoryCard', () => {
  const mockRepository = {
    id: '1',
    name: 'test-repo',
    description: 'Test repository description',
    url: 'https://github.com/test/test-repo',
    stargazerCount: 100,
    forkCount: 50,
    updatedAt: '2024-01-01T00:00:00Z',
    primaryLanguage: {
      name: 'TypeScript',
      color: '#2b7489',
    },
    languages: {
      nodes: [
        { name: 'TypeScript', color: '#2b7489' },
        { name: 'JavaScript', color: '#f1e05a' },
      ],
    },
  };

  it('renders repository information correctly', () => {
    render(<RepositoryCard repository={mockRepository} owner="testuser" />);

    expect(screen.getByText('test-repo')).toBeInTheDocument();
    expect(screen.getByText('Test repository description')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('⭐ 100')).toBeInTheDocument();
    expect(screen.getByText('🍴 50')).toBeInTheDocument();
  });
});
