'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { Comment } from '@/types/comment';

import CommentDialog from './CommentDialog';

interface CommentListProps {
  comments?: Comment[];
  postId: number;
}

export default function CommentList({
  comments = [],
  postId,
}: CommentListProps) {
  const [open, setOpen] = useState(false);

  const showSeeAll = comments.length > 2;

  return (
    <div className='mt-6 w-full'>
      <div className='mx-auto max-w-[800px] space-y-4'>
        {comments.map((comment) => (
          <div key={comment.id} className='flex items-start gap-3'>
            <Link
              href={`/users/${encodeURIComponent(comment.author.email)}`}
              className='shrink-0'
            >
              <Image
                src={comment.author.avatarUrl || '/image/author.png'}
                alt={comment.author.name}
                width={40}
                height={40}
                className='cursor-pointer rounded-full object-cover'
              />
            </Link>

            <div>
              <Link
                href={`/users/${encodeURIComponent(comment.author.email)}`}
                className='cursor-pointer text-sm font-semibold text-neutral-900 hover:underline'
              >
                {comment.author.name}
              </Link>
              <p className='text-sm text-neutral-950'>{comment.content}</p>
            </div>
          </div>
        ))}

        {showSeeAll && (
          <div className='pt-2'>
            <button
              onClick={() => setOpen(true)}
              className='text-primary-300 text-sm font-semibold hover:underline'
            >
              See All Comments
            </button>
          </div>
        )}

        <CommentDialog
          open={open}
          setOpen={setOpen}
          comments={comments}
          postId={postId}
        />

        <button
          onClick={() => setOpen(true)}
          className='text-primary-300 text-sm font-semibold hover:underline'
        >
          See All Comments
        </button>
      </div>
    </div>
  );
}
