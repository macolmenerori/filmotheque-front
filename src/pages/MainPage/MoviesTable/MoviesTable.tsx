import React from 'react';

import { MoviesTableProps } from './MoviesTable.types';

const MoviesTable = ({ movies }: MoviesTableProps) => {
  const movieRows = movies.map((movie) => (
    <tr key={movie.id}>
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="flex items-center">
          <div className="flex-shrink-0 w-10 h-10">
            {/* TODO: poster */}
            <img
              className="w-10 h-10 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
              alt=""
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
          {/* TODO: fix hours */}
          {`${Math.floor(movie.lenght / 60)}h ${movie.lenght % 60}min`}
        </div>
        <div className="text-xs leading-5 text-gray-500">{`${movie.lenght} min`}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        {/* TODO: backed up chips */}
        <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
          Backed Up
        </span>
        {movie.backedUp && (
          <div className="text-xs leading-5 text-gray-500 ml-2 mt-1">{`${movie.size} GB`}</div>
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
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  Title
                </th>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  Length
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
