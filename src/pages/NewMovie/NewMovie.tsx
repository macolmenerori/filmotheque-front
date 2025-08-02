import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { api } from '../../api';
import Navbar from '../../common/components/Navbar/Navbar';
import { Movie, MovieFormData, SearchMovieApiResponse } from '../../common/types/Movie.types';
import { useToast } from '../../context/ToastContext/ToastContext';
import { useUser } from '../../context/UserContext/UserContext';

const NewMovie = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm<MovieFormData>({
    defaultValues: {
      title: '',
      year: 0,
      length: 0,
      id: '',
      poster_url: '',
      watched: false,
      backedUp: false,
      backupDate: '',
      media: '',
      size: 0,
      meta_ids: {}
    }
  });

  const { user } = useUser();
  const { showToast } = useToast();

  const [debouncedTitle, setDebouncedTitle] = useState<string>(''); // Holds debounced value of title
  const backedUp = watch('backedUp');
  const title = watch('title'); // Watch title for changes

  // Handle title suggestions API call
  useEffect(() => {
    if (!debouncedTitle.trim()) return; // Skip empty or whitespace-only titles

    const fetchMovieSuggestions = async () => {
      try {
        const response = await api.get(`/v1/movies/searchmovie?title=${debouncedTitle}`);
        const movies = response.data as SearchMovieApiResponse;

        if (movies.movies.length > 0) {
          const { title, year, ids } = movies.movies[0];
          setValue('title', title);
          setValue('year', year);
          setValue('meta_ids', ids);
        }
      } catch (error) {
        console.error('Error fetching movie suggestions', error);
      }
    };

    fetchMovieSuggestions();
  }, [debouncedTitle, setValue]);

  // Debounce the title input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTitle(title); // Update debounced value
    }, 1500); // 1.5-second delay

    return () => clearTimeout(handler); // Cleanup timeout on title change
  }, [title]);

  const onSubmit = async (data: MovieFormData) => {
    const processedData: Movie = { ...data, media: [] };

    if (!data.backedUp) {
      processedData.backupDate = '';
      processedData.size = 0;
    }

    if (data.media.length > 0) {
      processedData.media = data.media.split(',').map((medium) => medium.trim());
    }

    if (data.id === '') {
      processedData.id =
        data.meta_ids.trakt !== undefined
          ? data.meta_ids.trakt.toString()
          : (Math.floor(Math.random() * 999999) + 1).toString();
    }

    processedData.user = user?.email;

    try {
      const res = await api.post('/v1/movies/movie', processedData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (res.status === 201) {
        showToast({ title: 'Success', message: 'Movie created successfully', type: 'success' });
        reset();
      } else {
        throw new Error('Failed to add movie');
      }
    } catch (e) {
      showToast({ title: 'Error', message: 'Movie was not created', type: 'danger' });
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-6 px-8 py-6">
        {/* FORM */}
        <div className="p-6 max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Add a New Movie</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block font-medium mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                {...register('title', { required: 'Title is required' })}
                className={`w-full border px-3 py-2 rounded-sm ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>

            {/* Poster URL */}
            <div>
              <label htmlFor="poster_url" className="block font-medium mb-1">
                Poster URL{' '}
                <span className="text-xs italic text-gray-800">Leave blank for default</span>
              </label>
              <input
                type="text"
                id="poster_url"
                {...register('poster_url')}
                className={`w-full border px-3 py-2 rounded-sm ${errors.poster_url ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.poster_url && (
                <p className="text-red-500 text-sm">{errors.poster_url.message}</p>
              )}
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
                  className={`w-full border px-3 py-2 rounded-sm ${errors.year ? 'border-red-500' : 'border-gray-300'}`}
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
                  {...register('length', {
                    required: 'Length is required',
                    valueAsNumber: true,
                    min: {
                      value: 0,
                      message: 'Enter a valid length (0 or more)'
                    }
                  })}
                  className={`w-full border px-3 py-2 rounded-sm ${errors.length ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.length && <p className="text-red-500 text-sm">{errors.length.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {/* ID */}
              <div>
                <label htmlFor="id" className="block font-medium mb-1">
                  ID <span className="text-xs italic text-gray-800">Leave blank for default</span>
                </label>
                <input
                  type="text"
                  id="id"
                  {...register('id')}
                  className={`w-full border px-3 py-2 rounded-sm ${errors.id ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.id && <p className="text-red-500 text-sm">{errors.id.message}</p>}
              </div>

              {/* Watched */}
              <div className="flex items-center justify-center">
                <label htmlFor="watched" className="block font-medium mb-1">
                  Watched
                </label>
                <input
                  type="checkbox"
                  id="watched"
                  {...register('watched')}
                  className="ml-4 w-5 h-5"
                />
              </div>

              {/* Backed Up */}
              <div className="flex items-center justify-center">
                <label htmlFor="backedUp" className="block font-medium mb-1">
                  Backed Up
                </label>
                <input
                  type="checkbox"
                  id="backedUp"
                  {...register('backedUp')}
                  className="ml-4 w-5 h-5"
                />
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
                      {...register('backupDate')}
                      className={`w-full border px-3 py-2 rounded-sm ${errors.backupDate ? 'border-red-500' : 'border-gray-300'}`}
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
                      step="any"
                      {...register('size', { valueAsNumber: true })}
                      className={`w-full border px-3 py-2 rounded-sm ${errors.size ? 'border-red-500' : 'border-gray-300'}`}
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
                    {...register('media', { required: backedUp ? 'Media is required' : false })}
                    className={`w-full border px-3 py-2 rounded-sm ${errors.media ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.media && <p className="text-red-500 text-sm">{errors.media.message}</p>}
                </div>
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-500 text-white mt-4 px-4 py-2 rounded-sm hover:bg-blue-600"
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
