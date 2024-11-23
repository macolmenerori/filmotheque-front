import React, { useState } from 'react';

import { PlusIcon } from '@heroicons/react/20/solid';
import useSWR from 'swr';

import { api } from '../../api';
import LoadingSpinner from '../../common/components/LoadingSpinner/LoadingSpinner';
import Navbar from '../../common/components/Navbar/Navbar';
import { MovieApiResponse } from '../../common/types/Movie.types';

import MoviesTable from './MoviesTable/MoviesTable';

const MainPage = () => {
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(5);

  const { data, error, isLoading, mutate } = useSWR(
    `/v1/movies/movie?page=${page}&perpage=${perPage}`,
    () => {
      return api
        .get<MovieApiResponse>(`/v1/movies/movie?page=${page}&perpage=${perPage}`)
        .then((res) => res.data);
    }
  );

  return (
    <>
      {/* NAVBAR */}
      <Navbar />
      <div className="container mx-auto mt-6 px-8 py-6">
        {/* HEADING */}
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              My collection
            </h2>
          </div>
          <div className="mt-5 flex lg:ml-4 lg:mt-0">
            <span className="sm:ml-3">
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <PlusIcon aria-hidden="true" className="-ml-0.5 mr-1.5 size-5" />
                New movie
              </button>
            </span>
          </div>
        </div>
        {/* TABLE */}
        {isLoading && (
          <div className="mt-5">
            <LoadingSpinner />
          </div>
        )}
        {error && <p className="mt-5">Error retrieving movies. Try again later...</p>}
        {data && data.data.movies.length === 0 && <p className="mt-5">No movies found...</p>}
        {data && <MoviesTable movies={data.data.movies} />}
      </div>
    </>
  );
};

export default MainPage;
