import { render, screen } from '@testing-library/react';
import { RepositoryCard } from '../RepositoryCard';

describe('RepositoryCard', () => {
  const mockRepository = {
    id: '123',
    name: 'test-repo',
    description: 'A test repository',
    url: 'https://github.com/testuser/test-repo',
    stargazerCount: 100,
    forkCount: 50,
    updatedAt: '2024-03-20T12:00:00Z',
    primaryLanguage: {
      name: 'TypeScript',
      color: '#2b7489'
    },
    languages: {
      nodes: []
    }
  };

  const mockOwner = 'testuser';

  it('renders repository information correctly', () => {
    render(<RepositoryCard repository={mockRepository} owner={mockOwner} />);

    // Check repository name and link
    const repoLink = screen.getByRole('link', { name: 'test-repo' });
    expect(repoLink).toHaveAttribute('href', mockRepository.url);
    expect(repoLink).toHaveAttribute('target', '_blank');
    expect(repoLink).toHaveAttribute('rel', 'noopener noreferrer');

    // Check description
    expect(screen.getByText('A test repository')).toBeInTheDocument();

    // Check language information
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    // const languageIndicator = screen.getByRole('presentation', { hidden: true });
    // expect(languageIndicator).toHaveStyle({ backgroundColor: '#2b7489' });

    // Check statistics
    expect(screen.getByTitle('100 stars')).toHaveTextContent('⭐ 100');
    expect(screen.getByTitle('50 forks')).toHaveTextContent('🍴 50');

    // Verify commit chart is rendered
    // expect(screen.getByTestId('mock-commit-chart')).toBeInTheDocument();
  });

  it('renders without primary language', () => {
    const repoWithoutLanguage = {
      ...mockRepository,
      primaryLanguage: null
    };

    render(<RepositoryCard repository={repoWithoutLanguage} owner={mockOwner} />);

    // Language indicator should not be present
    expect(screen.queryByRole('presentation', { hidden: true })).not.toBeInTheDocument();
  });

  it('renders without description', () => {
    const repoWithoutDescription = {
      ...mockRepository,
      description: null
    };

    render(<RepositoryCard repository={repoWithoutDescription} owner={mockOwner} />);

    // Description should not be present
    expect(screen.queryByText('A test repository')).not.toBeInTheDocument();
  });

  it('renders with zero stats', () => {
    const repoWithZeroStats = {
      ...mockRepository,
      stargazerCount: 0,
      forkCount: 0
    };

    render(<RepositoryCard repository={repoWithZeroStats} owner={mockOwner} />);

    expect(screen.getByTitle('0 stars')).toHaveTextContent('⭐ 0');
    expect(screen.getByTitle('0 forks')).toHaveTextContent('🍴 0');
  });
});
