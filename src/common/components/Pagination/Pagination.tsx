import React from 'react';

import { PaginationProps } from './Pagination.types';

const Pagination = ({
  currentPage,
  perPage,
  totalEntries,
  onPageChange,
  onPerPageChange
}: PaginationProps) => {
  const totalPages = Math.ceil(totalEntries / perPage);
  const firstEntry = (currentPage - 1) * perPage + 1;
  const lastEntry = Math.min(currentPage * perPage, totalEntries);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onPerPageChange(Number(event.target.value));
    onPageChange(1); // Reset to page 1 when perPage changes
  };

  return (
    <div className="mt-4 mx-2 flex items-center justify-between">
      {/* Results summary */}
      <p className="text-sm text-gray-700">
        Showing <span className="font-medium">{firstEntry}</span> to{' '}
        <span className="font-medium">{lastEntry}</span> of{' '}
        <span className="font-medium">{totalEntries}</span> entries
      </p>

      {/* Pagination controls */}
      <div className="flex items-center space-x-4">
        {/* Results per page */}
        <select
          value={perPage}
          onChange={handlePerPageChange}
          className="rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value={5}>5 results per page</option>
          <option value={20}>20 results per page</option>
          <option value={50}>50 results per page</option>
        </select>

        {/* Navigation buttons */}
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`rounded-md bg-gray-200 px-3 py-2 text-sm font-medium shadow-sm hover:bg-gray-300 focus:outline-none focus:ring focus:ring-indigo-500 ${
            currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`rounded-md bg-gray-200 px-3 py-2 text-sm font-medium shadow-sm hover:bg-gray-300 focus:outline-none focus:ring focus:ring-indigo-500 ${
            currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
