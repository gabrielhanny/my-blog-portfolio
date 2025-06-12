'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { z } from 'zod';

import { Button } from '@/components/ui/Button';

import { useLogin } from '@/hooks/useLogin';
import { login as loginAction } from '@/store/slices/authSlice';
import { AppDispatch } from '@/store/store';

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginInput = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { mutate: doLogin, isPending } = useLogin();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginInput) => {
    doLogin(data, {
      onSuccess: (response) => {
        const token = response.token;

        // Simpan token ke localStorage
        localStorage.setItem('accessToken', token);

        // Decode JWT token
        const decoded = jwtDecode<{ id: number; email: string }>(token);

        // Dispatch ke Redux
        dispatch(
          loginAction({
            token,
            user: {
              id: decoded.id,
              email: decoded.email,
            },
          })
        );

        toast.success('Login success!');
        router.push('/');
      },
      onError: (error) => {
        console.error('Login failed:', error.message);
        toast.error(error.message || 'Login failed. Please try again.');
      },
    });
  };

  return (
    <div className='mx-auto mt-24 w-[90%] max-w-[360px] rounded-[12px] border p-6 shadow-sm'>
      <h1 className='pb-5 pl-1 text-xl font-bold text-neutral-900'>Sign In</h1>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
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

        {/* Submit Button */}
        <Button type='submit' className='mt-3 h-12 w-full'>
          {isPending ? 'Loading...' : 'Login'}
        </Button>

        {/* Register Link */}
        <p className='pt-4 text-center text-sm text-neutral-950'>
          Don&apos;t have an account?{' '}
          <a href='/register' className='text-primary-300 font-semibold'>
            Register
          </a>
        </p>
      </form>
    </div>
  );
}
