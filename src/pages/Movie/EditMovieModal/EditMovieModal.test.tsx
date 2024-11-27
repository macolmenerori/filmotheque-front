import React from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { Movie } from '../../../common/types/Movie.types';
import Movies from '../../../mocks/mockMovies.json';

import EditMovieModal from './EditMovieModal';

const mockMovie = Movies[0] as Movie;

const mockOnClose = jest.fn();
const mockOnSave = jest.fn();

describe('EditMovieModal', () => {
  beforeEach(() => {
    mockOnClose.mockClear();
    mockOnSave.mockClear();
  });

  it('renders modal with movie details', () => {
    render(<EditMovieModal movie={mockMovie} onClose={mockOnClose} onSave={mockOnSave} />);
    expect(screen.getByText(`Edit ${mockMovie.title}`)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockMovie.title)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockMovie.year.toString())).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockMovie.length.toString())).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockMovie.size.toString())).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockMovie.media.join(','))).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockMovie.poster_url)).toBeInTheDocument();
  });

  it('calls onClose when cancel button is clicked', () => {
    render(<EditMovieModal movie={mockMovie} onClose={mockOnClose} onSave={mockOnSave} />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('calls onSave with modified fields when save button is clicked', async () => {
    render(<EditMovieModal movie={mockMovie} onClose={mockOnClose} onSave={mockOnSave} />);
    fireEvent.change(screen.getByTestId('year-input'), { target: { value: 2002 } });
    fireEvent.click(screen.getByText('Save'));
    await waitFor(() => {
      expect(mockOnSave).toHaveBeenCalled();
    });
  });

  it('does not call onSave if no fields are modified', async () => {
    render(<EditMovieModal movie={mockMovie} onClose={mockOnClose} onSave={mockOnSave} />);
    fireEvent.click(screen.getByText('Save'));
    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(mockOnSave).not.toHaveBeenCalled();
    });
  });

  it('displays validation errors for required fields', async () => {
    render(<EditMovieModal movie={mockMovie} onClose={mockOnClose} onSave={mockOnSave} />);
    fireEvent.change(screen.getByDisplayValue(mockMovie.title), { target: { value: '' } });
    fireEvent.click(screen.getByText('Save'));
    await waitFor(() => {
      expect(screen.getByText('Title is required')).toBeInTheDocument();
    });
  });
});
