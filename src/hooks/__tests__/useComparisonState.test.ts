import { renderHook, act } from '@testing-library/react';
import { useComparisonState } from '../useComparisonState';

describe('useComparisonState', () => {
  it('initializes with default values', () => {
    const { result } = renderHook(() => useComparisonState());

    expect(result.current.state).toEqual({
      username1: '',
      username2: '',
      searchedUsername1: '',
      searchedUsername2: '',
      isComparing: false,
    });
  });

  it('handles search form submission', () => {
    const { result } = renderHook(() => useComparisonState());
    const mockEvent = { preventDefault: jest.fn() };

    // Set usernames
    act(() => {
      result.current.setState(prev => ({
        ...prev,
        username1: 'user1',
        username2: 'user2',
      }));
    });

    // Submit form
    act(() => {
      result.current.handleSearch(mockEvent as any);
    });

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(result.current.state.searchedUsername1).toBe('user1');
    expect(result.current.state.searchedUsername2).toBe('user2');
  });

  it('toggles comparison mode correctly', () => {
    const { result } = renderHook(() => useComparisonState());

    // Enable comparison mode
    act(() => {
      result.current.toggleComparing();
    });

    expect(result.current.state.isComparing).toBe(true);
    expect(result.current.state.username2).toBe('');
    expect(result.current.state.searchedUsername2).toBe('');

    // Disable comparison mode
    act(() => {
      result.current.toggleComparing();
    });

    expect(result.current.state.isComparing).toBe(false);
    expect(result.current.state.username2).toBe('');
    expect(result.current.state.searchedUsername2).toBe('');
  });

  it('updates state correctly', () => {
    const { result } = renderHook(() => useComparisonState());

    act(() => {
      result.current.setState(prev => ({
        ...prev,
        username1: 'testuser',
        isComparing: true,
      }));
    });

    expect(result.current.state.username1).toBe('testuser');
    expect(result.current.state.isComparing).toBe(true);
  });
});
