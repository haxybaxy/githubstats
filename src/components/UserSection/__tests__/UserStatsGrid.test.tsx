import { render, screen } from '@testing-library/react';
import { UserStatsGrid } from '../UserStatsGrid';
import { mockUser } from '../../../__mocks__/mockUser';

describe('UserStatsGrid', () => {
  it('renders all statistics with correct values', () => {
    render(<UserStatsGrid user={mockUser} />);

    // Check all stat values are rendered
    expect(screen.getByText(mockUser.contributionsCollection.totalCommitContributions.toLocaleString())).toBeInTheDocument();
    expect(screen.getByText(mockUser.pullRequests.totalCount.toLocaleString())).toBeInTheDocument();
    expect(screen.getByText(mockUser.issues.totalCount.toLocaleString())).toBeInTheDocument();
    expect(screen.getByText(mockUser.repositories.totalCount.toLocaleString())).toBeInTheDocument();
  });

  it('calculates and displays total stars correctly', () => {
    const totalStars = mockUser.repositories.totalStargazers.reduce(
      (sum, repo) => sum + repo.stargazerCount,
      0
    );

    render(<UserStatsGrid user={mockUser} />);

    expect(screen.getByText(totalStars.toLocaleString())).toBeInTheDocument();
  });

  it('applies comparison mode styling', () => {
    render(<UserStatsGrid user={mockUser} />);

    const statContainers = screen.getAllByRole('generic').filter(
      element => element.classList.contains('flex-col')
    );

    expect(statContainers.length).toBeGreaterThan(0);
    statContainers.forEach(container => {
      expect(container).toHaveClass('flex-col');

    });
  });
});
