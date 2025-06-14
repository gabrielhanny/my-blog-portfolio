// 'use client';


// 'use client';

// import { useSession } from 'next-auth/react'; 
// import { useEffect, useState } from 'react';

// import BlogCard from '@/components/BlogCard';
// import Footer from '@/components/Footer';
// import MostLikedCard from '@/components/MostLikedCard';
// import Navbar from '@/components/Navbar';
// import NavbarLoggedIn from '@/components/NavbarLoggedIn';

// import { fetchAPI } from '@/lib/api';
// import { likePost } from '@/lib/post';

// interface Post {
//   id: number;
//   title: string;
//   content: string;
//   tags: string[];
//   imageUrl: string;
//   createdAt: string;
//   likes: number;
//   comments: number;
//   author: {
//     name: string;
//     avatarUrl: string;
//   };
// }


// export default function Home() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [recommendedPosts, setRecommendedPosts] = useState<Post[]>([]);
//   const [mostLikedPosts, setMostLikedPosts] = useState<Post[]>([]);
//   const [page, setPage] = useState(1);
//   const [lastPage, setLastPage] = useState(1);

//   // const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
// const { data: session, status } = useSession();
// const isLoggedIn = status === 'authenticated';

//   // ✅ Optimistic Like Handler
//   const onLike = async (id: number) => {
//     const token = localStorage.getItem('accessToken');
//     if (!token) return;

//     // Save previous state
//     const prevRecommended = [...recommendedPosts];
//     const prevMostLiked = [...mostLikedPosts];

//     // Optimistic update
//     setRecommendedPosts((prev) =>
//       prev.map((post) =>
//         post.id === id ? { ...post, likes: post.likes + 1 } : post
//       )
//     );
//     setMostLikedPosts((prev) =>
//       prev.map((post) =>
//         post.id === id ? { ...post, likes: post.likes + 1 } : post
//       )
//     );

//     try {
//       await likePost(id, token);
//     } catch (err) {
//       console.error('Failed to like post:', err);
//       // Rollback if failed
//       setRecommendedPosts(prevRecommended);
//       setMostLikedPosts(prevMostLiked);
//     }
//   };

//   // Fetch recommended posts
//   useEffect(() => {
//     const fetchRecommended = async () => {
//       try {
//         const data = await fetchAPI<{
//           data: Post[];
//           total: number;
//           page: number;
//           lastPage: number;
//         }>(`posts/recommended?page=${page}`);
//         setRecommendedPosts(data.data);
//         setLastPage(data.lastPage);
//       } catch (error) {
//         console.error('Failed to fetch recommended posts:', error);
//       }
//     };

//     fetchRecommended();
//   }, [page]);

//   // Fetch most liked posts
//   useEffect(() => {
//     const fetchMostLiked = async () => {
//       try {
//         const data = await fetchAPI<{ data: Post[] }>('posts/most-liked');
//         setMostLikedPosts(data.data);
//       } catch (error) {
//         console.error('Failed to fetch most liked posts:', error);
//       }
//     };

//     fetchMostLiked();
//   }, []);

//   return (
//     <>
//       {isLoggedIn ? (
//         <NavbarLoggedIn />
//       ) : (
//         <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
//       )}

//       {!menuOpen && (
//         <main className='custom-container mt-[39px] grid grid-cols-1 gap-24 lg:grid-cols-[807px_297px]'>
//           {/* Blog Section */}
//           <section>
//             <h2 className='text-display-sm mb-6 font-bold text-neutral-900'>
//               Recommended For You
//             </h2>

//             {recommendedPosts.map((post) => (
//               <div key={post.id} className='mb-12'>
//                 <BlogCard {...post} onLike={onLike} />
//               </div>
//             ))}

//             {/* Pagination */}
//             <div className='mt-14 flex justify-center'>
//               <div className='flex h-12 w-[368px] items-center justify-center gap-3 text-sm text-neutral-900'>
//                 <span
//                   className='cursor-pointer'
//                   onClick={() => setPage((p) => Math.max(p - 1, 1))}
//                 >
//                   {'<'}
//                 </span>
//                 <button
//                   className='hover:underline'
//                   onClick={() => setPage((p) => Math.max(p - 1, 1))}
//                   disabled={page === 1}
//                 >
//                   Previous
//                 </button>
//                 {page > 1 && <button>{page - 1}</button>}
//                 <button className='bg-primary-300 rounded-full px-3 py-1 text-white'>
//                   {page}
//                 </button>
//                 {page < lastPage && <button>{page + 1}</button>}
//                 <span>...</span>
//                 <button
//                   className='hover:underline'
//                   onClick={() => setPage((p) => Math.min(p + 1, lastPage))}
//                   disabled={page === lastPage}
//                 >
//                   Next
//                 </button>
//                 <span>{'>'}</span>
//               </div>
//             </div>

