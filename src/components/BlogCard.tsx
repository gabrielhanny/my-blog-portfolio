// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';

// interface BlogCardProps {
//   id: number;
//   title: string;
//   content: string;
//   tags: string[];
//   imageUrl: string;
//   author: {
//     name: string;
//     avatarUrl?: string;
//   };
//   createdAt: string;
//   likes: number;
//   comments: number;
//   onLike?: (id: number) => void;
// }

// export default function BlogCard({
//   id,
//   title,
//   content,
//   tags,
//   imageUrl,
//   author,
//   createdAt,
//   likes,
//   comments,
//   onLike,
// }: BlogCardProps) {
//   const blogImage = imageUrl || '/image/blog-image.png';
//   const avatar = author.avatarUrl || '/image/blog-image.png';
//   const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
//     day: '2-digit',
//     month: 'short',
//     year: 'numeric',
//   });

//   const handleLike = () => {
//     try {
//       onLike?.(id);
//     } catch (err) {
//       console.error('Like failed:', err);
//     }
//   };

//   const uniqueTags = [...new Set(tags)];

//   return (
//     <div className='w-full'>
//       {/* Desktop */}
//       <div className='hidden h-[276px] w-[807px] gap-6 lg:flex'>
//         <div className='h-[258px] w-[340px] overflow-hidden rounded-xl'>
//           <Image
//             src={blogImage}
//             alt='blog'
//             width={340}
//             height={258}
//             className='h-full w-full object-cover'
//           />
//         </div>

//         <div className='flex w-[443px] flex-col justify-between py-1'>
//           <div>
//             <h2 className='text-xl leading-[34px] font-bold text-neutral-900 hover:underline'>
//               <Link href={`/posts/${id}`}>{title}</Link>
//             </h2>

//             <div className='mt-3 flex flex-wrap gap-2'>
//               {uniqueTags.map((tag) => (
//                 <span
//                   key={tag}
//                   className='rounded-md border border-neutral-300 px-2 py-1 text-xs text-neutral-900'
//                 >
//                   {tag}
//                 </span>
//               ))}
//             </div>

//             <p className='mt-3 line-clamp-3 text-sm leading-[22px] text-neutral-900'>
//               {content}
//             </p>
//           </div>

//           <div className='flex flex-col gap-3 pt-3'>
//             <div className='flex items-center gap-2'>
//               <Image
//                 src={avatar}
//                 alt={author.name}
//                 width={40}
//                 height={40}
//                 className='rounded-full'
//               />
//               <p className='text-sm font-medium text-neutral-900'>
//                 {author.name}
//               </p>
//               <span className='text-sm text-neutral-400'>•</span>
//               <p className='text-sm text-neutral-600'>{formattedDate}</p>
//             </div>

//             <div className='flex gap-5 text-sm text-neutral-600'>
//               <button
//                 onClick={handleLike}
//                 className='hover:text-primary-300 flex items-center gap-1'
//               >
//                 <Image src='/icon/like.svg' alt='like' width={16} height={16} />
//                 {likes}
//               </button>
//               <div className='flex items-center gap-1'>
//                 <Image
//                   src='/icon/comment.svg'
//                   alt='comment'
//                   width={16}
//                   height={16}
//                 />
//                 {comments}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile */}
//       <div className='block space-y-3 lg:hidden'>
//         <h2 className='text-md font-bold text-neutral-900 hover:underline'>
//           <Link href={`/posts/${id}`}>{title}</Link>
//         </h2>

//         <div className='flex flex-wrap gap-2'>
//           {uniqueTags.map((tag) => (
//             <span
//               key={tag}
//               className='rounded-md border border-neutral-300 px-2 py-1 text-xs text-neutral-900'
//             >
//               {tag}
//             </span>
//           ))}
//         </div>

//         <p className='text-xs leading-6 text-neutral-900'>{content}</p>

//         <div className='flex items-center gap-2'>
//           <Image
//             src={avatar}
//             alt={author.name}
//             width={30}
//             height={30}
//             className='rounded-full'
//           />
//           <p className='text-xs text-neutral-900'>{author.name}</p>
//           <span className='text-neutral-400'>•</span>
//           <p className='text-xs text-neutral-600'>{formattedDate}</p>
//         </div>

//         <div className='flex gap-3 text-sm text-neutral-600'>
//           <button
//             onClick={handleLike}
//             className='hover:text-primary-300 flex items-center gap-1'
//           >
//             <Image src='/icon/like.svg' alt='like' width={16} height={16} />
//             {likes}
//           </button>
//           <div className='flex items-center gap-1'>
//             <Image
//               src='/icon/comment.svg'
//               alt='comment'
//               width={16}
//               height={16}
//             />
//             {comments}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
'use client';

import Image from 'next/image';
import Link from 'next/link';

interface BlogCardProps {
  id: number;
  title: string;
  content: string;
  tags: string[];
  imageUrl: string;
  author: {
    name: string;
    email?: string;
    avatarUrl?: string;
  };
  createdAt: string;
  likes: number;
  comments: number;
  onLike?: (id: number) => void;
  isOwner?: boolean; // ✅ tambahan
}

