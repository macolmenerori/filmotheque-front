import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import useSWR from 'swr';

import { useToast } from '../../context/ToastContext/ToastContext';
import mockMovies from '../../mocks/mockMovies.json';

import MainPage from './MainPage';

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

jest.mock('swr');

jest.mock('../../context/ToastContext/ToastContext');

const mockUseToast = useToast as jest.Mock;
const mockShowToast = jest.fn();

beforeEach(() => {
  mockUseToast.mockReturnValue({ showToast: mockShowToast });
});

describe('MainPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the main page', () => {
    (useSWR as jest.Mock).mockReturnValue({ isLoading: true });
    render(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    );

    expect(screen.getByText('My collection')).toBeInTheDocument();
  });

  it('renders loading spinner when data is loading', () => {
    (useSWR as jest.Mock).mockReturnValue({ isLoading: true });

    render(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders error message when there is an error', () => {
    (useSWR as jest.Mock).mockReturnValue({ error: true });

    render(<MainPage />);

    expect(screen.getByText(/error retrieving movies/i)).toBeInTheDocument();
  });

  it('renders no movies found message when there are no movies', () => {
    (useSWR as jest.Mock).mockReturnValue({
      data: { data: { movies: [] }, pagination: { totalCount: 0, currentPage: 1, totalPages: 1 } }
    });

    render(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    );

    expect(screen.getByText(/no movies found/i)).toBeInTheDocument();
  });

  it('renders movies table when data is available', async () => {
    const mockReturnData = {
      data: {
        data: { movies: mockMovies },
        pagination: { totalCount: 6, currentPage: 1, totalPages: 2 }
      }
    };
    (useSWR as jest.Mock).mockReturnValue(mockReturnData);

    render(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/gladiator/i)).toBeInTheDocument();
    });
  });

  it('handles filter watched button click', () => {
    jest.mock('swr');
    const mockReturnData = {
      data: { data: { movies: [] }, pagination: { totalCount: 0 } }
    };
    (useSWR as jest.Mock).mockReturnValue(mockReturnData);

    render(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    );

    const filterWatchedButton = screen.getByText(/show watched only/i);
    fireEvent.click(filterWatchedButton);

    expect(filterWatchedButton).toHaveTextContent(/showing watched only/i);
  });

  it('handles filter backed up button click', () => {
    (useSWR as jest.Mock).mockReturnValue({
      data: { data: { movies: [] }, pagination: { totalCount: 0 } }
    });

    render(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    );

    const filterBackedUpButton = screen.getByText(/show backed up only/i);
    fireEvent.click(filterBackedUpButton);

    expect(filterBackedUpButton).toHaveTextContent(/showing backed up only/i);
  });

  it('handles sort by year button click', () => {
    (useSWR as jest.Mock).mockReturnValue({
      data: { data: { movies: [] }, pagination: { totalCount: 0 } }
    });

    render(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    );

    const sortByYearButton = screen.getByText(/sort by year/i);
    fireEvent.click(sortByYearButton);

    expect(sortByYearButton).toHaveTextContent(/sorting by year: asc/i);
  });
});
