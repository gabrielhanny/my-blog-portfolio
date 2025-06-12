'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Dispatch, SetStateAction, useState } from 'react';

import { cn } from '@/lib/utils';

interface NavbarProps {
  menuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Navbar({ menuOpen, setMenuOpen }: NavbarProps) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className='w-full border-b border-neutral-200'>
      {/* NAVBAR UTAMA */}
      <nav className='mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 lg:px-[120px]'>
        {/* Left: Logo + Text */}
        <div className='flex items-center gap-3'>
          <Image
            src='/icon/logo-symbol.svg'
            alt='logo'
            width={30}
            height={32}
          />
          <span className='text-[24px] leading-[36px] font-semibold text-neutral-950'>
            Your Logo
          </span>
        </div>

        {/* Center: Search Bar (desktop only) */}
        <div className='hidden h-12 w-[373px] items-center gap-2 rounded-[12px] border border-neutral-300 px-4 py-3 md:flex'>
          <Image
            src='/icon/search-icon.svg'
            alt='search'
            width={18}
            height={18}
          />
          <span className='text-sm text-neutral-500'>Search</span>
        </div>

        {/* Right: Login & Register (desktop only) */}
        <div className='hidden items-center gap-6 md:flex'>
          <Link
            href='/login'
            className='text-primary-300 text-sm font-semibold underline'
          >
            Login
          </Link>
          <div className='h-[23px] w-[1px] bg-neutral-300' />
          <Link
            href='/register'
            className='bg-primary-300 text-neutral-25 rounded-full px-8 py-2 text-sm font-semibold'
          >
            Register
          </Link>
        </div>

        {/* Mobile Icons */}
        <div className='flex items-center gap-6 md:hidden'>
          <button onClick={() => setSearchOpen(!searchOpen)}>
            <Image
              src='/icon/search-black.svg'
              alt='search-black'
              width={24}
              height={24}
            />
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <Image
              src={
                menuOpen ? '/icon/close-icon.svg' : '/icon/hamburger-blog.svg'
              }
              alt='menu'
              width={24}
              height={24}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Search Input */}
      {searchOpen && (
        <div className='flex items-center border-t border-neutral-200 px-6 py-3 md:hidden'>
          <input
            type='text'
            placeholder='Search...'
            className='w-full rounded-md border border-neutral-300 px-4 py-2 text-sm focus:outline-none'
          />
        </div>
      )}

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          'absolute top-20 right-0 left-0 z-40 flex flex-col items-center justify-start bg-white md:hidden',
          menuOpen ? 'block' : 'hidden'
        )}
      >
        <div className='mt-6 flex flex-col items-center gap-6'>
          <Link
            href='/login'
            className='text-primary-300 text-sm font-semibold underline'
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
          <Link
            href='/register'
            className='bg-primary-300 text-neutral-25 rounded-full px-16 py-3 text-sm font-semibold'
            onClick={() => setMenuOpen(false)}
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}
