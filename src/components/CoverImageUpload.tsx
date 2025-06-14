'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

export default function CoverImageUpload({
  onFileSelect,
}: {
  onFileSelect: (file: File) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      onFileSelect(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    } else {
      alert('Only PNG or JPG files under 5MB are allowed');
    }
  };

  return (
    <div
      onClick={() => fileInputRef.current?.click()}
      className='flex h-[140px] w-full cursor-pointer flex-col items-center justify-center space-y-2 rounded-lg border border-dashed border-neutral-300 text-sm text-neutral-600'
    >
      {previewUrl ? (
        <Image
          src={previewUrl}
          alt='Cover Preview'
          width={300}
          height={140}
          className='h-[140px] object-contain'
        />
      ) : (
        <>
          <Image
            src='/icon/upload.svg'
            alt='upload'
            width={24}
            height={24}
            className='mb-1'
          />
          <p>
            <span className='text-primary-300 font-semibold'>
              Click to upload
            </span>{' '}
            or drag and drop
          </p>
          <p className='text-xs text-neutral-500'>PNG or JPG (max. 5mb)</p>
        </>
      )}

      <input
        ref={fileInputRef}
        type='file'
        accept='image/png, image/jpeg'
        onChange={handleFileChange}
        hidden
      />
    </div>
  );
}
