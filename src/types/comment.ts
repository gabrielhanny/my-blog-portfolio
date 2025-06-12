// types/comment.ts
export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  author: {
    id: number;
    name: string;
    email: string;
    avatarUrl?: string;
  };
}
