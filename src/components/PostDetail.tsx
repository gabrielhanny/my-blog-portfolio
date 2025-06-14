// 'use client';

// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';

// import CommentDialog from '@/components/CommentDialog';

// import { likePost, addComment } from '@/lib/post';
// import { Comment } from '@/types/comment';

// interface Author {
//   name: string;
//   avatarUrl?: string;
// }

// interface PostDetailProps {
//   post: {
//     id: number;
//     title: string;
//     tags: string[];
//     author: Author;
//     createdAt: string;
//     likes: number;
//     likedByUser?: boolean; // ✅ opsional sekarang
//     comments: Comment[];
//     imageUrl?: string;
//     content: string;
//   };
//   session?: {
//     user?: {
//       token?: string;
//       name?: string;
//       image?: string;
//     };
//   };
// }

// export default function PostDetail({ post, session }: PostDetailProps) {
//   const router = useRouter();
//   const [likeCount, setLikeCount] = useState(post.likes);
//   const [liked, setLiked] = useState(post.likedByUser);
//   const [open, setOpen] = useState(false);
//   const [commentContent, setCommentContent] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const userToken = session?.user?.token || null;
//   const userName = session?.user?.name || 'John Doe';
//   const userAvatar = session?.user?.image || '/image/author.png';

//   const handleLike = async () => {
//     if (!userToken) return;
//     try {
//       await likePost(post.id, userToken);
//       setLiked((prev) => !prev);
//       setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
//     } catch (err) {
//       console.error('Failed to like:', err);
//     }
//   };

//   const handleSubmitComment = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!commentContent.trim() || !userToken) return;
//     try {
//       setIsSubmitting(true);
//       await addComment(post.id, commentContent, userToken);
//       setCommentContent('');
//       router.refresh();
//     } catch (err) {
//       console.error('Failed to submit comment:', err);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className='mx-auto max-w-[800px]'>
//       {/* TITLE */}
//       <h1 className='text-display-lg mb-4 font-bold text-neutral-900'>
//         {post.title}
//       </h1>

//       {/* TAGS */}
//       <div className='mb-4 flex gap-2 pt-3'>
//         {post.tags.map((tag, index) => (
//           <span
//             key={`${tag}-${index}`}
//             className='rounded-md border border-neutral-300 px-2 py-1 text-xs text-neutral-900'
//           >
//             {tag}
//           </span>
//         ))}
//       </div>

//       {/* AUTHOR */}
//       <div className='mb-4 flex items-center gap-2 pt-4'>
//         <Image
//           src={post.author.avatarUrl || '/image/author.png'}
//           alt='Author'
//           width={40}
//           height={40}
//           className='rounded-full'
//         />
//         <p className='text-sm font-medium text-neutral-900'>
//           {post.author.name}
//         </p>
//         <span className='h-1 w-1 rounded-full bg-neutral-400' />
//         <p className='text-sm text-neutral-600'>
//           {new Date(post.createdAt).toLocaleDateString('en-GB', {
//             day: '2-digit',
//             month: 'short',
//             year: 'numeric',
//           })}
//         </p>
//       </div>

//       {/* LIKE + COMMENT */}
//       <div className='mb-6 flex gap-5 text-sm text-neutral-600'>
//         <button onClick={handleLike} className='flex items-center gap-1'>
//           <Image src='/icon/like.svg' alt='like' width={16} height={16} />
//           {likeCount}
//         </button>
//         <button
//           onClick={() => setOpen(true)}
//           className='flex items-center gap-1'
//         >
//           <Image src='/icon/comment.svg' alt='comment' width={16} height={16} />
//           {post.comments.length}
//         </button>
//       </div>

//       {/* IMAGE */}
//       <div className='mb-6'>
//         <Image
//           src={post.imageUrl || '/image/blog-image.png'}
//           alt='Blog Image'
//           width={800}
//           height={607}
//           className='h-auto w-full rounded-xl object-cover'
//         />
//       </div>

//       {/* CONTENT */}
//       <article className='prose max-w-none text-base text-neutral-950'>
//         {post.content.split('\n').map((para, i) => (
//           <p key={i} className='pt-4'>
//             {para}
//           </p>
//         ))}
//       </article>

//       {/* COMMENT FORM */}
//       <form onSubmit={handleSubmitComment} className='mt-12 mb-8 max-w-[800px]'>
//         <div className='mb-4 flex items-center gap-3'>
//           <Image
//             src={userAvatar}
//             alt='User Avatar'
//             width={40}
//             height={40}
//             className='rounded-full'
//           />
//           <p className='text-sm font-semibold text-neutral-900'>{userName}</p>
//         </div>
//         <label className='block text-sm font-semibold text-neutral-950'>
//           Give your comments
//         </label>
//         <textarea
//           className='w-full rounded-md border border-neutral-300 p-2 text-sm text-neutral-900'
//           rows={4}
//           placeholder='Enter your comment...'
//           value={commentContent}
//           onChange={(e) => setCommentContent(e.target.value)}
//         />
//         <div className='flex justify-end'>
//           <button
//             type='submit'
//             disabled={isSubmitting}
//             className='bg-primary-300 text-neutral-25 rounded-full px-6 py-2 text-sm font-semibold'
//           >
//             {isSubmitting ? 'Sending...' : 'Post Comment'}
//           </button>
//         </div>
//       </form>

