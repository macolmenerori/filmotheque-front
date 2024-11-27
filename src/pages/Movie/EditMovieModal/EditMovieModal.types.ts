import { Movie } from '../../../common/types/Movie.types';

export type EditMovieModalProps = {
  movie: Movie;
  onClose: () => void;
  onSave: (movie: Partial<Movie>) => void;
};
