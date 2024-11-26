import React from 'react';

import BackedUpChip from '../../../common/components/Chips/BackedUpChip/BackedUpChip';
import WatchedChip from '../../../common/components/Chips/WatchedChip/WatchedChip';

import { MoviesTableProps } from './MoviesTable.types';

const MoviesTable = ({ movies, onSort, sortBy, sortOrder }: MoviesTableProps) => {
  const getSortIcon = (column: string) => {
    if (sortBy === column) {
      return sortOrder === 'asc' ? '↑' : '↓';
    }
    return '';
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
            <div className="text-sm font-medium leading-5 text-gray-900">{movie.title}</div>
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
        {/* TODO: edit */}
        <a href="google.com" className="text-indigo-600 hover:text-indigo-900">
          Edit
        </a>
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
    </div>
  );
};

export default MoviesTable;
