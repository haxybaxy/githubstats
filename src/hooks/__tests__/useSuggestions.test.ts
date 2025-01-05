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
    // Create elements first
    const mockSuggestionDiv = document.createElement('div');
    const outsideDiv = document.createElement('div');

    // Create a ref before rendering the hook
    const mockRef = { current: mockSuggestionDiv };

    // Mock useRef to return our controlled ref
    jest.spyOn(React, 'useRef').mockReturnValue(mockRef);

    const { result } = renderHook(() => useSuggestions());

    // Show suggestions first
    act(() => {
      result.current.setShowSuggestions(true);
    });

    // Add elements to document
    document.body.appendChild(mockSuggestionDiv);
    document.body.appendChild(outsideDiv);

    // Create mousedown event with the outside element as target
    const mockEvent = new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
    });
    Object.defineProperty(mockEvent, 'target', {
      value: outsideDiv,
      configurable: true
    });

    // Log state before click
    console.log('Before click:', {
      showSuggestions: result.current.showSuggestions,
      hasRef: !!mockRef.current,
      target: outsideDiv,
      contains: mockRef.current?.contains(outsideDiv)
    });

    // Trigger the document event
    act(() => {
      document.dispatchEvent(mockEvent);
    });

    // Log state after click
    console.log('After click:', {
      showSuggestions: result.current.showSuggestions,
      hasRef: !!mockRef.current,
      target: outsideDiv,
      contains: mockRef.current?.contains(outsideDiv)
    });

    // Verify suggestions are hidden
    expect(result.current.showSuggestions).toBe(false);

    // Cleanup
    document.body.removeChild(mockSuggestionDiv);
    document.body.removeChild(outsideDiv);
    jest.restoreAllMocks();
  });
});
