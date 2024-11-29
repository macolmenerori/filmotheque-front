import React from 'react';

import Navbar from '../../common/components/Navbar/Navbar';

const NewMovie = () => {
  const errors: Record<string, any> = {}; // TODO: remove
  const backedUp: boolean = true; // TODO: remove
  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-6 px-8 py-6">
        {/* FORM */}
        <div className="p-6 max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Add a New Movie</h1>
          <form className="space-y-4">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block font-medium mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                className={`w-full border px-3 py-2 rounded ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>

            {/* Movie URL */}
            <div>
              <label htmlFor="movieURL" className="block font-medium mb-1">
                Movie URL
              </label>
              <input
                type="text"
                id="movieURL"
                className={`w-full border px-3 py-2 rounded ${errors.movieURL ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.movieURL && <p className="text-red-500 text-sm">{errors.movieURL.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Year */}
              <div>
                <label htmlFor="year" className="block font-medium mb-1">
                  Year
                </label>
                <input
                  type="number"
                  id="year"
                  className={`w-full border px-3 py-2 rounded ${errors.year ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.year && <p className="text-red-500 text-sm">{errors.year.message}</p>}
              </div>

              {/* Length */}
              <div>
                <label htmlFor="length" className="block font-medium mb-1">
                  Length (minutes)
                </label>
                <input
                  type="number"
                  id="length"
                  className={`w-full border px-3 py-2 rounded ${errors.length ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.length && <p className="text-red-500 text-sm">{errors.length.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {/* ID */}
              <div>
                <label htmlFor="id" className="block font-medium mb-1">
                  ID
                </label>
                <input
                  type="text"
                  id="id"
                  className={`w-full border px-3 py-2 rounded ${errors.id ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.id && <p className="text-red-500 text-sm">{errors.id.message}</p>}
              </div>

              {/* Watched */}
              <div className="flex items-center justify-center">
                <label htmlFor="watched" className="block font-medium mb-1">
                  Watched
                </label>
                <input type="checkbox" id="watched" className="ml-4 w-5 h-5" />
              </div>

              {/* Backed Up */}
              <div className="flex items-center justify-center">
                <label htmlFor="backedUp" className="block font-medium mb-1">
                  Backed Up
                </label>
                <input type="checkbox" id="backedUp" className="ml-4 w-5 h-5" />
              </div>
            </div>

            {/* Conditional Fields */}
            {backedUp && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  {/* Backup Date */}
                  <div>
                    <label htmlFor="backupDate" className="block font-medium mb-1">
                      Backup Date
                    </label>
                    <input
                      type="date"
                      id="backupDate"
                      className={`w-full border px-3 py-2 rounded ${errors.backupDate ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.backupDate && (
                      <p className="text-red-500 text-sm">{errors.backupDate.message}</p>
                    )}
                  </div>

                  {/* Size */}
                  <div>
                    <label htmlFor="size" className="block font-medium mb-1">
                      Size (GB)
                    </label>
                    <input
                      type="number"
                      id="size"
                      className={`w-full border px-3 py-2 rounded ${errors.size ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.size && <p className="text-red-500 text-sm">{errors.size.message}</p>}
                  </div>
                </div>

                {/* Media */}
                <div>
                  <label htmlFor="media" className="block font-medium mb-1">
                    Media
                  </label>
                  <input
                    type="text"
                    id="media"
                    className={`w-full border px-3 py-2 rounded ${errors.media ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.media && <p className="text-red-500 text-sm">{errors.media.message}</p>}
                </div>
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-500 text-white mt-4 px-4 py-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewMovie;
