import React, { useState } from 'react';
import { NavLink } from 'react-router';

import { api } from '../../../api';
import BackedUpChip from '../../../common/components/Chips/BackedUpChip/BackedUpChip';
import WatchedChip from '../../../common/components/Chips/WatchedChip/WatchedChip';
import { Movie } from '../../../common/types/Movie.types';
import { useToast } from '../../../context/ToastContext/ToastContext';

import { MoviesTableProps } from './MoviesTable.types';

const MoviesTable = ({ movies, onSort, sortBy, sortOrder, mutate }: MoviesTableProps) => {
  const { showToast } = useToast();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleOpenModal = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsDeleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedMovie(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedMovie) return;

    try {
      const res = await api.delete(`/v1/movies/movie?id=${selectedMovie.id}`);

      if (res.status === 204) {
        showToast({ title: 'Success', message: 'The movie was deleted', type: 'success' });
        mutate();
      } else {
        throw new Error('Failed to delete movie');
      }
    } catch (e) {
      showToast({ title: 'Error', message: 'Failed to delete the movie', type: 'danger' });
    } finally {
      handleCloseModal();
    }
  };

  const getSortIcon = (column: string) => {
    if (sortBy === column) {
      return sortOrder === 'asc' ? '↑' : '↓';
    }
    return '';
  };

  const handleMarkAsWatched = async (movieId: string, movieWatched: boolean) => {
    try {
      const res = await api.patch(
        '/v1/movies/movie',
        { watched: !movieWatched, id: movieId },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (res.status === 200) {
        showToast({
          title: 'Success',
          message: `Movie marked as ${!movieWatched ? 'watched' : 'unwatched'}`,
          type: 'success'
        });
        // Refresh table
        mutate();
      } else {
        throw new Error('Failed to mark movie as watched');
      }
    } catch (e) {
      showToast({ title: 'Error', message: 'Failed to mark movie as watched', type: 'danger' });
    }
  };

  const movieRows = movies.map((movie) => (
    <tr key={movie.id}>
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="flex items-center">
          <div className="flex-shrink-0 w-10 h-14">
            <img
              className="w-10 h-14"
              src={movie.poster_url !== '' ? `${movie.poster_url}` : './assets/moviePosterIcon.png'}
              alt={`${movie.title} poster`}
            />
          </div>

          <div className="ml-4">
            <div className="text-sm font-medium leading-5 text-gray-900">
              <NavLink to={`/movie/${movie.id}`} className="text-blue-600 hover:text-blue-900">
                {movie.title}
              </NavLink>
            </div>
            <div className="text-sm leading-5 text-gray-500">{movie.year}</div>
          </div>
        </div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="text-sm leading-5 text-gray-900">
          {`${Math.floor(movie.length / 60)}h ${movie.length % 60}min`}
        </div>
        <div className="text-xs leading-5 text-gray-500">{`${movie.length} min`}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <WatchedChip watched={movie.watched} />
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <BackedUpChip backedUp={movie.backedUp} />
        {movie.backedUp && (
          <div className="text-xs leading-5 text-gray-500 ml-5 mt-1">{`${movie.size} GB`}</div>
        )}
      </td>

      <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
        <div className="text-sm leading-5 text-gray-500">{`${movie.media.join(', ')}`}</div>
      </td>

      <td className="px-6 py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200">
        <div className="flex flex-col gap-2">
          <button
            className={`border-0 bg-transparent ${movie.watched ? 'text-amber-400 hover:text-amber-900' : 'text-green-600 hover:text-green-900'}`}
            onClick={() => handleMarkAsWatched(movie.id, movie.watched)}
          >
            {`Mark as ${movie.watched ? 'unwatched' : 'watched'}`}
          </button>
          <button
            className="border-0 bg-transparent text-red-600 hover:text-red-900"
            onClick={() => handleOpenModal(movie)}
          >
            Remove
          </button>
        </div>
      </td>
    </tr>
  ));

  return (
    <div className="flex flex-col mt-10">
      <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
          <table className="min-w-full">
            <thead>
              <tr>
                <th
                  className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50 cursor-pointer"
                  onClick={() => onSort('title')}
                >
                  Title {getSortIcon('title')}
                </th>
                <th
                  className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50 cursor-pointer"
                  onClick={() => onSort('length')}
                >
                  Length {getSortIcon('length')}
                </th>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  Watched
                </th>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  Backed Up
                </th>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  Media
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
              </tr>
            </thead>
            <tbody className="bg-white">{movieRows}</tbody>
          </table>
        </div>
      </div>
      {/* Delete movie confirmation modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold">Confirm Deletion</h2>
            <p className="text-sm text-gray-700 mt-2">
              Are you sure you want to delete <strong>{selectedMovie?.title}</strong>?
            </p>
            <div className="mt-4 flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={handleConfirmDelete}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviesTable;