//       {/* COMMENT DIALOG */}
//       <CommentDialog
//         open={open}
//         setOpen={setOpen}
//         comments={post.comments}
//         postId={post.id}
//       />
//     </div>
//   );
// }
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import CommentDialog from '@/components/CommentDialog';

import { likePost, addComment } from '@/lib/post';
import { Comment } from '@/types/comment';

interface Author {
  name: string;
  email?: string; // ✅ untuk link ke profile
  avatarUrl?: string;
}

interface PostDetailProps {
  post: {
    id: number;
    title: string;
    tags: string[];
    author: Author;
    createdAt: string;
    likes: number;
    likedByUser?: boolean;
    comments: Comment[];
    imageUrl?: string;
    content: string;
  };
  session?: {
    user?: {
      token?: string;
      name?: string;
      image?: string;
    };
  };
}

export default function PostDetail({ post, session }: PostDetailProps) {
  const router = useRouter();
  const [likeCount, setLikeCount] = useState(post.likes);
  const [liked, setLiked] = useState(post.likedByUser);
  const [open, setOpen] = useState(false);
  const [commentContent, setCommentContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userToken = session?.user?.token || null;
  const userName = session?.user?.name || 'John Doe';
  const userAvatar = session?.user?.image || '/image/author.png';
  const authorAvatar = post.author.avatarUrl || '/image/author.png';
  const authorHref = post.author.email ? `/users/${post.author.email}` : '#';

  const handleLike = async () => {
    if (!userToken) return;
    try {
      await likePost(post.id, userToken);
      setLiked((prev) => !prev);
      setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
    } catch (err) {
      console.error('Failed to like:', err);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentContent.trim() || !userToken) return;
    try {
      setIsSubmitting(true);
      await addComment(post.id, commentContent, userToken);
      setCommentContent('');
      router.refresh();
    } catch (err) {
      console.error('Failed to submit comment:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='mx-auto max-w-[800px]'>
      {/* TITLE */}
      <h1 className='text-display-lg mb-4 font-bold text-neutral-900'>
        {post.title}
      </h1>

      {/* TAGS */}
      <div className='mb-4 flex gap-2 pt-3'>
        {post.tags.map((tag, index) => (
          <span
            key={`${tag}-${index}`}
            className='rounded-md border border-neutral-300 px-2 py-1 text-xs text-neutral-900'
          >
            {tag}
          </span>
        ))}
      </div>

      {/* AUTHOR */}
      <Link
        href={authorHref}
        className='mb-4 flex items-center gap-2 pt-4 hover:underline'
      >
        <Image
          src={authorAvatar}
          alt='Author'
          width={40}
          height={40}
          className='rounded-full'
        />
        <p className='text-sm font-medium text-neutral-900'>
          {post.author.name}
        </p>
        <span className='h-1 w-1 rounded-full bg-neutral-400' />
        <p className='text-sm text-neutral-600'>
          {new Date(post.createdAt).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })}
        </p>
      </Link>

      {/* LIKE + COMMENT */}
      <div className='mb-6 flex gap-5 text-sm text-neutral-600'>
        <button onClick={handleLike} className='flex items-center gap-1'>
          <Image src='/icon/like.svg' alt='like' width={16} height={16} />
          {likeCount}
        </button>
        <button
          onClick={() => setOpen(true)}
          className='flex items-center gap-1'
        >
          <Image src='/icon/comment.svg' alt='comment' width={16} height={16} />
          {post.comments.length}
        </button>
      </div>

      {/* IMAGE */}
      <div className='mb-6'>
        <Image
          src={post.imageUrl || '/image/blog-image.png'}
          alt='Blog Image'
          width={800}
          height={607}
          className='h-auto w-full rounded-xl object-cover'
        />
      </div>

      {/* CONTENT */}
      <article className='prose max-w-none text-base text-neutral-950'>
        {post.content.split('\n').map((para, i) => (
          <p key={i} className='pt-4'>
            {para}
          </p>
        ))}
      </article>

      {/* COMMENT FORM */}
      <form onSubmit={handleSubmitComment} className='mt-12 mb-8 max-w-[800px]'>
        <div className='mb-4 flex items-center gap-3'>
          <Image
            src={userAvatar}
            alt='User Avatar'
            width={40}
            height={40}
            className='rounded-full'
          />
          <p className='text-sm font-semibold text-neutral-900'>{userName}</p>
        </div>
        <label className='block text-sm font-semibold text-neutral-950'>
          Give your comments
        </label>
        <textarea
          className='w-full rounded-md border border-neutral-300 p-2 text-sm text-neutral-900'
          rows={4}
          placeholder='Enter your comment...'
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
        />
        <div className='flex justify-end'>
          <button
            type='submit'
            disabled={isSubmitting}
            className='bg-primary-300 text-neutral-25 rounded-full px-6 py-2 text-sm font-semibold'
          >
            {isSubmitting ? 'Sending...' : 'Post Comment'}
          </button>
        </div>
      </form>

      {/* COMMENT DIALOG */}
      <CommentDialog
        open={open}
        setOpen={setOpen}
        comments={post.comments}
        postId={post.id}
      />
    </div>
  );
}
