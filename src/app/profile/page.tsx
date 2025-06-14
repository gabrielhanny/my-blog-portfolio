
'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import BlogCard from '@/components/BlogCard';
import Footer from '@/components/Footer';
import NavbarLoggedIn from '@/components/NavbarLoggedIn';
import EditProfileDialog from '@/components/EditProfileDialog';
import ChangePasswordForm from '@/components/ChangePasswordForm';

import { getMyPosts } from '@/lib/post';

export default function ProfilePage() {
  const { data: session } = useSession();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [activeTab, setActiveTab] = useState<'post' | 'password'>('post');

  const userName = session?.user?.name || 'John Doe';
  const userImage = session?.user?.image || '/image/author.png';
  const userHeadline = (session?.user as any)?.headline || 'Frontend Developer';
  const token = session?.user?.token;

  const {
    data: posts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['my-posts'],
    queryFn: () => getMyPosts(token!),
    enabled: !!token,
  });

  useEffect(() => {
    const handleTabSwitch = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail === 'password') {
        setActiveTab('password');
      }
    };

    window.addEventListener('switch-tab', handleTabSwitch);

    return () => {
      window.removeEventListener('switch-tab', handleTabSwitch);
    };
  }, []);

  return (
    <>
      <NavbarLoggedIn />
      <main className='custom-container pt-12 pb-[224px] lg:pt-[48px]'>
        {/* AUTHOR INFO */}
        <section className='mx-auto flex max-w-[800px] items-center justify-between'>
          <div className='flex items-center gap-4'>
            <Image
              src={userImage}
              alt='Author'
              width={80}
              height={80}
              className='rounded-full'
            />
            <div>
              <h2 className='text-lg font-bold text-neutral-900'>{userName}</h2>
              <p className='text-md text-neutral-900'>{userHeadline}</p>
            </div>
          </div>

          <button
            onClick={() => setOpenEditDialog(true)}
            className='text-primary-300 text-sm font-semibold hover:underline'
          >
            Edit Profile
          </button>
        </section>

        {/* TAB MENU */}
        <section className='mx-auto mt-10 max-w-[800px]'>
          <div className='flex gap-8 border-b border-neutral-300 text-sm font-medium'>
            <button
              className={`py-2 ${activeTab === 'post' ? 'border-b-2 border-primary-300 text-primary-300' : 'text-neutral-400 hover:text-neutral-900'}`}
              onClick={() => setActiveTab('post')}
            >
              Your Post
            </button>
            <button
              className={`py-2 ${activeTab === 'password' ? 'border-b-2 border-primary-300 text-primary-300' : 'text-neutral-400 hover:text-neutral-900'}`}
              onClick={() => setActiveTab('password')}
            >
              Change Password
            </button>
          </div>
        </section>

        {/* MAIN CONTENT */}
        {activeTab === 'post' && (
          <>
            {/* POST HEADER */}
            {!isLoading && !isError && posts.length > 0 && (
              <section className='mx-auto mt-6 flex max-w-[800px] items-center justify-between'>
                <h3 className='lg:text-display-xs text-lg font-bold text-neutral-900'>
                  {posts.length} Post{posts.length !== 1 && 's'}
                </h3>

                <a
                  href='/write'
                  className='bg-primary-300 text-neutral-25 flex items-center gap-2 rounded-full px-6 py-2 text-sm font-semibold'
                >
                  <Image
                    src='/icon/pencil-white.svg'
                    alt='write'
                    width={15}
                    height={14}
                  />
                  Write & Post
                </a>
              </section>
            )}

            {/* BLOGCARD LIST */}
            <section className='mx-auto mt-4 max-w-[800px]'>
              <div className='space-y-20'>
                {isLoading ? (
                  <p>Loading...</p>
                ) : isError ? (
                  <p className='text-red-500'>Failed to load posts.</p>
                ) : posts.length === 0 ? (
                  <div className='flex flex-col items-center justify-center pt-12'>
                    <Image
                      src='/image/notfound-image.png'
                      alt='No Post'
                      width={118}
                      height={135}
                    />
                    <p className='pt-6 text-sm font-semibold text-neutral-950'>
                      Your writing journey starts here
                    </p>
                    <p className='pt-1 text-sm text-neutral-950'>
                      No posts yet, but every great writer starts with the first one.
                    </p>
                    <a
                      href='/write'
                      className='bg-primary-300 text-neutral-25 flex items-center gap-2 rounded-full px-6 py-2 text-sm font-semibold'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='15'
                        height='14'
                        viewBox='0 0 15 14'
                        fill='white'
                      >
                        <path d='M1.875 10.0625V12.125H3.9375L10.375 5.6875L8.3125 3.625L1.875 10.0625ZM12.6063 3.45625C12.8375 3.225 12.8375 2.85 12.6063 2.61875L11.3813 1.39375C11.15 1.1625 10.775 1.1625 10.5438 1.39375L9.46875 2.46875L11.5313 4.53125L12.6063 3.45625Z' />
                      </svg>
                      Write Post
                    </a>
                  </div>
                ) : (
                  posts.map((post: any) => (
                    <BlogCard key={post.id} {...post} isOwner={true} />
                  ))
                )}
              </div>
            </section>
          </>
        )}

        {activeTab === 'password' && (
          <section className='mx-auto mt-8 max-w-[800px]'>
            <ChangePasswordForm />
          </section>
        )}
      </main>
      <EditProfileDialog open={openEditDialog} onOpenChange={setOpenEditDialog} />
      <Footer />
    </>
  );
}
