import React from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { api } from '../../api';
import { useToast } from '../../context/ToastContext/ToastContext';
import { useUser } from '../../context/UserContext/UserContext';

import NewMovie from './NewMovie';

jest.mock('../../api');

const mockUser = {
  name: 'John Doe',
  email: 'john@example.com',
  role: 'user'
};
jest.mock('../../context/UserContext/UserContext', () => ({
  useUser: jest.fn()
}));

jest.mock('../../context/ToastContext/ToastContext');
const mockUseToast = useToast as jest.Mock;
const mockShowToast = jest.fn();

jest.useFakeTimers();

describe('NewMovie', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useUser as jest.Mock).mockReturnValue({ user: mockUser });
    mockUseToast.mockReturnValue({ showToast: mockShowToast });
  });

  it('renders form fields correctly', () => {
    render(<NewMovie />);

    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Poster URL/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Year/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Length \(minutes\)/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ID/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Watched/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Backed Up/i)).toBeInTheDocument();
  });

  it('shows validation errors on submit with empty fields', async () => {
    render(<NewMovie />);

    fireEvent.click(screen.getByText(/Submit/i));

    await waitFor(() => {
      expect(screen.getByText(/Title is required/i)).toBeInTheDocument();
    });
  });

  it('submits form successfully', async () => {
    (api.post as jest.Mock).mockResolvedValue({ status: 201 });
    (useUser as jest.Mock).mockReturnValue({ user: mockUser });

    render(<NewMovie />);

    fireEvent.input(screen.getByLabelText(/Title/i), { target: { value: 'Inception' } });
    fireEvent.input(screen.getByLabelText(/Year/i), { target: { value: 2010 } });
    fireEvent.input(screen.getByLabelText(/Length \(minutes\)/i), { target: { value: 148 } });

    fireEvent.click(screen.getByText(/Submit/i));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith(
        '/v1/movies/movie',
        expect.objectContaining({
          backedUp: false,
          backupDate: '',
          length: 148,
          media: [],
          meta_ids: {},
          poster_url: '',
          size: 0,
          title: 'Inception',
          user: mockUser.email,
          watched: false,
          year: 2010
        }),
        expect.any(Object)
      );
    });
  });

  it('fetches movie suggestions on title input', async () => {
    (api.get as jest.Mock).mockResolvedValue({
      data: {
        movies: [{ title: 'Inception', year: 2010, ids: { trakt: 12345 } }]
      }
    });

    render(<NewMovie />);

    fireEvent.input(screen.getByLabelText(/Title/i), { target: { value: 'Inception' } });

    jest.runAllTimers();

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith('/v1/movies/searchmovie?title=Inception');
    });
    await waitFor(() => {
      expect(screen.getByLabelText(/Year/i)).toHaveValue(2010);
    });
  });

  it('shows conditional fields when backed up is checked', () => {
    render(<NewMovie />);

    fireEvent.click(screen.getByLabelText(/Backed Up/i));

    expect(screen.getByLabelText(/Backup Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Size \(GB\)/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Media/i)).toBeInTheDocument();
  });
});
