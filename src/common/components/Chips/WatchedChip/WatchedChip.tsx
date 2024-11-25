import React from 'react';

type WatchedChipProps = {
  watched: boolean;
};

const WatchedChip = ({ watched }: WatchedChipProps) => {
  return (
    <span
      className={`inline-flex px-2 text-xs font-semibold leading-5 ${
        watched ? 'text-green-800' : 'text-red-800'
      } ${watched ? 'bg-green-100' : 'bg-red-100'} rounded-full`}
    >
      {watched ? 'Watched' : 'Not watched'}
    </span>
  );
};

export default WatchedChip;
