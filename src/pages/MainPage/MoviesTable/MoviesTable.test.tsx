import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';

import { Movie } from '../../../common/types/Movie.types';
import { useToast } from '../../../context/ToastContext/ToastContext';
import mockMovies from '../../../mocks/mockMovies.json';

import MoviesTable from './MoviesTable';

jest.mock('../../../context/ToastContext/ToastContext');

const mockUseToast = useToast as jest.Mock;
const mockShowToast = jest.fn();

beforeEach(() => {
  mockUseToast.mockReturnValue({ showToast: mockShowToast });
});

describe('MoviesTable', () => {
  it('renders table with movies', () => {
    render(
      <BrowserRouter>
        <MoviesTable
          movies={mockMovies as unknown as Movie[]}
          onSort={() => {}}
          sortBy={null}
          sortOrder={null}
          mutate={() => {}}
        />
      </BrowserRouter>
    );

    expect(screen.getByText('GoodFellas')).toBeInTheDocument();
    expect(screen.getByAltText('GoodFellas poster')).toBeInTheDocument();
  });
});
