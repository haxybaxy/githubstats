import { render, screen, waitFor } from '@testing-library/react';
import { ComparisonView } from '../ComparisonView';
import { useUserQueries } from '../../../hooks/useUserQueries';
import { useComparisonState } from '../../../hooks/useComparisonState';
import { useGitHubRank } from '../../../hooks/useGitHubRank';
import { User } from '../../../types/github';

// Mock all the hooks
jest.mock('../../../hooks/useUserQueries');
jest.mock('../../../hooks/useComparisonState');
jest.mock('../../../hooks/useGitHubRank');

// Mock child components to focus on ComparisonView logic
jest.mock('../../UserSection/UserSection', () => ({
  UserSection: ({ user, isWinner, score, 'data-testid': dataTestId = 'user-section' }: {
    user: User;
    isWinner: boolean;
    score?: number;
    'data-testid'?: string;
  }) => (
    <div data-testid={dataTestId}>
      <span>User: {user.login}</span>
      {isWinner && <span data-testid="winner-badge">Winner</span>}
      {score && <span data-testid="score">{score}</span>}
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
const mockUser1 = {
  login: 'user1',
  name: 'User One',
  repositories: {
    nodes: [{ id: '1' }, { id: '2' }],
  },
} as User;

const mockUser2 = {
  login: 'user2',
  name: 'User Two',
  repositories: {
    nodes: [{ id: '3' }],
  },
} as User;

describe('ComparisonView', () => {
  const mockOnSearchStateChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // Default hook mocks
    (useComparisonState as jest.Mock).mockReturnValue({
      state: {
        username1: '',
        username2: '',
        searchedUsername1: '',
        searchedUsername2: '',
        isComparing: false,
      },
      setState: jest.fn(),
      handleSearch: jest.fn(),
      toggleComparing: jest.fn(),
    });

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
    expect(screen.getByTestId('search-form-1')).toBeInTheDocument();
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

  it('displays single user data correctly', () => {
    (useUserQueries as jest.Mock)
      .mockReturnValueOnce({
        userData: mockUser1,
        loading: false,
        error: null,
      })
      .mockReturnValueOnce({
        userData: null,
        loading: false,
        error: null,
      });

    (useComparisonState as jest.Mock).mockReturnValue({
      state: {
        username1: 'user1',
        username2: '',
        searchedUsername1: 'user1',
        searchedUsername2: '',
        isComparing: false,
      },
      setState: jest.fn(),
      handleSearch: jest.fn(),
      toggleComparing: jest.fn(),
    });

    render(<ComparisonView onSearchStateChange={mockOnSearchStateChange} />);

    expect(screen.getByText(`User: ${mockUser1.login}`)).toBeInTheDocument();
    expect(screen.getByTestId(`repo-list-${mockUser1.login}`)).toBeInTheDocument();
  });

  it('displays comparison view correctly', async () => {
    (useUserQueries as jest.Mock)
      .mockReturnValueOnce({
        userData: mockUser1,
        loading: false,
        error: null,
      })
      .mockReturnValueOnce({
        userData: mockUser2,
        loading: false,
        error: null,
      });

    (useComparisonState as jest.Mock).mockReturnValue({
      state: {
        username1: 'user1',
        username2: 'user2',
        searchedUsername1: 'user1',
        searchedUsername2: 'user2',
        isComparing: true,
      },
      setState: jest.fn(),
      handleSearch: jest.fn(),
      toggleComparing: jest.fn(),
    });

    (useGitHubRank as jest.Mock).mockReturnValue({
      winner: 1,
      user1Score: 100,
      user2Score: 80,
    });

    render(<ComparisonView onSearchStateChange={mockOnSearchStateChange} />);

    expect(screen.getByTestId('search-form-1')).toBeInTheDocument();
    expect(screen.getByTestId('search-form-2')).toBeInTheDocument();
    expect(screen.getByTestId('toggle-comparison-button')).toBeInTheDocument();

    expect(screen.getByText(`User: ${mockUser1.login}`)).toBeInTheDocument();
    expect(screen.getByText(`User: ${mockUser2.login}`)).toBeInTheDocument();

    expect(screen.getByTestId('winner-badge')).toBeInTheDocument();
  });

  it('handles search state changes correctly', async () => {
    (useUserQueries as jest.Mock)
      .mockReturnValueOnce({
        userData: mockUser1,
        loading: false,
        error: null,
      });

    render(<ComparisonView onSearchStateChange={mockOnSearchStateChange} />);

    await waitFor(() => {
      expect(mockOnSearchStateChange).toHaveBeenCalledWith(true);
    });
  });

  it('handles errors in both users correctly', () => {
    const mockError1 = new Error('User 1 not found');
    const mockError2 = new Error('User 2 not found');

    (useUserQueries as jest.Mock)
      .mockReturnValueOnce({
        userData: null,
        loading: false,
        error: mockError1,
      })
      .mockReturnValueOnce({
        userData: null,
        loading: false,
        error: mockError2,
      });

    (useComparisonState as jest.Mock).mockReturnValue({
      state: {
        username1: 'user1',
        username2: 'user2',
        searchedUsername1: 'user1',
        searchedUsername2: 'user2',
        isComparing: true,
      },
      setState: jest.fn(),
      handleSearch: jest.fn(),
      toggleComparing: jest.fn(),
    });

    render(<ComparisonView onSearchStateChange={mockOnSearchStateChange} />);

    expect(screen.getAllByRole('alert')).toHaveLength(2);
  });

  it('handles mixed loading states correctly', () => {
    (useUserQueries as jest.Mock)
      .mockReturnValueOnce({
        userData: mockUser1,
        loading: false,
        error: null,
      })
      .mockReturnValueOnce({
        userData: null,
        loading: true,
        error: null,
      });

    (useComparisonState as jest.Mock).mockReturnValue({
      state: {
        username1: 'user1',
        username2: 'user2',
        searchedUsername1: 'user1',
        searchedUsername2: 'user2',
        isComparing: true,
      },
      setState: jest.fn(),
      handleSearch: jest.fn(),
      toggleComparing: jest.fn(),
    });

    render(<ComparisonView onSearchStateChange={mockOnSearchStateChange} />);

    expect(screen.getByText(`User: ${mockUser1.login}`)).toBeInTheDocument();
    expect(screen.getByTestId('search-form-2')).toBeInTheDocument();
  });
});
