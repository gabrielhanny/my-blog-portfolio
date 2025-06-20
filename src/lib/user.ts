// // src/lib/user.ts


// import { BASE_URL } from './api';


// export async function getUserProfile(email: string) {
//   const res = await fetch(`${BASE_URL}/users/${encodeURIComponent(email)}`);
//   if (!res.ok) {
//     throw new Error('Failed to fetch user profile');
//   }
//   return res.json();
// }

// export async function getPostsByAuthor() {

//   console.warn(
//     '[getPostsByAuthor] Endpoint untuk mengambil postingan berdasarkan author belum tersedia. Return []'
//   );
//   return [];
// }

import { BASE_URL } from './api';

export async function getUserProfile(email: string) {
  const res = await fetch(`${BASE_URL}/users/${encodeURIComponent(email)}`);
  if (!res.ok) {
    throw new Error('Failed to fetch user profile');
  }
  return res.json();
}

export async function getPostsByAuthor(email: string) {
  const res = await fetch(`${BASE_URL}/posts`);
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }

  const allPosts = await res.json();

  return allPosts.filter((post: any) => post.author?.email === email);
}
