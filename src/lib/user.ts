// src/lib/user.ts
// import { BASE_URL } from './api';

// export async function getUserProfile(email: string) {
//   const res = await fetch(`${BASE_URL}/users/${email}`);
//   if (!res.ok) {
//     console.error(`[getUserProfile] Failed for email: ${email}`);
//     throw new Error('Failed to fetch user profile');
//   }
//   return res.json();
// }

// export async function getPostsByAuthor(email: string) {
//   const res = await fetch(`${BASE_URL}/posts`);
//   if (!res.ok) {
//     console.error('[getPostsByAuthor] Failed to fetch all posts');
//     throw new Error('Failed to fetch posts');
//   }

//   const allPosts = await res.json();

//   return allPosts.filter((post: any) => post.author?.email === email);
// }

import { BASE_URL } from './api';

// Mendapatkan profil user berdasarkan email
export async function getUserProfile(email: string) {
  const res = await fetch(`${BASE_URL}/users/${encodeURIComponent(email)}`);
  if (!res.ok) {
    throw new Error('Failed to fetch user profile');
  }
  return res.json();
}

// Mendapatkan post berdasarkan author (sementara belum ada endpoint backend)
export async function getPostsByAuthor() {
  // WARNING: Endpoint belum tersedia di backend
  console.warn(
    '[getPostsByAuthor] Endpoint untuk mengambil postingan berdasarkan author belum tersedia. Return []'
  );
  return [];
}

// export async function getPostsByAuthor(email: string) {
//   const res = await fetch(`${BASE_URL}/posts`);
//   if (!res.ok) {
//     console.error('[getPostsByAuthor] Failed to fetch all posts');
//     throw new Error('Failed to fetch posts');
//   }
//   const allPosts = await res.json();

//   return allPosts.filter((post: any) => post.author.email === email); // ← ✅ email dipakai di sini
// }
