import { Pagination } from './Api.types';

export type MovieApiResponse = {
  status: string;
  message: string;
  data: {
    movies: Movie[];
  };
  pagination: Pagination;
};

export type Movie = {
  _id: string;
  title: string;
  year: number;
  length: number;
  media: string[];
  size: number;
  watched: boolean;
  meta_ids: string[];
  user: string;
  backedUp: boolean;
  backupDate: string;
  id: string;
  poster_url: string;
};
