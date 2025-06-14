'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function NavbarWritePost() {
  const { data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);

  const avatar = session?.user?.image || '/image/author.png';
  const name = session?.user?.name || 'User';

  return (
    <header className='w-full border-b border-neutral-200'>
      <nav className='mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 lg:px-[120px]'>
        {/* Left: ← Write Post */}
        <Link
          href='/profile'
          className='text-display-xs font-bold text-neutral-900 hover:underline'
        >
          ← Write Post
        </Link>

        {/* Right: Avatar + Name + Dropdown */}
        <div className='relative flex items-center gap-3'>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className='flex items-center gap-2'
          >
            <Image
              src={avatar}
              alt='avatar'
              width={40}
              height={40}
              className='rounded-full'
            />
            <span className='text-sm font-medium text-neutral-900'>{name}</span>
          </button>

          {/* Dropdown */}
          {showDropdown && (
            <div className='absolute top-[48px] right-0 w-[182px] rounded-xl border border-neutral-300 bg-white p-4 shadow'>
              <Link
                href='/profile'
                className='mb-2 flex items-center gap-2 text-sm text-neutral-950'
              >
                <Image
                  src='/icon/profile-icon.svg'
                  alt='profile'
                  width={15}
                  height={14}
                />
                Profile
              </Link>
              <button
                onClick={() => {
                  document.cookie = 'token=; Max-Age=0';
                  window.location.href = '/login';
                }}
                className='flex items-center gap-2 text-sm text-neutral-950'
              >
                <Image
                  src='/icon/logout-icon.svg'
                  alt='logout'
                  width={17}
                  height={15}
                />
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
