import { renderHook } from '@testing-library/react';
import { useQuery } from '@apollo/client';
import { useUserQueries } from '../useUserQueries';

// Mock the Apollo Client
jest.mock('@apollo/client', () => ({
  useQuery: jest.fn(),
  gql: (template: TemplateStringsArray) => template[0] // Mock gql as a passthrough function
}));

describe('useUserQueries', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it('returns loading state initially', () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: true,
      data: null,
      error: null
    });

    const { result } = renderHook(() => useUserQueries('testuser', false));

    expect(result.current.loading).toBe(true);
    expect(result.current.userData).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('skips queries when skip is true', () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      data: null,
      error: null
    });

    const { result } = renderHook(() => useUserQueries('testuser', true));

    expect(result.current.loading).toBe(false);
    expect(result.current.userData).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('combines data from all queries when successful', () => {
    (useQuery as jest.Mock).mockReturnValueOnce({
      loading: false,
      data: { user: { name: 'Test User' } },
      error: null
    }).mockReturnValueOnce({
      loading: false,
      data: { user: { contributionsCollection: { totalContributions: 100 } } },
      error: null
    }).mockReturnValueOnce({
      loading: false,
      data: { user: { repositories: { nodes: [] } } },
      error: null
    });

    const { result } = renderHook(() => useUserQueries('testuser', false));

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.userData).toBeTruthy();
  });
});
