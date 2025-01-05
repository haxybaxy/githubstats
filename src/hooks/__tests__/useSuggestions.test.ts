import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { useSuggestions } from '../useSuggestions';

describe('useSuggestions', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should initialize with showSuggestions as false', () => {
    const { result } = renderHook(() => useSuggestions());
    expect(result.current.showSuggestions).toBe(false);
  });

  it('should update showSuggestions when setShowSuggestions is called', () => {
    const { result } = renderHook(() => useSuggestions());

    act(() => {
      result.current.setShowSuggestions(true);
    });

    expect(result.current.showSuggestions).toBe(true);
  });


  it('should not hide suggestions when clicking inside', () => {
    const { result } = renderHook(() => useSuggestions());

    act(() => {
      result.current.setShowSuggestions(true);
    });

    const mockDiv = document.createElement('div');

    const mockRef = { current: mockDiv };
    Object.defineProperty(result.current, 'suggestionRef', {
      get: () => mockRef
    });

    const mockEvent = new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
    });
    Object.defineProperty(mockEvent, 'target', { value: mockDiv });

    act(() => {
      document.dispatchEvent(mockEvent);
    });

    expect(result.current.showSuggestions).toBe(true);
  });

  it('should clean up event listener on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');
    const { unmount } = renderHook(() => useSuggestions());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'mousedown',
      expect.any(Function)
    );

    removeEventListenerSpy.mockRestore();
  });

  it('should hide suggestions when clicking outside', () => {
    const mockSuggestionDiv = document.createElement('div');
    const outsideDiv = document.createElement('div');

    const mockRef = { current: mockSuggestionDiv };

    jest.spyOn(React, 'useRef').mockReturnValue(mockRef);

    const { result } = renderHook(() => useSuggestions());

    act(() => {
      result.current.setShowSuggestions(true);
    });

    document.body.appendChild(mockSuggestionDiv);
    document.body.appendChild(outsideDiv);

    const mockEvent = new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
    });
    Object.defineProperty(mockEvent, 'target', {
      value: outsideDiv,
      configurable: true
    });

    console.log('Before click:', {
      showSuggestions: result.current.showSuggestions,
      hasRef: !!mockRef.current,
      target: outsideDiv,
      contains: mockRef.current?.contains(outsideDiv)
    });

    act(() => {
      document.dispatchEvent(mockEvent);
    });

    console.log('After click:', {
      showSuggestions: result.current.showSuggestions,
      hasRef: !!mockRef.current,
      target: outsideDiv,
      contains: mockRef.current?.contains(outsideDiv)
    });

    expect(result.current.showSuggestions).toBe(false);

    document.body.removeChild(mockSuggestionDiv);
    document.body.removeChild(outsideDiv);
    jest.restoreAllMocks();
  });
});