//             {/* Most Liked (Mobile) */}
//             <div className='mt-10 block px-4 lg:hidden'>
//               {mostLikedPosts.map((post, idx) => (
//                 <MostLikedCard
//                   key={post.id}
//                   {...post}
//                   showHeading={idx === 0}
//                   onLike={onLike}
//                 />
//               ))}
//             </div>
//           </section>

//           {/* Most Liked (Desktop) */}
//           <aside className='hidden lg:block'>
//             <h3 className='text-display-xs mb-5 font-bold text-neutral-900'>
//               Most Liked
//             </h3>
//             {mostLikedPosts.map((post) => (
//               <MostLikedCard key={post.id} {...post} onLike={onLike} />
//             ))}
//           </aside>
//         </main>
//       )}

//       <div className='mt-12 lg:mt-16'>
//         <Footer />
//       </div>
//     </>
//   );
// }


'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import BlogCard from '@/components/BlogCard';
import Footer from '@/components/Footer';
import MostLikedCard from '@/components/MostLikedCard';
import Navbar from '@/components/Navbar';
import NavbarLoggedIn from '@/components/NavbarLoggedIn';

import { fetchAPI } from '@/lib/api';
import { likePost } from '@/lib/post';

interface Post {
  id: number;
  title: string;
  content: string;
  tags: string[];
  imageUrl: string;
  createdAt: string;
  likes: number;
  comments: number;
  author: {
    name: string;
    avatarUrl: string;
  };
}

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [menuOpen, setMenuOpen] = useState(false);
  const [recommendedPosts, setRecommendedPosts] = useState<Post[]>([]);
  const [mostLikedPosts, setMostLikedPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  const isLoggedIn = status === 'authenticated';

  const onLike = async (id: number) => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;

    const prevRecommended = [...recommendedPosts];
    const prevMostLiked = [...mostLikedPosts];

    setRecommendedPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );
    setMostLikedPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );

    try {
      await likePost(id, token);
    } catch (err) {
      console.error('Failed to like post:', err);
      setRecommendedPosts(prevRecommended);
      setMostLikedPosts(prevMostLiked);
    }
  };

  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        const data = await fetchAPI<{
          data: Post[];
          total: number;
          page: number;
          lastPage: number;
        }>(`posts/recommended?page=${page}`);
        setRecommendedPosts(data.data);
        setLastPage(data.lastPage);
      } catch (error) {
        console.error('Failed to fetch recommended posts:', error);
      }
    };

    if (isLoggedIn) fetchRecommended();
  }, [page, isLoggedIn]);

  useEffect(() => {
    const fetchMostLiked = async () => {
      try {
        const data = await fetchAPI<{ data: Post[] }>('posts/most-liked');
        setMostLikedPosts(data.data);
      } catch (error) {
        console.error('Failed to fetch most liked posts:', error);
      }
    };

    if (isLoggedIn) fetchMostLiked();
  }, [isLoggedIn]);

  if (status === 'loading') return null;

  return (
    <>
      {isLoggedIn ? (
        <NavbarLoggedIn />
      ) : (
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      )}

      {!menuOpen && isLoggedIn && (
        <main className='custom-container mt-[39px] grid grid-cols-1 gap-24 lg:grid-cols-[807px_297px]'>
          <section>
            <h2 className='text-display-sm mb-6 font-bold text-neutral-900'>
              Recommended For You
            </h2>

            {recommendedPosts.map((post) => (
              <div key={post.id} className='mb-12'>
                <BlogCard {...post} onLike={onLike} />
              </div>
            ))}

            <div className='mt-14 flex justify-center'>
              <div className='flex h-12 w-[368px] items-center justify-center gap-3 text-sm text-neutral-900'>
                <span onClick={() => setPage((p) => Math.max(p - 1, 1))}>
                  {'<'}
                </span>
                <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
                  Previous
                </button>
                {page > 1 && <button>{page - 1}</button>}
                <button className='bg-primary-300 rounded-full px-3 py-1 text-white'>
                  {page}
                </button>
                {page < lastPage && <button>{page + 1}</button>}
                <span>...</span>
                <button onClick={() => setPage((p) => Math.min(p + 1, lastPage))} disabled={page === lastPage}>
                  Next
                </button>
                <span>{'>'}</span>
              </div>
            </div>

            {/* Mobile */}
            <div className='mt-10 block px-4 lg:hidden'>
              {mostLikedPosts.map((post, idx) => (
                <MostLikedCard key={post.id} {...post} showHeading={idx === 0} onLike={onLike} />
              ))}
            </div>
          </section>

          {/* Desktop */}
          <aside className='hidden lg:block'>
            <h3 className='text-display-xs mb-5 font-bold text-neutral-900'>
              Most Liked
            </h3>
            {mostLikedPosts.map((post) => (
              <MostLikedCard key={post.id} {...post} onLike={onLike} />
            ))}
          </aside>
        </main>
      )}

      <div className='mt-12 lg:mt-16'>
        <Footer />
      </div>
    </>
  );
}
