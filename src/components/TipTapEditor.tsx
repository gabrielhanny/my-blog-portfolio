'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import './tiptap.css';

interface TipTapEditorProps {
  content: string;
  onChange: (value: string) => void;
}

export default function TipTapEditor({ content, onChange }: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className='rounded-xl border border-neutral-300 p-2'>
      <EditorContent editor={editor} />
    </div>
  );
}
