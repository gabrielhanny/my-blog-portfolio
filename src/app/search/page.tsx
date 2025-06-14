'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import BlogCard from '@/components/BlogCard';
import Footer from '@/components/Footer';
import NavbarLoggedIn from '@/components/NavbarLoggedIn';

import { searchPosts } from '@/lib/search';
import { Post } from '@/types/post';

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const [results, setResults] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      const posts = await searchPosts(query);
      setResults(posts);
      setLoading(false);
    };

    if (query) {
      fetchResults();
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [query]);

  return (
    <>
      <NavbarLoggedIn />

      <main className='custom-container mt-[39px]'>
        {/* Desktop View */}
        <div className='hidden lg:block'>
          {loading ? (
            <p className='py-10 text-center text-neutral-500'>Loading...</p>
          ) : results.length > 0 ? (
            <>
              <h2 className='text-display-sm mb-6 font-bold text-neutral-900'>
                Result for “{query}”
              </h2>

              {results.map((post) => (
                <div key={post.id} className='mb-12'>
                  <BlogCard {...post} />
                </div>
              ))}
            </>
          ) : (
            <div className='flex w-full justify-center pt-[348px] pb-[389px]'>
              <div className='flex w-[372px] flex-col items-center'>
                <Image
                  src='/image/notfound-image.png'
                  alt='Not Found'
                  width={118}
                  height={135}
                />
                <p className='pt-6 text-sm font-semibold text-neutral-950'>
                  No results found
                </p>
                <p className='pt-1 text-sm text-neutral-950'>
                  Try using different keywords
                </p>
                <Link
                  href='/'
                  className='bg-primary-300 text-neutral-25 mt-6 flex h-[44px] w-[200px] items-center justify-center rounded-full text-sm font-semibold'
                >
                  Back to Home
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Mobile View */}
        <div className='px-4 pt-4 lg:hidden'>
          {/* Search Field */}
          <div className='flex h-12 w-full items-center gap-2 rounded-[12px] border border-neutral-300 px-4 py-3'>
            <Image
              src='/icon/search-icon.svg'
              alt='search'
              width={18}
              height={18}
            />
            <input
              type='text'
              defaultValue={query}
              placeholder='Search'
              className='w-full border-none p-0 text-sm text-neutral-500 placeholder:text-neutral-500 focus:outline-none'
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const input = (e.target as HTMLInputElement).value;
                  router.push(`/search?q=${encodeURIComponent(input)}`);
                }
              }}
            />
          </div>

          {loading ? (
            <p className='py-10 text-center text-neutral-500'>Loading...</p>
          ) : results.length > 0 ? (
            <div className='mt-6 space-y-12'>
              {results.map((post) => (
                <BlogCard key={post.id} {...post} />
              ))}
            </div>
          ) : (
            <div className='flex flex-col items-center pt-[80px]'>
              <Image
                src='/image/notfound-image.png'
                alt='Not Found'
                width={118}
                height={135}
              />
              <p className='pt-6 text-sm font-semibold text-neutral-950'>
                No results found
              </p>
              <p className='pt-1 text-sm text-neutral-950'>
                Try using different keywords
              </p>
              <Link
                href='/'
                className='bg-primary-300 text-neutral-25 mt-6 flex h-[44px] w-[200px] items-center justify-center rounded-full text-sm font-semibold'
              >
                Back to Home
              </Link>
            </div>
          )}
        </div>
      </main>

      <div className='mt-12 lg:mt-16'>
        <Footer />
      </div>
    </>
  );
}
