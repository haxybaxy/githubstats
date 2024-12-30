import { render, screen } from '@testing-library/react';
import { UserSocialStats } from '../UserSocialStats';
import { mockUser } from '../../../__mocks__/mockUser';

describe('UserSocialStats', () => {
  it('renders followers and following counts', () => {
    render(<UserSocialStats user={mockUser} />);

    expect(screen.getByText(mockUser.followers.totalCount.toString())).toBeInTheDocument();
    expect(screen.getByText(mockUser.following.totalCount.toString())).toBeInTheDocument();
  });

  it('renders location when provided', () => {
    render(<UserSocialStats user={mockUser} />);

    expect(screen.getByText(mockUser.location)).toBeInTheDocument();
  });

  it('renders website with https:// when missing protocol', () => {
    const userWithoutHttps = {
      ...mockUser,
      websiteUrl: 'example.com'
    };

    render(<UserSocialStats user={userWithoutHttps} />);

    const link = screen.getByText('example.com');
    expect(link.closest('a')).toHaveAttribute('href', 'https://example.com');
  });

  it('renders LinkedIn link when available', () => {
    const userWithLinkedIn = {
      ...mockUser,
      socialAccounts: {
        nodes: [
          { provider: 'LINKEDIN', url: 'https://linkedin.com/in/test' }
        ]
      }
    };

    render(<UserSocialStats user={userWithLinkedIn} />);

    const linkedInLink = screen.getByText('LinkedIn');
    expect(linkedInLink.closest('a')).toHaveAttribute('href', 'https://linkedin.com/in/test');
  });
});
