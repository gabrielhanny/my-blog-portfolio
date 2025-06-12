'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import { addComment } from '@/lib/post';

interface CommentFormProps {
  postId: number;
}

export default function CommentForm({ postId }: CommentFormProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user?.token) {
      alert('You must be logged in to comment.');
      return;
    }

    if (!content.trim()) {
      alert('Comment cannot be empty.');
      return;
    }

    try {
      setIsSubmitting(true);
      await addComment(postId, content, session.user.token);
      setContent('');
      router.refresh(); // Refresh untuk update list comment
    } catch (err) {
      console.error('❌ Failed to submit comment:', err);
      alert('Failed to submit comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='mt-6'>
      <div className='mx-auto w-full max-w-[800px]'>
        <label
          htmlFor='comment'
          className='block pb-2 text-sm font-semibold text-neutral-950'
        >
          Give your comments
        </label>
        <textarea
          id='comment'
          rows={5}
          className='w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm text-neutral-950 placeholder:text-neutral-500'
          placeholder='Enter your comment'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className='mt-4 flex justify-end'>
          <button
            type='submit'
            className='bg-primary-300 text-neutral-25 rounded-full px-6 py-2 text-sm font-semibold'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Post Comment'}
          </button>
        </div>
      </div>
    </form>
  );
}
