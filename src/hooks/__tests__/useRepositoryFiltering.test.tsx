import { renderHook, act } from '@testing-library/react';
import { useRepositoryFiltering } from '../useRepositoryFiltering';
import { Repository } from '../../types/github';
describe('useRepositoryFiltering', () => {
  const mockRepositories = [
    {
      id: '1',
      name: 'repo1',
      forkCount: 10,
      stargazerCount: 5,
      updatedAt: '2024-03-01T00:00:00Z',
      primaryLanguage: { name: 'JavaScript' }
    },
    {
      id: '2',
      name: 'repo2',
      forkCount: 5,
      stargazerCount: 10,
      updatedAt: '2024-03-02T00:00:00Z',
      primaryLanguage: { name: 'TypeScript' }
    },
    {
      id: '3',
      name: 'repo3',
      forkCount: 15,
      stargazerCount: 15,
      updatedAt: '2024-03-03T00:00:00Z',
      primaryLanguage: { name: 'Python' }
    }
  ] as Repository[]; // Type assertion for brevity

  it('sorts repositories by forks', () => {
    const { result } = renderHook(() => useRepositoryFiltering(mockRepositories));

    act(() => {
      result.current.setSortBy('forks');
    });

    const { paginatedRepos } = result.current.getFilteredAndSortedRepos();
    // Default sort order is 'desc', so highest forks should be first
    expect(paginatedRepos[0].forkCount).toBe(15);
    expect(paginatedRepos[1].forkCount).toBe(10);
    expect(paginatedRepos[2].forkCount).toBe(5);
  });

  it('sorts repositories by update date', () => {
    const { result } = renderHook(() => useRepositoryFiltering(mockRepositories));

    act(() => {
      result.current.setSortBy('updated');
    });

    const { paginatedRepos } = result.current.getFilteredAndSortedRepos();
    // Default sort order is 'desc', so most recent should be first
    expect(paginatedRepos[0].updatedAt).toBe('2024-03-03T00:00:00Z');
    expect(paginatedRepos[1].updatedAt).toBe('2024-03-02T00:00:00Z');
    expect(paginatedRepos[2].updatedAt).toBe('2024-03-01T00:00:00Z');
  });

  it('handles ascending sort order', () => {
    const { result } = renderHook(() => useRepositoryFiltering(mockRepositories));

    act(() => {
      result.current.setSortBy('forks');
      result.current.setSortOrder('asc');
    });

    const { paginatedRepos } = result.current.getFilteredAndSortedRepos();
    expect(paginatedRepos[0].forkCount).toBe(5);
    expect(paginatedRepos[1].forkCount).toBe(10);
    expect(paginatedRepos[2].forkCount).toBe(15);
  });

  it('defaults to sorting by stars', () => {
    const { result } = renderHook(() => useRepositoryFiltering(mockRepositories));

    const { paginatedRepos } = result.current.getFilteredAndSortedRepos();
    // Default sort order is 'desc', so highest stars should be first
    expect(paginatedRepos[0].stargazerCount).toBe(15);
    expect(paginatedRepos[1].stargazerCount).toBe(10);
    expect(paginatedRepos[2].stargazerCount).toBe(5);
  });
});
