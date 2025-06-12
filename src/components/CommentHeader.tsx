'use client';

import Image from 'next/image';
import { useSession } from 'next-auth/react';

interface CommentHeaderProps {
  count: number;
}

export default function CommentHeader({ count }: CommentHeaderProps) {
  const { data: session, status } = useSession();

  // Optional: Tampilkan loading sementara jika session sedang dimuat
  if (status === 'loading') {
    return (
      <div className='mx-auto mt-12 max-w-[800px]'>
        <h2 className='text-display-xs mb-4 font-bold text-neutral-900'>
          Comments ({count})
        </h2>
        <div className='mb-4 flex items-center gap-3'>
          <div className='h-[40px] w-[40px] animate-pulse rounded-full bg-neutral-200' />
          <div className='h-4 w-24 animate-pulse rounded bg-neutral-200' />
        </div>
      </div>
    );
  }

  const name = session?.user?.name || 'John Doe';
  const avatar = session?.user?.image || '/image/author.png';

  return (
    <div className='mx-auto mt-12 max-w-[800px]'>
      <h2 className='text-display-xs mb-4 font-bold text-neutral-900'>
        Comments ({count})
      </h2>
      <div className='mb-4 flex items-center gap-3'>
        <Image
          src={avatar}
          alt='User Avatar'
          width={40}
          height={40}
          className='rounded-full'
        />
        <p className='text-sm font-semibold text-neutral-900'>{name}</p>
      </div>
    </div>
  );
}
