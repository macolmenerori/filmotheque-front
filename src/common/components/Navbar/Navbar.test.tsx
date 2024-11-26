import React from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { authApi } from '../../../api';
import { useUser } from '../../../context/UserContext/UserContext';

import Navbar from './Navbar';

jest.mock('../../../context/UserContext/UserContext');
jest.mock('../../../api');

describe('Navbar', () => {
  const mockSetUser = jest.fn();
  (authApi.delete as jest.Mock).mockResolvedValue({});

  beforeEach(() => {
    (useUser as jest.Mock).mockReturnValue({ setUser: mockSetUser });
    (authApi.delete as jest.Mock).mockResolvedValue({});
  });

  it('renders the Navbar component', () => {
    render(<Navbar />);

    expect(screen.getByText('filmotheque')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });

  it('calls handleLogout when the logout button is clicked', async () => {
    render(<Navbar />);

    const logoutButton = screen.getByRole('button', { name: /logout/i });
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(authApi.delete).toHaveBeenCalledWith('/v1/users/logout');
    });
    expect(mockSetUser).toHaveBeenCalledWith(null);
  });
});
