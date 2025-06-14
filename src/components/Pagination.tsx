'use client';

import clsx from 'clsx';
import { useState } from 'react';

export default function Pagination({ totalPages = 3 }) {
  const [currentPage, setCurrentPage] = useState(2); // default dummy

  const handleClick = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className='flex justify-center pt-10'>
      <div className='flex items-center gap-3 text-sm text-neutral-600'>
        <button className='hover:text-neutral-900'>Previous</button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handleClick(page)}
            className={clsx(
              'h-8 w-8 rounded-full',
              currentPage === page
                ? 'bg-primary-300 font-semibold text-white'
                : 'text-neutral-600 hover:text-neutral-900'
            )}
          >
            {page}
          </button>
        ))}

        <span className='text-neutral-600'>...</span>

        <button className='hover:text-neutral-900'>Next</button>
      </div>
    </div>
  );
}
