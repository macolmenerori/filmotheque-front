import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Movie, MovieFormData } from '../../../common/types/Movie.types';

import { EditMovieModalProps } from './EditMovieModal.types';

const EditMovieModal = ({ movie, onClose, onSave }: EditMovieModalProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch
  } = useForm({
    defaultValues: { ...movie, media: movie.media.join(', ') }
  });

  const backedUpValue = watch('backedUp');

  const onSubmit = (data: MovieFormData) => {
    // 1. Split Media string into an array
    const processedData: Movie = { ...data, media: [] };
    if (data.media.length > 0) {
      processedData.media = data.media.split(',').map((medium) => medium.trim());
    }
    // 2. If nothing has changed, close the modal
    if (JSON.stringify(processedData) === JSON.stringify(movie)) {
      onClose();
    } else {
      // 3. Only save the modified fields
      const modifiedFields = Object.entries(processedData).reduce((changes, [key, value]) => {
        if (value !== movie[key as keyof Movie]) {
          (changes as any)[key] = value;
        }
        return changes;
      }, {} as Partial<Movie>);
      delete modifiedFields.meta_ids;
      onSave({ ...modifiedFields, id: movie.id });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-10/12">
        {/* Header */}
        <h2 className="text-xl font-bold mb-4">Edit {movie.title}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Body */}
          <div className="grid gap-4 grid-cols-2">
            {/* Title */}
            <label className="">
              <span className="text-gray-700">Title</span>
              <input
                type="text"
                className={`mt-1 block w-full border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500`}
                {...register('title', { required: 'Title is required' })}
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </label>
            {/* Year */}
            <label className="">
              <span className="text-gray-700">Year</span>
              <input
                type="number"
                data-testid="year-input"
                className={`mt-1 block w-full border ${
                  errors.year ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500`}
                {...register('year', {
                  required: 'Year is required',
                  valueAsNumber: true,
                  min: {
                    value: 1888,
                    message: 'Enter a valid year (1888 or later)'
                  },
                  max: {
                    value: new Date().getFullYear(),
                    message: 'Enter a valid year (current year or earlier)'
                  }
                })}
              />
              {errors.year && <p className="text-red-500 text-sm">{errors.year.message}</p>}
            </label>
            {/* Length */}
            <label className="">
              <span className="text-gray-700">Length (min)</span>
              <input
                type="number"
                className={`mt-1 block w-full border ${errors.length ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500`}
                {...register('length', {
                  required: 'Length is required',
                  valueAsNumber: true,
                  min: {
                    value: 0,
                    message: 'Enter a valid length (0 or more)'
                  }
                })}
              />
              {errors.length && <p className="text-red-500 text-sm">{errors.length.message}</p>}
            </label>
            {/* Size */}
            <label className="">
              <span className="text-gray-700">Size (GB)</span>
              <input
                type="number"
                step="any"
                className={`mt-1 block w-full border ${errors.size ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500`}
                {...register('size', {
                  required: 'Size is required',
                  valueAsNumber: true,
                  min: {
                    value: 0,
                    message: 'Enter a valid size (0 or more)'
                  }
                })}
              />
              {errors.size && <p className="text-red-500 text-sm">{errors.size.message}</p>}
            </label>
            {/* Media */}
            <label className="">
              <span className="text-gray-700">Media</span>
              <input
                type="string"
                className={`mt-1 p-2 block w-full border ${errors.media ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500`}
                {...register('media', {
                  required: 'Media is required'
                })}
              />
              {errors.media && <p className="text-red-500 text-sm">{errors.media.message}</p>}
            </label>
            {/* Poster URL */}
            <label className="">
              <span className="text-gray-700">Poster URL</span>
              <input
                type="text"
                className={`mt-1 block w-full border ${errors.poster_url ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500`}
                {...register('poster_url', {
                  required: 'Poster URL is required'
                })}
              />
              {errors.poster_url && (
                <p className="text-red-500 text-sm">{errors.poster_url.message}</p>
              )}
            </label>
            {/* Watched */}
            <label className="" htmlFor="watched">
              <Controller
                name="watched"
                control={control}
                render={({ field }) => (
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                )}
              />
              <span className="text-gray-700">Watched</span>
            </label>
            {/* Backup */}
            <label className="" htmlFor="backedUp">
              <Controller
                name="backedUp"
                control={control}
                render={({ field }) => (
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                )}
              />
              <span className="text-gray-700">Backed up</span>
            </label>
            {backedUpValue && (
              <label className="">
                <span className="text-gray-700">Backup Date</span>
                <input
                  type="date"
                  className={`mt-1 block w-full border ${errors.backupDate ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500`}
                  {...register('backupDate', {
                    validate: (value) => !isNaN(new Date(value).getTime()) || 'Select a valid date'
                  })}
                />
                {errors.backupDate && (
                  <p className="text-red-500 text-sm">{errors.backupDate.message}</p>
                )}
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
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMovieModal;
