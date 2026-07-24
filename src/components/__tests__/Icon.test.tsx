import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Icon } from '../Icon';

describe('Icon', () => {
  it('renders correctly', () => {
    const { container } = render(<Icon name="trending" />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
