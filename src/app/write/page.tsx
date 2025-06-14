// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useSession } from 'next-auth/react';
// import { useState } from 'react';
// import Footer from '@/components/Footer';

// export default function WritePostPage() {
//   const { data: session } = useSession();
//   const router = useRouter();
//   console.log('DEBUG POST URL:', `${process.env.NEXT_PUBLIC_API_URL}/posts`);


//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [tags, setTags] = useState('');
//   const [coverImage, setCoverImage] = useState<File | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [dropdown, setDropdown] = useState(false);
//   const [errors, setErrors] = useState({ title: false, content: false });

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files?.[0]) {
//       setCoverImage(e.target.files[0]);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const hasError = !title.trim() || !content.trim();
//     setErrors({ title: !title.trim(), content: !content.trim() });
//     if (hasError) return;

//     if (!session?.user?.token) {
//       alert('You must be logged in');
//       return;
//     }

//     try {
//       setIsSubmitting(true);

//       const formData = new FormData();
//       formData.append('title', title);
//       formData.append('content', content);

//       const tagArray = tags
//         .split(',')
//         .map((tag) => tag.trim())
//         .filter(Boolean);
//       formData.append('tags', JSON.stringify(tagArray));

//       if (coverImage) {
//         formData.append('image', coverImage);
//       }

//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${session.user.token}`,
//         },
//         body: formData,
//       });

//       if (!res.ok) throw new Error('Failed to post');
//       router.push('/profile');
//     } catch (error) {
//       console.error('Post failed:', error);
//       alert('Post failed, please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };



//   return (
//     <>
//       {/* NAVBAR */}
//       <header className='border-b border-neutral-200 px-6 py-4'>
//         <div className='custom-container flex items-center justify-between'>
//           <Link
//             href='/profile'
//             className='text-display-xs font-bold text-neutral-900'
//           >
//             ← Write Post
//           </Link>

//           <div className='relative'>
//             <button
//               onClick={() => setDropdown(!dropdown)}
//               className='flex items-center gap-2'
//             >
//               <Image
//                 src={session?.user?.image || '/image/author.png'}
//                 alt='user'
//                 width={32}
//                 height={32}
//                 className='rounded-full'
//               />
//               <span className='text-sm font-medium text-neutral-900'>
//                 {session?.user?.name || 'John Doe'}
//               </span>
//             </button>

//             {dropdown && (
//               <div className='absolute top-12 right-0 w-44 rounded-xl border border-neutral-300 bg-white p-4 shadow'>
//                 <Link
//                   href='/profile'
//                   className='mb-2 flex items-center gap-2 text-sm text-neutral-950 hover:underline'
//                 >
//                   <Image
//                     src='/icon/profile-icon.svg'
//                     alt='profile'
//                     width={15}
//                     height={14}
//                   />
//                   Profile
//                 </Link>
//                 <button
//                   onClick={() => {
//                     document.cookie = 'token=; Max-Age=0';
//                     window.location.href = '/login';
//                   }}
//                   className='flex items-center gap-2 text-sm text-neutral-950 hover:underline'
//                 >
//                   <Image
//                     src='/icon/logout-icon.svg'
//                     alt='logout'
//                     width={17}
//                     height={15}
//                   />
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </header>

//       {/* FORM */}
//       <main className='custom-container pt-6 lg:pt-10'>
//         <form
//           onSubmit={handleSubmit}
//           className='mx-auto max-w-[734px] space-y-6 pb-24'
//           encType='multipart/form-data'
//         >
//           {/* TITLE */}
//           <div>
//             <label className='text-sm font-semibold text-neutral-950'>
//               Title
//             </label>
//             <input
//               type='text'
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               placeholder='Enter your title'
//               className={`mt-2 w-full rounded-xl border px-4 py-2 text-sm text-neutral-900 placeholder-neutral-500 ${
//                 errors.title ? 'border-red-500' : 'border-neutral-300'
//               }`}
//             />
//           </div>

//           {/* CONTENT */}
//           <div>
//             <label className='text-sm font-semibold text-neutral-950'>
//               Content
//             </label>
//             <textarea
//               value={content}
//               onChange={(e) => setContent(e.target.value)}
//               placeholder='Enter your content'
//               className={`mt-2 h-[238px] w-full resize-none rounded-xl border px-4 py-2 text-sm text-neutral-900 placeholder-neutral-500 ${
//                 errors.content ? 'border-red-500' : 'border-neutral-300'
//               }`}
//             />
//           </div>

//           {/* COVER IMAGE */}
//           <div>
//             <label className='text-sm font-semibold text-neutral-950'>
//               Cover Image
//             </label>
//             <div className='mt-2 flex h-[140px] w-full flex-col items-center justify-center rounded-xl border border-dashed border-neutral-300'>
//               <input
//                 type='file'
//                 onChange={handleImageChange}
//                 className='hidden'
//                 id='upload'
//               />
//               <label
//                 htmlFor='upload'
//                 className='text-primary-300 cursor-pointer text-sm font-semibold hover:underline'
//               >
//                 Click to upload
//               </label>
//               <span className='text-sm text-neutral-500'>or drag and drop</span>
//               <p className='mt-1 text-xs text-neutral-400'>
//                 PNG or JPG (max. 5mb)
//               </p>
//             </div>
//           </div>

//           {/* TAGS */}
//           <div>
//             <label className='text-sm font-semibold text-neutral-950'>
//               Tags
//             </label>
//             <input
//               type='text'
//               value={tags}
//               onChange={(e) => setTags(e.target.value)}
//               placeholder='Enter tags, comma-separated (e.g. ai, react, blog)'
//               className='mt-2 w-full rounded-xl border border-neutral-300 px-4 py-2 text-sm text-neutral-900 placeholder-neutral-500'
//             />
//           </div>

//           {/* SUBMIT */}
//           <div className='pt-6 text-right'>
//             <button
//               type='submit'
//               disabled={isSubmitting}
//               className='bg-primary-300 text-neutral-25 w-[265px] rounded-full px-6 py-2 text-sm font-semibold'
//             >
//               {isSubmitting ? 'Posting...' : 'Finish'}
//             </button>
//           </div>
//         </form>
//       </main>

//       <Footer />
//     </>
//   );
// }
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import Footer from '@/components/Footer';
import TipTapEditor from '@/components/TipTapEditor';

export default function WritePostPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [errors, setErrors] = useState({ title: false, content: false });

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

    if (!session?.user?.token) {
      alert('You must be logged in');
      return;
    }

    try {
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);

      const tagArray = tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean);
      formData.append('tags', JSON.stringify(tagArray));

      if (coverImage) {
        formData.append('image', coverImage);
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error('Failed to post');
      router.push('/profile');
    } catch (error) {
      console.error('Post failed:', error);
      alert('Post failed, please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <header className='border-b border-neutral-200 px-6 py-4'>
        <div className='custom-container flex items-center justify-between'>
          <Link
            href='/profile'
            className='text-display-xs font-bold text-neutral-900'
          >
            ← Write Post
          </Link>

          <div className='relative'>
            <button
              onClick={() => setDropdown(!dropdown)}
              className='flex items-center gap-2'
            >
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
            </button>

            {dropdown && (
              <div className='absolute top-12 right-0 w-44 rounded-xl border border-neutral-300 bg-white p-4 shadow'>
                <Link
                  href='/profile'
                  className='mb-2 flex items-center gap-2 text-sm text-neutral-950 hover:underline'
                >
                  <Image
                    src='/icon/profile-icon.svg'
                    alt='profile'
                    width={15}
                    height={14}
                  />
                  Profile
                </Link>
                <button
                  onClick={() => {
                    document.cookie = 'token=; Max-Age=0';
                    window.location.href = '/login';
                  }}
                  className='flex items-center gap-2 text-sm text-neutral-950 hover:underline'
                >
                  <Image
                    src='/icon/logout-icon.svg'
                    alt='logout'
                    width={17}
                    height={15}
                  />
                  Logout
                </button>
              </div>
            )}
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
            <label className='text-sm font-semibold text-neutral-950'>
              Title
            </label>
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Enter your title'
              className={`mt-2 w-full rounded-xl border px-4 py-2 text-sm text-neutral-900 placeholder-neutral-500 ${
                errors.title ? 'border-red-500' : 'border-neutral-300'
              }`}
            />
          </div>

          <div>
            <label className='text-sm font-semibold text-neutral-950'>
              Content
            </label>
            <div className='mt-2'>
            <TipTapEditor content={content} onChange={setContent} />
            </div>
          </div>

          <div>
            <label className='text-sm font-semibold text-neutral-950'>
              Cover Image
            </label>
            <div className='mt-2 flex h-[140px] w-full flex-col items-center justify-center rounded-xl border border-dashed border-neutral-300'>
              <input
                type='file'
                onChange={handleImageChange}
                className='hidden'
                id='upload'
              />
              <label
                htmlFor='upload'
                className='text-primary-300 cursor-pointer text-sm font-semibold hover:underline'
              >
                Click to upload
              </label>
              <span className='text-sm text-neutral-500'>or drag and drop</span>
              <p className='mt-1 text-xs text-neutral-400'>
                PNG or JPG (max. 5mb)
              </p>
            </div>
          </div>

          <div>
            <label className='text-sm font-semibold text-neutral-950'>
              Tags
            </label>
            <input
              type='text'
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder='Enter tags, comma-separated (e.g. ai, react, blog)'
              className='mt-2 w-full rounded-xl border border-neutral-300 px-4 py-2 text-sm text-neutral-900 placeholder-neutral-500'
            />
          </div>

          <div className='pt-6 text-right'>
            <button
              type='submit'
              disabled={isSubmitting}
              className='bg-primary-300 text-neutral-25 w-[265px] rounded-full px-6 py-2 text-sm font-semibold'
            >
              {isSubmitting ? 'Posting...' : 'Finish'}
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </>
  );
}
