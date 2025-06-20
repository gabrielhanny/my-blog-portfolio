'use client';

import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function ChangePasswordForm() {
  const { data: session } = useSession();
  const router = useRouter();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('All fields are required');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/password`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user?.token}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      if (!res.ok) throw new Error('Failed to update password');

      alert('Password updated');
      router.refresh();
    } catch (error) {
      alert('Error updating password');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6 pt-10'>
      {/* Current Password */}
      <div className='space-y-2'>
        <label className='text-sm font-semibold text-neutral-950'>Current Password</label>
        <div className='relative'>
          <input
            type={showCurrent ? 'text' : 'password'}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder='Enter current password'
            className='w-full rounded-xl border border-neutral-300 px-4 py-2 pr-10 text-sm text-neutral-900 placeholder-neutral-500'
          />
          <span
            onClick={() => setShowCurrent(!showCurrent)}
            className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-neutral-500'
          >
            {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
          </span>
        </div>
      </div>

      {/* New Password */}
      <div className='space-y-2'>
        <label className='text-sm font-semibold text-neutral-950'>New Password</label>
        <div className='relative'>
          <input
            type={showNew ? 'text' : 'password'}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder='Enter new password'
            className='w-full rounded-xl border border-neutral-300 px-4 py-2 pr-10 text-sm text-neutral-900 placeholder-neutral-500'
          />
          <span
            onClick={() => setShowNew(!showNew)}
            className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-neutral-500'
          >
            {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
          </span>
        </div>
      </div>

      {/* Confirm Password */}
      <div className='space-y-2'>
        <label className='text-sm font-semibold text-neutral-950'>Confirm New Password</label>
        <div className='relative'>
          <input
            type={showConfirm ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Enter confirm new password'
            className='w-full rounded-xl border border-neutral-300 px-4 py-2 pr-10 text-sm text-neutral-900 placeholder-neutral-500'
          />
          <span
            onClick={() => setShowConfirm(!showConfirm)}
            className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-neutral-500'
          >
            {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
          </span>
        </div>
      </div>

      <div className='pt-4'>
        <button
          type='submit'
          className='w-full rounded-full bg-primary-300 px-6 py-2 text-sm font-semibold text-white'
        >
          Update Password
        </button>
      </div>
    </form>
  );
}
