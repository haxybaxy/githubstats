import { render, screen } from '@testing-library/react';
import { UserProfile } from '../UserProfile';
import { mockUser } from '../../../__mocks__/mockUser';

describe('UserProfile', () => {
  const defaultProps = {
    user: mockUser,
    isWinner: false,
    score: undefined,
    isComparing: false,
    hasCompetitor: false,
  };

  it('renders basic user information', () => {
    render(<UserProfile {...defaultProps} />);

    expect(screen.getByAltText(mockUser.login)).toBeInTheDocument(); // Avatar
    expect(screen.getByText(mockUser.name)).toBeInTheDocument(); // Name
    expect(screen.getByText(mockUser.login)).toBeInTheDocument(); // Login
    expect(screen.getByText(mockUser.bio)).toBeInTheDocument(); // Bio
  });

  it('displays score with correct styling when comparing and winning', () => {
    render(
      <UserProfile
        {...defaultProps}
        score={98.5}
      />
    );

    const scoreElement = screen.getByText('Percentile: 98.5');
    expect(scoreElement).toHaveClass('bg-green-100', 'text-green-800');
  });



  it('shows tooltip on info icon hover', async () => {
    render(
      <UserProfile
        {...defaultProps}
        score={98.5}
      />
    );

    const tooltip = screen.getByText(/This percentile score indicates/);
    expect(tooltip).toBeInTheDocument();
  });
});
