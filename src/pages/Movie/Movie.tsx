import React from 'react';
import { useParams } from 'react-router-dom';

import useSWR from 'swr';

import { api } from '../../api';
import BackedUpChip from '../../common/components/Chips/BackedUpChip/BackedUpChip';
import WatchedChip from '../../common/components/Chips/WatchedChip/WatchedChip';
import LoadingSpinner from '../../common/components/LoadingSpinner/LoadingSpinner';
import Navbar from '../../common/components/Navbar/Navbar';
import { FullMovieApiResponse } from '../../common/types/Movie.types';

const Movie = () => {
  const params = useParams();

  const { data, error, isLoading, mutate } = useSWR(
    `/v1/movies/fullmovie?id=${params.movieId}`,
    () => {
      return api
        .get<FullMovieApiResponse>(`/v1/movies/fullmovie?id=${params.movieId}`)
        .then((res) => res.data);
    }
  );

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 w-11/12 lg:w-3/4 flex flex-col lg:flex-row">
          {isLoading && <LoadingSpinner />}
          {error && <p>Error loading movie</p>}
          {data && (
            <>
              {/* Left Section */}
              <div className="w-full lg:w-1/3">
                <div className="flex items-center flex-col">
                  {/* Poster */}
                  <img
                    src={data.data.movie.poster_url}
                    alt={`${data.data.movie.title} poster`}
                    className="rounded-lg shadow-md mb-4 lg:mb-6"
                  />
                  {/* Data */}
                  <div className="grid gap-x-4 gap-6 grid-cols-2 justify-items-center text-sm lg:text-base">
                    <div className="flex items-center">
                      <span className="border-2 border-violet-500 text-violet-500 rounded-lg px-3 py-1">
                        {data.data.movie.year}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="border-2 border-violet-500 text-violet-500 rounded-lg px-3 py-1">
                        {`${Math.floor(data.data.movie.length / 60)}h ${data.data.movie.length % 60}min`}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <WatchedChip watched={data.data.movie.watched} />
                    </div>
                    <div className="flex items-center">
                      <BackedUpChip backedUp={data.data.movie.backedUp} />
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs">{data.data.movie.size} GB</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs">
                        {data.data.movie.backupDate.length > 0 ? '' : 'No backup date'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section */}
              <div className="w-full lg:w-2/3">
                <h1 className="text-2xl lg:text-4xl font-bold mb-4">{data.data.movie.title}</h1>
                <p className="text-gray-700 text-sm lg:text-base">{'description'}</p>
              </div>
            </>
          )}
        </div>
      </div>
      {!params.movieId && <p>Movie not found</p>}
    </div>
  );
};

export default Movie;
