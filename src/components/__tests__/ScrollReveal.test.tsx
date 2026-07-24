import { render } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { ScrollReveal } from '../ScrollReveal';

describe('ScrollReveal', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    // Remove qualquer polyfill de teste.
    // @ts-expect-error limpeza de ambiente
    delete window.IntersectionObserver;
  });

  it('fallback: sem IntersectionObserver, revela tudo imediatamente', () => {
    const el = document.createElement('div');
    el.className = 'reveal';
    document.body.appendChild(el);

    render(<ScrollReveal />);
    expect(el.classList.contains('in')).toBe(true);
  });

  it('usa IntersectionObserver quando disponível e revela ao interceptar', () => {
    const observe = vi.fn();
    const unobserve = vi.fn();
    const disconnect = vi.fn();
    let capturedCb: IntersectionObserverCallback = () => {};

    class IO {
      constructor(cb: IntersectionObserverCallback) {
        capturedCb = cb;
      }
      observe = observe;
      unobserve = unobserve;
      disconnect = disconnect;
    }
    // @ts-expect-error mock mínimo p/ teste
    window.IntersectionObserver = IO;

    const el = document.createElement('div');
    el.className = 'reveal';
    document.body.appendChild(el);

    const { unmount } = render(<ScrollReveal />);
    expect(observe).toHaveBeenCalledWith(el);

    // Simula o elemento entrando na viewport.
    capturedCb(
      [{ isIntersecting: true, target: el } as unknown as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );
    expect(el.classList.contains('in')).toBe(true);
    expect(unobserve).toHaveBeenCalledWith(el);

    unmount();
    expect(disconnect).toHaveBeenCalled();
  });
});
