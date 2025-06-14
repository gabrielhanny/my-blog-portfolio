'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import CommentForm from '@/components/CommentForm';
import CommentHeader from '@/components/CommentHeader';
import CommentList from '@/components/CommentList';
import Footer from '@/components/Footer';
import NavbarLoggedIn from '@/components/NavbarLoggedIn';
import PostDetail from '@/components/PostDetail';

import { getPostDetail, getPostComments } from '@/lib/post';
import { Comment } from '@/types/comment';
import { Post } from '@/types/post';

export default function PostDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const postId = Number(id);
    if (!postId || isNaN(postId)) {
      router.push('/404');
      return;
    }

    const fetchData = async () => {
      try {
        const postData = await getPostDetail(postId);
        const commentData = await getPostComments(postId);

        // ✅ Tambahkan properti likedByUser jika belum ada
        const fixedPost = {
          ...postData,
          likedByUser: postData.likedByUser ?? false,
        };

        setPost(fixedPost);
        setComments(commentData);
      } catch (err) {
        console.error('Failed to fetch post detail:', err);
        router.push('/404');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, router]);

  if (loading || !post) return <p className='mt-10 text-center'>Loading...</p>;

  return (
    <>
      <NavbarLoggedIn />
      <main className='custom-container mt-[48px]'>
        <PostDetail post={post} />
        <CommentHeader count={comments.length} />
        <CommentForm postId={post.id} />
        <CommentList comments={comments} postId={post.id} />
      </main>
      <Footer />
    </>
  );
}
