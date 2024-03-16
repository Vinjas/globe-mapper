import { render, screen } from '@testing-library/react';
import { Button } from '@/components';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button type="primary">Test Button</Button>);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('applies primary styles when type is primary', () => {
    render(<Button type="primary">Test Button</Button>);
    const button = screen.getByText('Test Button');
    expect(button).toHaveStyle('background-color: rgb(110, 29, 27)');
    expect(button).toHaveStyle(
      'box-shadow: 0px 4px 9px 0px rgba(0, 0, 0, 0.25)'
    );
  });

  it('applies secondary styles when type is secondary', () => {
    render(<Button type="secondary">Test Button</Button>);
    const button = screen.getByText('Test Button');
    expect(button).toHaveStyle('background-color: rgb(23, 33, 82)');
    expect(button).toHaveStyle('box-shadow: none');
  });
});
