import Image from 'next/image';
import { notFound } from 'next/navigation';

import BlogCard from '@/components/BlogCard';
import Footer from '@/components/Footer';
import NavbarLoggedIn from '@/components/NavbarLoggedIn';

import { getUserProfile, getPostsByAuthor } from '@/lib/user';
interface Params {
  params: { email: string };
}

export default async function ViewProfilePage({ params }: Params) {
  const email = decodeURIComponent(params.email);

  try {
    const [user, posts] = await Promise.all([
      getUserProfile(email),
      getPostsByAuthor(email),
    ]);

    if (!user) return notFound();

    const isEmpty = posts.length === 0;

    return (
      <>
        <NavbarLoggedIn />
        <main className='custom-container'>
          {/* AUTHOR INFO */}
          <section className='mx-auto flex max-w-[800px] items-center gap-6 pt-6 sm:pt-12 lg:pt-[48px]'>
            <Image
              src={user.avatarUrl || '/image/author.png'}
              alt={user.name}
              width={80}
              height={80}
              className='h-[40px] w-[40px] rounded-full sm:h-[60px] sm:w-[60px] lg:h-[80px] lg:w-[80px]'
            />
            <div>
              <h2 className='text-sm font-bold text-neutral-900 sm:text-lg lg:text-xl'>
                {user.name || 'Unknown User'}
              </h2>
              <p className='lg:text-md text-xs text-neutral-900 sm:text-sm'>
                {user.bio || 'Frontend Developer'}
              </p>
            </div>
          </section>

          {/* BORDER */}
          <div className='mx-auto mt-4 max-w-[800px] border-b border-neutral-300 sm:mt-6' />

          {/* POST COUNT */}
          <h3 className='lg:text-display-xs mx-auto mt-4 max-w-[800px] text-lg font-bold text-neutral-900 sm:mt-6 sm:text-xl lg:mt-9'>
            {posts.length} Post{posts.length !== 1 && 's'}
          </h3>

          {/* POSTS */}
          <section className='mx-auto mt-4 max-w-[800px] space-y-4 pt-4 sm:mt-6 sm:space-y-6 sm:pt-6 lg:pt-[33px]'>
            {isEmpty ? (
              <div className='flex flex-col items-center justify-center pt-8 sm:pt-12'>
                <Image
                  src='/image/notfound-image.png'
                  alt='No Post'
                  width={118}
                  height={135}
                />
                <p className='pt-6 text-sm font-semibold text-neutral-950'>
                  No posts from this user yet
                </p>
                <p className='pt-1 text-sm text-neutral-950'>
                  Stay tuned for future posts
                </p>
              </div>
            ) : (
              posts.map((post: any) => (
                <BlogCard
                  key={post.id}
                  {...post}
                  isCompactOnMobile={true} // Gunakan versi tanpa image untuk mobile
                />
              ))
            )}
          </section>
        </main>
        <Footer />
      </>
    );
  } catch (error) {
    console.error('❌ Failed to load user profile:', error);
    return notFound();
  }
}
