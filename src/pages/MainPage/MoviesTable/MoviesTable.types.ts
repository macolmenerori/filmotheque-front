import { Movie } from '../../../common/types/Movie.types';

export type MoviesTableProps = {
  movies: Movie[];
  onSort: (column: 'title' | 'year' | 'length') => void;
  sortBy: string | null;
  sortOrder: 'asc' | 'desc' | null;
  mutate: () => void;
};
