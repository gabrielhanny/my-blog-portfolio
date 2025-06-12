'use client';

import BlogCard from './BlogCard';

type Post = {
  id: number;
  title: string;
  content: string;
  tags: string[];
  imageUrl: string;
  createdAt: string;
  likes: number;
  comments: number;
  author: {
    name: string;
    avatarUrl?: string;
  };
};

interface AnotherPostListProps {
  posts: Post[];
}

export default function AnotherPostList({ posts }: AnotherPostListProps) {
  if (!posts.length) return null;

  return (
    <section className='mt-16'>
      <h3 className='text-display-xs mb-6 font-bold text-neutral-900'>
        Another Post
      </h3>
      <div className='flex flex-col gap-6'>
        {posts.map((post) => (
          <BlogCard key={post.id} {...post} />
        ))}
      </div>
    </section>
  );
}
