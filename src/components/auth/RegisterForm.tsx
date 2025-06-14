'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/Button';

import { useRegister } from '@/hooks/useRegister';
import { registerSchema, RegisterInput } from '@/validators/auth.schema';

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { mutate: registerUser, isPending } = useRegister();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterInput) => {
    const { name, email, password } = data;
    registerUser(
      { name, email, password },
      {
        onSuccess: () => {
          router.push('/login');
        },
        onError: (err) => {
          console.error('Register failed:', err);
        },
      }
    );
  };

  return (
    <div className='mx-auto mt-24 w-[90%] max-w-[400px] rounded-[12px] border p-6 shadow-sm'>
      <h1 className='pb-5 pl-1 text-xl font-bold text-neutral-900'>Sign Up</h1>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
        {/* Name */}
        <div className='space-y-1'>
          <label className='block text-sm font-semibold text-neutral-950'>
            Name
          </label>
          <input
            type='text'
            placeholder='Enter your name'
            {...register('name')}
            className={`h-12 w-full rounded-[12px] border px-4 py-2 ${
              errors.name ? 'border-[#EE1D52]' : 'border-neutral-300'
            } text-sm text-neutral-900`}
          />
          {errors.name && (
            <p className='mt-1 text-sm text-[#EE1D52]'>{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className='space-y-1'>
          <label className='block text-sm font-semibold text-neutral-950'>
            Email
          </label>
          <input
            type='email'
            placeholder='Enter your email'
            {...register('email')}
            className={`h-12 w-full rounded-[12px] border px-4 py-2 ${
              errors.email ? 'border-[#EE1D52]' : 'border-neutral-300'
            } text-sm text-neutral-900`}
          />
          {errors.email && (
            <p className='mt-1 text-sm text-[#EE1D52]'>
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className='space-y-1'>
          <label className='block text-sm font-semibold text-neutral-950'>
            Password
          </label>
          <div className='relative'>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Enter your password'
              {...register('password')}
              className={`h-12 w-full rounded-[12px] border px-4 py-2 pr-10 ${
                errors.password ? 'border-[#EE1D52]' : 'border-neutral-300'
              } text-sm text-neutral-900`}
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className='absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-neutral-500'
            >
              👁️
            </span>
          </div>
          {errors.password && (
            <p className='mt-1 text-sm text-[#EE1D52]'>
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className='space-y-1'>
          <label className='block text-sm font-semibold text-neutral-950'>
            Confirm Password
          </label>
          <div className='relative'>
            <input
              type={showConfirm ? 'text' : 'password'}
              placeholder='Enter your confirm password'
              {...register('confirmPassword')}
              className={`h-12 w-full rounded-[12px] border px-4 py-2 pr-10 ${
                errors.confirmPassword
                  ? 'border-[#EE1D52]'
                  : 'border-neutral-300'
              } text-sm text-neutral-900`}
            />
            <span
              onClick={() => setShowConfirm((prev) => !prev)}
              className='absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-neutral-500'
            >
              👁️
            </span>
          </div>
          {errors.confirmPassword && (
            <p className='mt-1 text-sm text-[#EE1D52]'>
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Button */}
        <Button type='submit' className='mt-3 h-12 w-full'>
          {isPending ? 'Loading...' : 'Register'}
        </Button>

        {/* Link ke login */}
        <p className='pt-4 text-center text-sm text-neutral-950'>
          Already have an account?{' '}
          <a href='/login' className='text-primary-300 font-semibold'>
            Log in
          </a>
        </p>
      </form>
    </div>
  );
}
