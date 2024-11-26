import React from 'react';

import { render, screen } from '@testing-library/react';

import { Movie } from '../../../common/types/Movie.types';
import mockMovies from '../../../mocks/mockMovies.json';

import MoviesTable from './MoviesTable';

describe('MoviesTable', () => {
  it('renders table with movies', () => {
    render(
      <MoviesTable
        movies={mockMovies as unknown as Movie[]}
        onSort={() => {}}
        sortBy={null}
        sortOrder={null}
      />
    );

    expect(screen.getByText('GoodFellas')).toBeInTheDocument();
    expect(screen.getByAltText('GoodFellas poster')).toBeInTheDocument();
  });
});
