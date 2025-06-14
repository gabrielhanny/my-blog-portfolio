import { Post } from '@/types/post';

import { fetchAPI } from './api';

export async function searchPosts(query: string): Promise<Post[]> {
  if (!query) return [];

  try {
    const res = await fetchAPI<{ data: Post[] }>(
      `posts/search?query=${encodeURIComponent(query)}&limit=10&page=1`
    );
    return res.data;
  } catch (error) {
    console.error('❌ Failed to search posts:', error);
    return [];
  }
}
