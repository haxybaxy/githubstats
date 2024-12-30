import { render, screen, fireEvent } from '@testing-library/react';
import { RepositoryList } from '../RepositoryList';
import { Repository } from '../../../types/github';

// Mock sample repository data
const mockRepositories: Repository[] = [
  {
    id: '1',
    name: 'repo-one',
    description: 'First test repository',
    primaryLanguage: { name: 'TypeScript', color: '#2b7489' },
    stargazerCount: 100,
    forkCount: 20,
    updatedAt: '2024-03-20T10:00:00Z',
    url: 'https://github.com/testuser/repo-one',
    languages: {
      nodes: [
        { name: 'TypeScript', color: '#2b7489' },
        { name: 'JavaScript', color: '#f1e05a' }
      ]
    }
  },
  {
    id: '2',
    name: 'repo-two',
    description: 'Second test repository',
    primaryLanguage: { name: 'JavaScript', color: '#f1e05a' },
    stargazerCount: 50,
    forkCount: 10,
    updatedAt: '2024-03-19T10:00:00Z',
    url: 'https://github.com/testuser/repo-two',
    languages: {
      nodes: [
        { name: 'JavaScript', color: '#f1e05a' }
      ]
    }
  }
];

describe('RepositoryList', () => {
  // Test basic rendering
  it('renders repository cards correctly', () => {
    render(
      <RepositoryList
        repositories={mockRepositories}
        loading={false}
        owner="testuser"
      />
    );

    expect(screen.getByText('repo-one')).toBeInTheDocument();
    expect(screen.getByText('repo-two')).toBeInTheDocument();
  });

  // Test loading state
  it('displays loading message when loading', () => {
    render(
      <RepositoryList
        repositories={[]}
        loading={true}
        owner="testuser"
      />
    );

    expect(screen.getByText('Loading repositories...')).toBeInTheDocument();
  });

  // Test error state
  it('displays error message when error occurs', () => {
    const error = new Error('Failed to fetch repositories');
    render(
      <RepositoryList
        repositories={[]}
        loading={false}
        error={error}
        owner="testuser"
      />
    );

    expect(screen.getByText('Error: Failed to fetch repositories')).toBeInTheDocument();
  });

  // Test search functionality
  it('filters repositories based on search query', () => {
    render(
      <RepositoryList
        repositories={mockRepositories}
        loading={false}
        owner="testuser"
      />
    );

    const searchInput = screen.getByPlaceholderText(/Find a repository/i);
    fireEvent.change(searchInput, { target: { value: 'one' } });

    expect(screen.getByText('repo-one')).toBeInTheDocument();
    expect(screen.queryByText('repo-two')).not.toBeInTheDocument();
  });

  // Test language filter
  it('filters repositories by language', () => {
    render(
      <RepositoryList
        repositories={mockRepositories}
        loading={false}
        owner="testuser"
      />
    );

    const languageSelect = screen.getByLabelText(/filter by language/i);
    fireEvent.change(languageSelect, { target: { value: 'TypeScript' } });

    expect(screen.getByText('repo-one')).toBeInTheDocument();
    expect(screen.queryByText('repo-two')).not.toBeInTheDocument();
  });

  // Test sorting
  it('sorts repositories by stars', () => {
    render(
      <RepositoryList
        repositories={mockRepositories}
        loading={false}
        owner="testuser"
      />
    );

    const sortSelect = screen.getByLabelText(/sort by/i);
    fireEvent.change(sortSelect, { target: { value: 'stars' } });

    // Get repository names in order they appear
    const repoNames = screen.getAllByText(/^repo-/);
    expect(repoNames[0]).toHaveTextContent('repo-one'); // Most stars (100)
    expect(repoNames[1]).toHaveTextContent('repo-two'); // Fewer stars (50)
  });

  // Test sort order toggle
  it('toggles sort order', () => {
    render(
      <RepositoryList
        repositories={mockRepositories}
        loading={false}
        owner="testuser"
      />
    );

    // The sort order button has an aria-label that changes based on current order
    const sortOrderButton = screen.getByLabelText(/sort (ascending|descending)/i);
    fireEvent.click(sortOrderButton);

    // Get repository names in order they appear
    const repoNames = screen.getAllByText(/^repo-/);
    expect(repoNames[0]).toHaveTextContent('repo-two');
    expect(repoNames[1]).toHaveTextContent('repo-one');
  });
});
