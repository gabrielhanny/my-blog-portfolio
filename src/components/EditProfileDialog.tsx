
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditProfileDialog({
  open,
  onOpenChange,
}: EditProfileDialogProps) {
  const { data: session } = useSession();
  const [name, setName] = useState('');
  const [headline, setHeadline] = useState('');

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || '');
      setHeadline((session.user as any)?.headline || '');
    }
  }, [session]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='w-[345px] sm:w-[451px] rounded-xl px-6 pt-6 pb-4'>
        <DialogHeader>
          <DialogTitle className='text-neutral-950 text-md sm:text-xl font-bold'>
            Edit Profile
          </DialogTitle>
        </DialogHeader>

        {/* Avatar */}
        <div className='flex justify-center pt-5 relative'>
          <div className='relative'>
            <Image
              src={session?.user?.image || '/image/author.png'}
              alt='avatar'
              width={80}
              height={80}
              className='rounded-full'
            />
            {/* Camera icon or blue badge */}
            <div className='absolute -bottom-1 -right-1 bg-white rounded-full p-[2px]'>
              <div className='bg-blue-500 rounded-full p-1'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-3 w-3 text-white'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                >
                  <path d='M12 5c-3.86 0-7 3.14-7 7s3.14 7 7 7c1.51 0 2.9-.49 4.03-1.31l3.53 1.31-1.31-3.53C18.51 14.9 19 13.51 19 12c0-3.86-3.14-7-7-7zm-1 10l-4-4h3V8h2v3h3l-4 4z' />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Name Field */}
        <div className='pt-5'>
          <label className='text-sm font-semibold text-neutral-950'>Name</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='mt-2 w-full rounded-[12px] border border-neutral-300 px-4 py-2 text-sm text-neutral-950'
          />
        </div>

        {/* Headline Field */}
        <div className='pt-5'>
          <label className='text-sm font-semibold text-neutral-950'>
            Profile Headline
          </label>
          <input
            type='text'
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            className='mt-2 w-full rounded-[12px] border border-neutral-300 px-4 py-2 text-sm text-neutral-950'
          />
        </div>

        {/* Update Password */}
        <div className='pt-6'>
         
<button
  onClick={() => {
    window.dispatchEvent(new CustomEvent('switch-tab', { detail: 'password' }));
    onOpenChange(false); 
  }}
  className='block w-full rounded-full bg-primary-300 py-2 text-center text-sm font-semibold text-neutral-25'
>
  Update Password
</button>


        </div>
      </DialogContent>
    </Dialog>
  );
}
