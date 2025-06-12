// components/UserInfo.tsx
'use client';

import Image from 'next/image';

interface UserInfoProps {
  name: string;
  bio: string;
  avatarUrl?: string;
}

export default function UserInfo({ name, bio, avatarUrl }: UserInfoProps) {
  return (
    <div className='mx-auto max-w-[800px] pt-12 sm:pt-24'>
      <div className='flex items-center gap-3 sm:gap-6'>
        <Image
          src={avatarUrl || '/image/author.png'}
          alt='User Avatar'
          width={80}
          height={80}
          className='hidden sm:block rounded-full'
        />
        <Image
          src={avatarUrl || '/image/author.png'}
          alt='User Avatar'
          width={40}
          height={40}
          className='block sm:hidden rounded-full'
        />
        <div>
          <p className='text-lg font-bold text-neutral-900 sm:text-lg'>{name}</p>
          <p className='text-md text-neutral-900 sm:text-md'>{bio}</p>
        </div>
      </div>
      <hr className='mt-6 border-neutral-300' />
    </div>
  );
}
