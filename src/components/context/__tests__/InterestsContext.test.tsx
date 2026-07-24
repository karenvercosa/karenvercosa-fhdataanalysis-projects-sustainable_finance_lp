import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { InterestsProvider, useInterests } from '../InterestsContext';

describe('InterestsContext', () => {
  it('adds and removes interests', () => {
    const { result } = renderHook(() => useInterests(), {
      wrapper: InterestsProvider
    });

    // default seed has ESG
    expect(result.current.interests).toContain('ESG');

    act(() => {
      result.current.add('New Interest');
    });
    expect(result.current.interests).toContain('New Interest');

    act(() => {
      // should not add duplicate (case insensitive)
      result.current.add('new interest');
      // should not add empty
      result.current.add('   ');
    });
    expect(result.current.interests.filter(i => i.toLowerCase() === 'new interest')).toHaveLength(1);

    act(() => {
      result.current.remove('New Interest');
    });
    expect(result.current.interests).not.toContain('New Interest');
  });

  it('throws error outside provider', () => {
    // Suppress console.error for expected throw
    const originalError = console.error;
    console.error = () => {};
    expect(() => {
      renderHook(() => useInterests());
    }).toThrow('useInterests deve ser usado dentro de <InterestsProvider>');
    console.error = originalError;
  });
});
