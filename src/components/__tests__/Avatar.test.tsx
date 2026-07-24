import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Avatar } from '../Avatar';

describe('Avatar', () => {
  it('renders correctly with given initials', () => {
    render(<Avatar name="Victor Gabriel" />);
    expect(screen.getByText('VG')).toBeInTheDocument();
  });
});
