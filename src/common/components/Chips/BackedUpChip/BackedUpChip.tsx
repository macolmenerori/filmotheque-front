import React from 'react';

type BackedUpChipProps = {
  backedUp: boolean;
};

const BackedUpChip = ({ backedUp }: BackedUpChipProps) => {
  return (
    <span
      className={`inline-flex px-2 text-xs font-semibold leading-5 ${backedUp ? 'text-green-800' : 'text-red-800'} ${backedUp ? 'bg-green-100' : 'bg-red-100'} rounded-full`}
    >
      {backedUp ? 'Backed up' : 'Not backed up'}
    </span>
  );
};

export default BackedUpChip;
