import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router';

import { render, screen } from '@testing-library/react';
import useSWR from 'swr';

import { useToast } from '../../context/ToastContext/ToastContext';

import Movie from './Movie';

jest.mock('swr');
jest.mock('../../api', () => ({
  api: {
    get: jest.fn()
  }
}));

const mockSetUser = jest.fn(); // Mock the setUser function
jest.mock('../../context/UserContext/UserContext', () => ({
  user: {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user'
  },
  useUser: () => ({
    setUser: mockSetUser
  })
}));

jest.mock('../../context/ToastContext/ToastContext');
const mockUseToast = useToast as jest.Mock;
const mockShowToast = jest.fn();

beforeEach(() => {
  mockUseToast.mockReturnValue({ showToast: mockShowToast });
});

describe('Movie Page', () => {
  const mockUseSWR = useSWR as jest.Mock;

  const mockMovieData = {
    data: {
      movie: {
        poster_url: 'http://example.com/poster.jpg',
        title: 'Test Movie',
        year: 2021,
        length: 120,
        watched: true,
        backedUp: false,
        size: 2,
        backupDate: ''
      }
    }
  };

  beforeEach(() => {
    mockUseSWR.mockReturnValue({
      data: mockMovieData,
      error: null,
      isLoading: false,
      mutate: jest.fn()
    });
  });

  it('renders loading spinner when loading', () => {
    mockUseSWR.mockReturnValueOnce({
      data: null,
      error: null,
      isLoading: true,
      mutate: jest.fn()
    });

    render(
      <MemoryRouter initialEntries={['/movie/1']}>
        <Routes>
          <Route path="/movie/:movieId" element={<Movie />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders error message on error', () => {
    mockUseSWR.mockReturnValueOnce({
      data: null,
      error: true,
      isLoading: false,
      mutate: jest.fn()
    });

    render(
      <MemoryRouter initialEntries={['/movie/1']}>
        <Routes>
          <Route path="/movie/:movieId" element={<Movie />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/error loading movie/i)).toBeInTheDocument();
  });

  it('renders movie details correctly', () => {
    render(
      <MemoryRouter initialEntries={['/movie/1']}>
        <Routes>
          <Route path="/movie/:movieId" element={<Movie />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByAltText(/test movie poster/i)).toBeInTheDocument();
    expect(screen.getByText(/test movie/i)).toBeInTheDocument();
    expect(screen.getByText(/2021/i)).toBeInTheDocument();
    expect(screen.getByText(/2h 0min/i)).toBeInTheDocument();
    expect(screen.getByText(/2 gb/i)).toBeInTheDocument();
    expect(screen.getByText(/no backup date/i)).toBeInTheDocument();
  });
});
