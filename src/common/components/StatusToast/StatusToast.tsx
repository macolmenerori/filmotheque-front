import React, { useEffect } from 'react';

import { StatusToastProps } from './StatusToast.types';

const StatusToast = ({ title, message, type, onClose }: StatusToastProps) => {
  const timeout = 5000; // 5 seconds

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div className="fixed top-5 inset-x-0 mx-auto w-72 z-10">
      <div
        className={`rounded-lg shadow-lg p-4 ${
          type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}
      >
        <div className="flex justify-between items-center">
          <h5 className="font-bold text-lg">{title}</h5>
          <button
            type="button"
            className="text-white hover:text-gray-200 focus:outline-hidden"
            aria-label="Close"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="mt-2 text-sm">{message}</p>
      </div>
    </div>
  );
};

export default StatusToast;
