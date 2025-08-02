import React, { useState } from 'react';
import { useNavigate } from 'react-router';

import { PlusIcon } from '@heroicons/react/20/solid';
import useSWR from 'swr';

import { api } from '../../api';
import LoadingSpinner from '../../common/components/LoadingSpinner/LoadingSpinner';
import Navbar from '../../common/components/Navbar/Navbar';
import Pagination from '../../common/components/Pagination/Pagination';
import { MovieApiResponse } from '../../common/types/Movie.types';

import MoviesTable from './MoviesTable/MoviesTable';

const MainPage = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(5);
  const [sortBy, setSortBy] = useState<string | null>(null); // 'title', 'year', or 'length'
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null); // 'asc' or 'desc'
  const [filterWatched, setFilterWatched] = useState<boolean | null>(null);
  const [filterBackedUp, setFilterBackedUp] = useState<boolean | null>(null);

  const { data, error, isLoading, mutate } = useSWR(
    `/v1/movies/movie?page=${page}&perpage=${perPage}${
      sortBy ? `&sortBy=${sortBy}&sortOrder=${sortOrder}` : ''
    }${filterWatched !== null ? `&watched=${filterWatched}` : ''}${filterBackedUp !== null ? `&backedUp=${filterBackedUp}` : ''}`,
    () => {
      return api
        .get<MovieApiResponse>(
          `/v1/movies/movie?page=${page}&perpage=${perPage}${
            sortBy ? `&sortBy=${sortBy}&sortOrder=${sortOrder}` : ''
          }${filterWatched !== null ? `&watched=${filterWatched}` : ''}${filterBackedUp !== null ? `&backedUp=${filterBackedUp}` : ''}`
        )
        .then((res) => res.data);
    }
  );

  const resetOtherFiltersAndSorting = () => {
    setFilterWatched(null);
    setFilterBackedUp(null);
    setSortBy(null);
    setSortOrder(null);
    setPage(1); // Reset to the first page
  };

  const handleFilterWatched = () => {
    resetOtherFiltersAndSorting();
    if (filterWatched === true) {
      setFilterWatched(false);
    } else if (filterWatched === false) {
      setFilterWatched(null);
    } else {
      setFilterWatched(true);
    }
  };

  const handleFilterBackedUp = () => {
    resetOtherFiltersAndSorting();
    if (filterBackedUp === true) {
      setFilterBackedUp(false);
    } else if (filterBackedUp === false) {
      setFilterBackedUp(null);
    } else {
      setFilterBackedUp(true);
    }
  };

  const handleSort = (column: 'title' | 'year' | 'length') => {
    if (sortBy === column) {
      // Toggle sort order or disable sorting
      if (sortOrder === 'asc') {
        setSortOrder('desc');
      } else if (sortOrder === 'desc') {
        setSortBy(null);
        setSortOrder(null);
      } else {
        setSortOrder('asc');
      }
    } else {
      // Enable sorting for a new column
      setSortBy(column);
      setSortOrder('asc');
    }
    setPage(1); // Reset to page 1 when sorting changes
  };

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
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => navigate('/newmovie')}
              >
                <PlusIcon aria-hidden="true" className="-ml-0.5 mr-1.5 size-5" />
                New movie
              </button>
            </span>
          </div>
        </div>
        {/* FILTERS */}
        <div className="flex space-x-4 mb-6 mt-6">
          <button
            onClick={handleFilterWatched}
            className={`px-3 py-1.5 text-sm rounded-md font-medium shadow-xs ${
              filterWatched !== null
                ? 'bg-purple-600 text-white'
                : 'bg-white text-purple-600 border border-purple-600'
            }`}
          >
            {filterWatched === true
              ? 'Showing watched only'
              : filterWatched === false
                ? 'Showing not watched only'
                : 'Show watched only'}
          </button>

          <button
            onClick={handleFilterBackedUp}
            className={`px-3 py-1.5 text-sm rounded-md font-medium shadow-xs ${
              filterBackedUp !== null
                ? 'bg-purple-600 text-white'
                : 'bg-white text-purple-600 border border-purple-600'
            }`}
          >
            {filterBackedUp === true
              ? 'Showing backed up only'
              : filterBackedUp === false
                ? 'Showing not backed up only'
                : 'Show backed up only'}
          </button>

          <button
            onClick={() => handleSort('year')}
            className={`px-3 py-1.5 text-sm rounded-md font-medium shadow-xs ${
              sortBy === 'year'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-purple-600 border border-purple-600'
            }`}
          >
            {sortOrder === 'asc'
              ? 'Sorting by year: asc'
              : sortOrder === 'desc'
                ? 'Sorting by year: desc'
                : 'Sort by year'}
          </button>
        </div>
        {/* TABLE */}
        {isLoading && (
          <div className="mt-5">
            <LoadingSpinner />
          </div>
        )}
        {error && <p className="mt-5">Error retrieving movies. Try again later...</p>}
        {data && data.data.movies.length === 0 && <p className="mt-5">No movies found...</p>}
        {data && (
          <div>
            <MoviesTable
              movies={data.data.movies}
              onSort={handleSort}
              sortBy={sortBy}
              sortOrder={sortOrder}
              mutate={mutate}
            />
            <Pagination
              currentPage={page}
              perPage={perPage}
              totalEntries={data.pagination.totalCount}
              onPageChange={setPage}
              onPerPageChange={setPerPage}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default MainPage;