export default function BlogCard({
  id,
  title,
  content,
  tags,
  imageUrl,
  author,
  createdAt,
  likes,
  comments,
  onLike,
  isOwner = false, // ✅ default
}: BlogCardProps) {
  const blogImage = imageUrl || '/image/blog-image.png';
  const avatar = author.avatarUrl || '/image/author.png';
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const handleLike = () => {
    try {
      onLike?.(id);
    } catch (err) {
      console.error('Like failed:', err);
    }
  };

  const uniqueTags = [...new Set(tags)];
  const authorHref = author.email ? `/users/${author.email}` : '#';

  return (
    <div className='w-full'>
      {/* Desktop */}
      <div className='hidden h-[276px] w-[807px] gap-6 lg:flex'>
        <div className='h-[258px] w-[340px] overflow-hidden rounded-xl'>
          <Image
            src={blogImage}
            alt='blog'
            width={340}
            height={258}
            className='h-full w-full object-cover'
          />
        </div>

        <div className='flex w-[443px] flex-col justify-between py-1'>
          <div>
            <h2 className='text-xl leading-[34px] font-bold text-neutral-900 hover:underline'>
              <Link href={`/posts/${id}`}>{title}</Link>
            </h2>

            <div className='mt-3 flex flex-wrap gap-2'>
              {uniqueTags.map((tag) => (
                <span
                  key={tag}
                  className='rounded-md border border-neutral-300 px-2 py-1 text-xs text-neutral-900'
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className='mt-3 line-clamp-3 text-sm leading-[22px] text-neutral-900'>
              {content}
            </p>
          </div>

          <div className='flex flex-col gap-3 pt-3'>
            <Link
              href={authorHref}
              className='flex items-center gap-2 hover:underline'
            >
              <Image
                src={avatar}
                alt={author.name}
                width={40}
                height={40}
                className='rounded-full'
              />
              <p className='text-sm font-medium text-neutral-900'>
                {author.name}
              </p>
              <span className='text-sm text-neutral-400'>•</span>
              <p className='text-sm text-neutral-600'>{formattedDate}</p>
            </Link>

            <div className='flex gap-5 text-sm text-neutral-600'>
              <button
                onClick={handleLike}
                className='hover:text-primary-300 flex items-center gap-1'
              >
                <Image src='/icon/like.svg' alt='like' width={16} height={16} />
                {likes}
              </button>
              <div className='flex items-center gap-1'>
                <Image
                  src='/icon/comment.svg'
                  alt='comment'
                  width={16}
                  height={16}
                />
                {comments}
              </div>
            </div>

            {isOwner && (
              <div className='flex gap-3 text-sm text-neutral-600'>
                <Link
                  href={`/dashboard/posts/${id}`}
                  className='text-primary-300 hover:underline'
                >
                  Statistic
                </Link>
                <Link
                  href={`/write?id=${id}`}
                  className='text-primary-300 hover:underline'
                >
                  Edit
                </Link>
                <button
                  onClick={() => console.log(`Delete post ${id}`)}
                  className='text-red-500 hover:underline'
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className='block space-y-3 lg:hidden'>
        <h2 className='text-md font-bold text-neutral-900 hover:underline'>
          <Link href={`/posts/${id}`}>{title}</Link>
        </h2>

        <div className='flex flex-wrap gap-2'>
          {uniqueTags.map((tag) => (
            <span
              key={tag}
              className='rounded-md border border-neutral-300 px-2 py-1 text-xs text-neutral-900'
            >
              {tag}
            </span>
          ))}
        </div>

        <p className='text-xs leading-6 text-neutral-900'>{content}</p>

        <Link
          href={authorHref}
          className='flex items-center gap-2 hover:underline'
        >
          <Image
            src={avatar}
            alt={author.name}
            width={30}
            height={30}
            className='rounded-full'
          />
          <p className='text-xs text-neutral-900'>{author.name}</p>
          <span className='text-neutral-400'>•</span>
          <p className='text-xs text-neutral-600'>{formattedDate}</p>
        </Link>

        <div className='flex gap-3 text-sm text-neutral-600'>
          <button
            onClick={handleLike}
            className='hover:text-primary-300 flex items-center gap-1'
          >
            <Image src='/icon/like.svg' alt='like' width={16} height={16} />
            {likes}
          </button>
          <div className='flex items-center gap-1'>
            <Image
              src='/icon/comment.svg'
              alt='comment'
              width={16}
              height={16}
            />
            {comments}
          </div>
        </div>

        {isOwner && (
          <div className='flex gap-3 text-sm text-neutral-600'>
            <Link
              href={`/dashboard/posts/${id}`}
              className='text-primary-300 hover:underline'
            >
              Statistic
            </Link>
            <Link
              href={`/write?id=${id}`}
              className='text-primary-300 hover:underline'
            >
              Edit
            </Link>
            <button
              onClick={() => console.log(`Delete post ${id}`)}
              className='text-red-500 hover:underline'
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
