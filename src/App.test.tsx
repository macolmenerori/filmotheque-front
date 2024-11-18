import * as React from 'react';

import { render, screen, waitFor } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('renders without crashing', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Hello, world!')).toBeInTheDocument();
    });
  });
});
