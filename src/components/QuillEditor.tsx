'use client';

import dynamic from 'next/dynamic';

// Dynamic import ReactQuill (tanpa SSR)
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

import 'react-quill/dist/quill.snow.css';

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function QuillEditor({
  value,
  onChange,
  placeholder,
}: QuillEditorProps) {
  return (
    <div className='h-[238px]'>
      <ReactQuill
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        theme='snow'
        style={{ height: '100%' }}
      />
    </div>
  );
}
