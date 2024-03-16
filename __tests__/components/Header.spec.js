import { render, screen } from '@iting-library/react';
import { Header } from '@/components';

describe('Header', () => {
  it('renders Header component without crashing', () => {
    render(<Header />);
  });

  it('renders global icon', () => {
    render(<Header />);
    const icon = screen.getByitId('global-icon');
    expect(icon).toBeInTheDocument();
  });

  it('renders title', () => {
    render(<Header />);
    const title = screen.getByText('GlobeMapper');
    expect(title).toBeInTheDocument();
  });
});
