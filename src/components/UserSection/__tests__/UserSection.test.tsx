import { render, screen } from '@testing-library/react';
import { UserSection } from '../UserSection';
import { mockUser } from '../../../__mocks__/mockUser';

describe('UserSection', () => {
  const defaultProps = {
    user: mockUser,
    isWinner: false,
    score: undefined,
    isComparing: false,
    hasCompetitor: false,
  };

  it('renders all major components', () => {
    render(<UserSection {...defaultProps} />);

    // Check for UserProfile
    expect(screen.getByTestId('user-profile')).toBeInTheDocument();

    // Check for UserSocialStats (within UserProfile)
    expect(screen.getByTestId('social-stats')).toBeInTheDocument();

    // Check for UserStatsGrid
    expect(screen.getByTestId('stats-grid')).toBeInTheDocument();
  });

  it('applies winner styling when isWinner is true', () => {
    render(<UserSection {...defaultProps} isWinner={true} />);

    const container = screen.getByTestId('user-section');
    expect(container).toHaveClass('shadow-[0_0_15px_rgba(255,215,0,0.5)]');
  });

  it('renders in comparison mode correctly', () => {
    render(
      <UserSection
        {...defaultProps}
        isComparing={true}
        hasCompetitor={true}
        score={95}
      />
    );

    // Verify score is displayed
    expect(screen.getByText('Percentile: 95.0')).toBeInTheDocument();
  });


  it('maintains proper layout structure', () => {
    render(<UserSection {...defaultProps} />);

    // Check for proper section structure
    const profileSection = screen.getByTestId('user-profile').closest('div');
    expect(profileSection).toHaveClass('space-x-4');

    // Verify border between profile and stats grid
    const statsGrid = screen.getByTestId('stats-grid');
    expect(statsGrid).toHaveClass('border-t');
  });
});
