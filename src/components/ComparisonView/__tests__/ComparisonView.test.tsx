import { render, screen, waitFor } from '@testing-library/react';
import { ComparisonView } from '../ComparisonView';
import { useUserQueries } from '../../../hooks/useUserQueries';
import { useGitHubRank } from '../../../hooks/useGitHubRank';
import { User } from '../../../types/github';

// Mock all the hooks
jest.mock('../../../hooks/useUserQueries');
jest.mock('../../../hooks/useGitHubRank');

// Mock child components to focus on ComparisonView logic
jest.mock('../../UserSection/UserSection', () => ({
  UserSection: ({ user, 'data-testid': dataTestId = 'user-section' }: {
    user: User;
    'data-testid'?: string;
  }) => (
    <div data-testid={dataTestId}>
      <span>User: {user.login}</span>
    </div>
  ),
}));

jest.mock('../../RepositoryList/RepositoryList', () => ({
  RepositoryList: ({ repositories, owner, 'data-testid': dataTestId = `repo-list-${owner}` }: {
    repositories: Array<{ id: string }>;
    owner: string;
    'data-testid'?: string;
  }) => (
    <div data-testid={dataTestId}>
      Repos: {repositories.length}
    </div>
  ),
}));

// Mock data
const mockUser = {
  login: 'user1',
  name: 'User One',
  repositories: {
    nodes: [{ id: '1' }, { id: '2' }],
  },
} as User;

describe('ComparisonView', () => {
  const mockOnSearchStateChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // Default hook mocks
    (useUserQueries as jest.Mock).mockReturnValue({
      userData: null,
      loading: false,
      error: null,
    });

    (useGitHubRank as jest.Mock).mockReturnValue({
      winner: null,
      user1Score: 0,
      user2Score: 0,
    });
  });

  it('renders without crashing', () => {
    render(<ComparisonView onSearchStateChange={mockOnSearchStateChange} />);
    expect(screen.getByTestId('comparison-view')).toBeInTheDocument();
    expect(screen.getByTestId('comparison-controls')).toBeInTheDocument();
  });

  it('displays loading state correctly', () => {
    (useUserQueries as jest.Mock)
      .mockReturnValueOnce({
        userData: null,
        loading: true,
        error: null,
      });

    render(<ComparisonView onSearchStateChange={mockOnSearchStateChange} />);
    expect(screen.getByTestId('search-form')).toBeInTheDocument();
  });

  it('displays error state correctly', () => {
    const mockError = new Error('User not found');
    (useUserQueries as jest.Mock)
      .mockReturnValueOnce({
        userData: null,
        loading: false,
        error: mockError,
      });

    render(<ComparisonView onSearchStateChange={mockOnSearchStateChange} />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('displays user data correctly', () => {
    (useUserQueries as jest.Mock)
      .mockReturnValueOnce({
        userData: mockUser,
        loading: false,
        error: null,
      });

    render(<ComparisonView onSearchStateChange={mockOnSearchStateChange} />);

    expect(screen.getByText(`User: ${mockUser.login}`)).toBeInTheDocument();
    expect(screen.getByTestId(`repo-list-${mockUser.login}`)).toBeInTheDocument();
  });

  it('handles search state changes correctly', async () => {
    (useUserQueries as jest.Mock)
      .mockReturnValueOnce({
        userData: mockUser,
        loading: false,
        error: null,
      });

    render(<ComparisonView onSearchStateChange={mockOnSearchStateChange} />);

    await waitFor(() => {
      expect(mockOnSearchStateChange).toHaveBeenCalledWith(true);
    });
  });
});
