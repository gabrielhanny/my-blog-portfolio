'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface MostLikedCardProps {
  id: number;
  title: string;
  content: string;
  likes: number;
  comments: number;
  showHeading?: boolean;
  onLike?: (id: number) => void;
}

export default function MostLikedCard({
  id,
  title,
  content,
  likes,
  comments,
  showHeading = false,
  onLike,
}: MostLikedCardProps) {
  const router = useRouter();

  const handleNavigate = () => {
    router.push(`/posts/${id}`);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation(); // Mencegah redirect saat klik tombol like
    onLike?.(id);
  };

  return (
    <div className='w-full pt-6'>
      {showHeading && (
        <h3 className='text-display-sm mb-6 font-bold text-neutral-900'>
          Most Liked
        </h3>
      )}

      <div
        className='flex cursor-pointer flex-col gap-2'
        onClick={handleNavigate}
        role='button'
      >
        {/* Title */}
        <h4 className='text-md leading-[24px] font-bold text-neutral-900'>
          {title}
        </h4>

        {/* Description */}
        <p className='line-clamp-3 text-sm text-neutral-900'>{content}</p>

        {/* Likes & Comments */}
        <div className='mt-2 flex gap-5 text-sm text-neutral-600'>
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
      </div>
    </div>
  );
}
