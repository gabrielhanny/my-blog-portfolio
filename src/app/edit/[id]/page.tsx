'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/Footer';
import TipTapEditor from '@/components/TipTapEditor';

export default function EditPostPage() {
  const { id } = useParams();
  const { data: session } = useSession();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({ title: false, content: false });

  useEffect(() => {
    async function fetchPost() {
      if (!session?.user?.token) return;
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${session.user.token}`,
          },
        });
        const data = await res.json();
        setTitle(data.title);
        setContent(data.content);
        setTags(data.tags.join(', '));
        setExistingImage(data.imageUrl);
      } catch (err) {
        console.error('Failed to fetch post:', err);
      }
    }
    if (id && session?.user?.token) fetchPost();
  }, [id, session]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setCoverImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const hasError = !title.trim() || !content.trim();
    setErrors({ title: !title.trim(), content: !content.trim() });
    if (hasError) return;

    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      const tagArray = tags.split(',').map((tag) => tag.trim()).filter(Boolean);
      formData.append('tags', JSON.stringify(tagArray));
      if (coverImage) {
        formData.append('image', coverImage);
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${session?.user?.token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error('Failed to update post');
      router.push('/profile');
    } catch (err) {
      console.error(err);
      alert('Failed to update post.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <header className='border-b border-neutral-200 px-6 py-4'>
        <div className='custom-container flex items-center justify-between'>
          <Link href='/profile' className='text-display-xs font-bold text-neutral-900'>
            ← Edit Post
          </Link>

          <div className='flex items-center gap-2'>
            <Image
              src={session?.user?.image || '/image/author.png'}
              alt='user'
              width={32}
              height={32}
              className='rounded-full'
            />
            <span className='text-sm font-medium text-neutral-900'>
              {session?.user?.name || 'John Doe'}
            </span>
          </div>
        </div>
      </header>

      <main className='custom-container pt-6 lg:pt-10'>
        <form
          onSubmit={handleSubmit}
          className='mx-auto max-w-[734px] space-y-6 pb-24'
          encType='multipart/form-data'
        >
          <div>
            <label className='text-sm font-semibold text-neutral-950'>Title</label>
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`mt-2 w-full rounded-xl border px-4 py-2 text-sm ${errors.title ? 'border-red-500' : 'border-neutral-300'}`}
              placeholder='Enter your title'
            />
          </div>

          <div>
            <label className='text-sm font-semibold text-neutral-950'>Content</label>
            <div className='mt-2'>
              <TipTapEditor content={content} onChange={setContent} />
            </div>
          </div>

          <div>
            <label className='text-sm font-semibold text-neutral-950'>Cover Image</label>
            <div className='mt-2 flex flex-col items-center justify-center rounded-xl border border-dashed border-neutral-300'>
              {existingImage && !coverImage && (
                <Image
                  src={existingImage}
                  alt='cover'
                  width={300}
                  height={200}
                  className='object-cover py-2'
                />
              )}
              <input
                type='file'
                onChange={handleImageChange}
                className='hidden'
                id='upload'
              />
              <label htmlFor='upload' className='text-primary-300 cursor-pointer text-sm font-semibold hover:underline'>
                {coverImage ? 'Change Image' : 'Upload Image'}
              </label>
              <p className='mb-3 mt-1 text-xs text-neutral-400'>PNG or JPG (max. 5mb)</p>
            </div>
          </div>

          <div>
            <label className='text-sm font-semibold text-neutral-950'>Tags</label>
            <input
              type='text'
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder='Enter tags, comma-separated'
              className='mt-2 w-full rounded-xl border border-neutral-300 px-4 py-2 text-sm text-neutral-900 placeholder-neutral-500'
            />
          </div>

          <div className='pt-6 text-right'>
            <button
              type='submit'
              disabled={isSubmitting}
              className='bg-primary-300 text-neutral-25 w-[265px] rounded-full px-6 py-2 text-sm font-semibold'
            >
              {isSubmitting ? 'Updating...' : 'Update Post'}
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
}
