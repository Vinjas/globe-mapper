import { render, screen } from '@testing-library/react';
import { StatesModal } from '@/components';

describe('StatesModal', () => {
  const mockOnCancel = jest.fn();
  const props = {
    countryName: 'USA',
    states: [{ name: 'California' }, { name: 'Texas' }, { name: 'New York' }],
    isOpen: true,
    onCancel: mockOnCancel
  };

  it('renders the modal when isOpen is true', () => {
    render(<StatesModal {...props} />);
    expect(screen.getByText('(3) USA States:')).toBeInTheDocument();
  });

  it('does not render the modal when isOpen is false', () => {
    render(<StatesModal {...props} isOpen={false} />);
    expect(screen.queryByText('(3) USA States:')).not.toBeInTheDocument();
  });

  it('renders the correct number of states', () => {
    render(<StatesModal {...props} />);
    expect(screen.getByText(/California/i)).toBeInTheDocument();
    expect(screen.getByText(/Texas/i)).toBeInTheDocument();
    expect(screen.getByText(/New York/i)).toBeInTheDocument();
  });
});
