import { renderHook } from '@testing-library/react';
import { useGitHubRank } from '../useGitHubRank';
import { User } from '../../types/github';

describe('useGitHubRank', () => {
  const mockUser1: Partial<User> = {
    contributionsCollection: {
      totalCommitContributions: 500,
      totalPullRequestContributions: 75,
      totalIssueContributions: 30,
      totalRepositoryContributions: 20,
      contributionCalendar: {
        totalContributions: 500,
        weeks: []
      }
    },
    repositories: {
      totalCount: 20,
      totalStargazers: [
        { stargazerCount: 100 },
        { stargazerCount: 50 },
      ],
      nodes: []
    },
    followers: {
      totalCount: 100,
    },
    pullRequests: {
      totalCount: 75,
    },
    issues: {
      totalCount: 30,
    }
  };

  const mockUser2: Partial<User> = {
    contributionsCollection: {
      totalCommitContributions: 200,
      totalPullRequestContributions: 30,
      totalIssueContributions: 15,
      totalRepositoryContributions: 10,
      contributionCalendar: {
        totalContributions: 200,
        weeks: []
      }
    },
    repositories: {
      totalCount: 10,
      totalStargazers: [
        { stargazerCount: 25 },
        { stargazerCount: 25 },
      ],
      nodes: []
    },
    followers: {
      totalCount: 50,
    },
    pullRequests: {
      totalCount: 30,
    },
    issues: {
      totalCount: 15,
    }
  };

  it('returns null when either user is null', () => {
    const { result: result1 } = renderHook(() => useGitHubRank(null, mockUser2 as User));
    expect(result1.current).toBeNull();

    const { result: result2 } = renderHook(() => useGitHubRank(mockUser1 as User, null));
    expect(result2.current).toBeNull();

    const { result: result3 } = renderHook(() => useGitHubRank(null, null));
    expect(result3.current).toBeNull();
  });

  it('calculates correct winner based on metrics', () => {
    const { result } = renderHook(() => useGitHubRank(mockUser1 as User, mockUser2 as User));

    expect(result.current).not.toBeNull();
    expect(result.current?.winner).toBe(1);
    expect(result.current?.user1Score).toBeLessThan(result.current!.user2Score);
  });

  it('handles equal users correctly', () => {
    const { result } = renderHook(() => useGitHubRank(mockUser1 as User, mockUser1 as User));

    expect(result.current).not.toBeNull();
    expect(result.current!.scoreDiff).toBe(0);
    expect(result.current!.user1Score).toBe(result.current!.user2Score);
  });

  it('handles users with zero metrics', () => {
    const zeroUser: Partial<User> = {
      contributionsCollection: {
        totalCommitContributions: 0,
        totalPullRequestContributions: 0,
        totalIssueContributions: 0,
        totalRepositoryContributions: 0,
        contributionCalendar: {
          totalContributions: 0,
          weeks: []
        }
      },
      repositories: {
        totalCount: 0,
        totalStargazers: [],
        nodes: []
      },
      followers: {
        totalCount: 0,
      },
      pullRequests: {
        totalCount: 0,
      },
      issues: {
        totalCount: 0,
      }
    };

    const { result } = renderHook(() => useGitHubRank(zeroUser as User, mockUser1 as User));

    expect(result.current).not.toBeNull();
    expect(result.current?.winner).toBe(2);
    expect(result.current?.user1Score).toBeGreaterThan(result.current!.user2Score);
  });

  it('handles extremely high metric values', () => {
    const superUser: Partial<User> = {
      contributionsCollection: {
        totalCommitContributions: 100000,
        totalPullRequestContributions: 5000,
        totalIssueContributions: 3000,
        totalRepositoryContributions: 1000,
        contributionCalendar: {
          totalContributions: 100000,
          weeks: []
        }
      },
      repositories: {
        totalCount: 1000,
        totalStargazers: [
          { stargazerCount: 50000 },
          { stargazerCount: 50000 },
        ],
        nodes: []
      },
      followers: {
        totalCount: 10000,
      },
      pullRequests: {
        totalCount: 5000,
      },
      issues: {
        totalCount: 3000,
      }
    };

    const { result } = renderHook(() => useGitHubRank(superUser as User, mockUser1 as User));

    expect(result.current).not.toBeNull();
    expect(result.current?.winner).toBe(1);
    expect(result.current?.user1Score).toBeLessThan(result.current!.user2Score);
  });

  it('maintains consistent scores across multiple renders', () => {
    const { result: firstRender } = renderHook(() => useGitHubRank(mockUser1 as User, mockUser2 as User));
    const { result: secondRender } = renderHook(() => useGitHubRank(mockUser1 as User, mockUser2 as User));

    expect(firstRender.current).toEqual(secondRender.current);
  });

  it('calculates scores within expected ranges', () => {
    const { result } = renderHook(() => useGitHubRank(mockUser1 as User, mockUser2 as User));

    expect(result.current).not.toBeNull();
    expect(result.current!.user1Score).toBeGreaterThanOrEqual(0);
    expect(result.current!.user1Score).toBeLessThanOrEqual(100);
    expect(result.current!.user2Score).toBeGreaterThanOrEqual(0);
    expect(result.current!.user2Score).toBeLessThanOrEqual(100);
  });
});
