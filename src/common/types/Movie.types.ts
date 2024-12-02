import { Pagination } from './Api.types';

export type MovieApiResponse = {
  status: string;
  message: string;
  data: {
    movies: Movie[];
  };
  pagination: Pagination;
};

export type FullMovieApiResponse = {
  status: string;
  message: string;
  data: {
    movie: Movie;
  };
};

export type SearchMovie = {
  title: string;
  year: number;
  ids: Record<string, string | number>;
};

export type SearchMovieApiResponse = {
  status: string;
  message: string;
  movies: SearchMovie[];
};

export type Movie = {
  _id?: string;
  user?: string;
  title: string;
  year: number;
  length: number;
  media: string[];
  size: number;
  watched: boolean;
  meta_ids: Record<string, string | number>;
  backedUp: boolean;
  backupDate: string;
  id: string;
  poster_url: string;
};

export type MovieFormData = Omit<Movie, 'media'> & { media: string };
