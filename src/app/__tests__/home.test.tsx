import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Home from '../page';

describe('Home', () => {
  it('renders the default Next.js page', () => {
    render(<Home />);

    const content = screen.getByText('Get started by editing');

    expect(content).toBeInTheDocument();
  });
});
