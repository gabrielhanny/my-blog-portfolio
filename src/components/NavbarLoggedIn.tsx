'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { setSearchQuery } from '@/store/slices/searchSlice';
import { AppDispatch } from '@/store/store';



export default function NavbarLoggedIn() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [query, setQuery] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    dispatch(setSearchQuery(trimmed));
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <header className='w-full border-b border-neutral-200'>
      <nav className='mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 lg:px-[120px]'>
        {/* Desktop Layout */}
        <div className='hidden w-full items-center justify-between md:flex'>
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

          {/* Center: Search */}
          <form
            onSubmit={handleSearch}
            className='h-12 w-[373px] items-center gap-2 rounded-[12px] border border-neutral-300 px-4 py-3 md:flex'
          >
            <Image
              src='/icon/search-icon.svg'
              alt='search'
              width={18}
              height={18}
            />
            <input
              type='text'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Search'
              className='w-full bg-transparent text-sm text-neutral-900 placeholder:text-neutral-500 focus:outline-none'
            />
          </form>

          {/* Right: Write Post + Avatar */}
          <div className='flex items-center gap-6'>
            <Link
              href='/write'
              className='text-primary-300 flex items-center gap-2 text-sm font-semibold underline'
            >
              <Image
                src='/icon/pencil.svg'
                alt='write'
                width={18}
                height={17}
              />
              Write Post
            </Link>

            <div className='h-[23px] w-[1px] bg-neutral-300' />

            <div className='relative'>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className='flex items-center gap-3'
              >
                <Image
                  src='/image/author.png'
                  alt='author'
                  width={40}
                  height={40}
                  className='rounded-full'
                />
                <span className='text-sm font-medium text-neutral-900'>
                  John Doe
                </span>
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
                  {/* <button
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
                  </button> */}
                  <button
  onClick={() => signOut({ callbackUrl: '/auth/login' })}
  className='flex items-center gap-2 text-sm text-neutral-950 hover:underline'
>
  <Image src='/icon/logout-icon.svg' alt='logout' width={17} height={15} />
  Logout
</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navbar */}
        <div className='flex w-full items-center justify-between px-4 py-4 md:hidden'>
          {/* Logo + Text */}
          <div className='flex items-center gap-2'>
            <Image
              src='/icon/logo-symbol.svg'
              alt='logo'
              width={30}
              height={32}
            />
            <span className='text-[20px] font-semibold text-neutral-950'>
              Your Logo
            </span>
          </div>

          {/* Avatar */}
          <button onClick={() => setShowDropdown(!showDropdown)}>
            <Image
              src='/image/author.png'
              alt='avatar'
              width={40}
              height={40}
              className='rounded-full'
            />
          </button>
        </div>

        {/* Mobile Dropdown */}
        {showDropdown && (
          <div className='absolute top-[70px] right-4 z-10 w-[182px] rounded-xl border border-neutral-300 bg-white p-4 shadow md:hidden'>
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
      </nav>
    </header>
  );
}
