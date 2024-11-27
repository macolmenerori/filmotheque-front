import React, { useState } from 'react';

import { Movie } from '../../../common/types/Movie.types';

import { EditMovieModalProps } from './EditMovieModal.types';

const EditMovieModal = ({ movie, onClose, onSave }: EditMovieModalProps) => {
  const [updatedMovie, setUpdatedMovie] = useState<Movie>(movie);

  const handleSave = () => {
    // If nothing has changed, close the modal
    if (JSON.stringify(updatedMovie) === JSON.stringify(movie)) {
      onClose();
    } else {
      onSave(updatedMovie);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-10/12">
        {/* Header */}
        <h2 className="text-xl font-bold mb-4">Edit {movie.title}</h2>
        {/* Body */}
        <div className="grid gap-4 grid-cols-2">
          <label className="">
            <span className="text-gray-700">Title</span>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
              value={updatedMovie.title}
              onChange={(e) => setUpdatedMovie({ ...updatedMovie, title: e.target.value })}
            />
          </label>
          <label className="">
            <span className="text-gray-700">Year</span>
            <input
              type="number"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
              value={updatedMovie.year}
              onChange={(e) => setUpdatedMovie({ ...updatedMovie, year: parseInt(e.target.value) })}
            />
          </label>
          <label className="">
            <span className="text-gray-700">Length (min)</span>
            <input
              type="number"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
              value={updatedMovie.length}
              onChange={(e) =>
                setUpdatedMovie({ ...updatedMovie, length: parseInt(e.target.value) })
              }
            />
          </label>
          <label className="">
            <span className="text-gray-700">Size (GB)</span>
            <input
              type="number"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
              value={updatedMovie.size}
              onChange={(e) =>
                setUpdatedMovie({ ...updatedMovie, size: parseFloat(e.target.value) })
              }
            />
          </label>
          <label className="">
            <span className="text-gray-700">Media</span>
            <input
              type="string"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
              value={updatedMovie.media.length === 0 ? '' : updatedMovie.media.join(', ')}
              onChange={(e) =>
                setUpdatedMovie({ ...updatedMovie, media: e.target.value.split(', ') })
              }
            />
          </label>
          <label className="">
            <span className="text-gray-700">Poster URL</span>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
              value={updatedMovie.poster_url}
              onChange={(e) => setUpdatedMovie({ ...updatedMovie, poster_url: e.target.value })}
            />
          </label>
          <label className="">
            <input
              type="checkbox"
              className="mr-2"
              checked={updatedMovie.watched}
              onChange={(e) => setUpdatedMovie({ ...updatedMovie, watched: e.target.checked })}
            />
            <span className="text-gray-700">Watched</span>
          </label>
          <label className="">
            <input
              type="checkbox"
              className="mr-2"
              checked={updatedMovie.backedUp}
              onChange={(e) => setUpdatedMovie({ ...updatedMovie, backedUp: e.target.checked })}
            />
            <span className="text-gray-700">Backed up</span>
          </label>
          {updatedMovie.backedUp && (
            <label className="">
              <span className="text-gray-700">Backup Date</span>
              <input
                type="date"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
                value={updatedMovie.backupDate}
                onChange={(e) => setUpdatedMovie({ ...updatedMovie, backupDate: e.target.value })}
              />
            </label>
          )}
        </div>
        {/* Footer */}
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditMovieModal;
