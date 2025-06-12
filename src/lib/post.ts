// src/lib/post.ts
import { Comment } from '@/types/comment';

import { BASE_URL } from './api';

// POST: Like a post
export async function likePost(postId: number, token: string) {
  const res = await fetch(`${BASE_URL}/posts/${postId}/like`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to like post');
  }

  return res.json();
}

// GET: Post detail
export async function getPostDetail(postId: number) {
  const res = await fetch(`${BASE_URL}/posts/${postId}`);
  if (!res.ok) throw new Error('Failed to fetch post detail');
  return res.json();
}

// GET: Comments for a post
export async function getPostComments(postId: number): Promise<Comment[]> {
  const res = await fetch(`${BASE_URL}/posts/${postId}/comments`);
  if (!res.ok) throw new Error('Failed to fetch comments');
  return res.json();
}

// POST: Add new comment to a post
export async function addComment(
  postId: number,
  content: string,
  token: string
) {
  const res = await fetch(`${BASE_URL}/posts/${postId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to post comment');
  }

  return res.json();
}

// ✅ GET: Posts milik user yang sedang login
export async function getMyPosts(token: string) {
  const res = await fetch(`${BASE_URL}/posts`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    const error = await res.json();
    console.error('[getMyPosts] Failed to fetch user posts:', error.message);
    throw new Error(error.message || 'Failed to fetch user posts');
  }

  return res.json();
}

// GET: Comments for a post
// export async function getPostComments(postId: number) {
//   const res = await fetch(`${BASE_URL}/posts/${postId}/comments`);
//   if (!res.ok) throw new Error('Failed to fetch comments');
//   return res.json();
// }

// GET: Another posts
// export async function getAnotherPosts() {
//   const res = await fetch(`${BASE_URL}/posts/another-posts`);
//   if (!res.ok) throw new Error('Failed to fetch another posts');
//   return res.json();
// }
