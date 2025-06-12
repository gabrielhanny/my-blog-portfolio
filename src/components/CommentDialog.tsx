'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { addComment } from '@/lib/post';
import { Comment } from '@/types/comment';

interface CommentDialogProps {
  comments?: Comment[];
  postId: number;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CommentDialog({
  comments = [],
  postId,
  open,
  setOpen,
}: CommentDialogProps) {
  const { data: session } = useSession();
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!newComment.trim() || !session?.user?.token) return;

    try {
      setIsSubmitting(true);
      await addComment(postId, newComment, session.user.token);
      setNewComment('');
      setOpen(false);
    } catch (err) {
      console.error('Failed to add comment', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='max-w-md sm:max-w-2xl'>
        <DialogHeader>
          <DialogTitle className='text-xl font-bold text-neutral-950'>
            Comments ({comments.length})
          </DialogTitle>
        </DialogHeader>

        {/* Comment Form */}
        <div className='mt-4 space-y-2'>
          <div className='flex items-center gap-3'>
            <Image
              src={session?.user?.image || '/image/author.png'}
              alt='Your avatar'
              width={40}
              height={40}
              className='rounded-full'
            />
            <p className='text-sm font-semibold text-neutral-900'>
              {session?.user?.name || 'You'}
            </p>
          </div>
          <label className='block text-sm font-semibold text-neutral-950'>
            Give your comments
          </label>
          <textarea
            className='w-full rounded-md border border-neutral-300 p-2 text-sm text-neutral-900'
            rows={4}
            placeholder='Enter your comment...'
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <div className='flex justify-end'>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className='bg-primary-300 text-neutral-25 rounded-full px-6 py-2 text-sm font-semibold'
            >
              {isSubmitting ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>

        {/* List Comments */}
        <div className='mt-6 max-h-[300px] space-y-4 overflow-y-auto'>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <Link
                href={`/users/${comment.author.email}`}
                key={comment.id}
                className='flex cursor-pointer items-start gap-3'
              >
                <Image
                  src={comment.author.avatarUrl || '/image/author.png'}
                  alt={comment.author.name}
                  width={40}
                  height={40}
                  className='rounded-full object-cover'
                />
                <div>
                  <p className='text-sm font-semibold text-neutral-900'>
                    {comment.author.name}
                  </p>
                  <p className='text-sm text-neutral-700'>{comment.content}</p>
                </div>
              </Link>
            ))
          ) : (
            <p className='text-sm text-neutral-500'>No comments yet.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
