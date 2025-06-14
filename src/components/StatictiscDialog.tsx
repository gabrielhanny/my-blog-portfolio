
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Image from 'next/image';
import { useState } from 'react';

interface User {
  id: number;
  name: string;
  headline: string;
  avatarUrl: string;
}

interface Comment {
  id: number;
  user: User;
  text: string;
}

interface StatisticDialogProps {
  open: boolean;
  onClose: () => void;
  likes: User[];
  comments: Comment[];
}

export default function StatisticDialog({ open, onClose, likes, comments }: StatisticDialogProps) {
  const [activeTab, setActiveTab] = useState<'like' | 'comment'>('like');

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[613px] w-full rounded-xl p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-neutral-950 md:text-xl text-md">
            Statistic
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6 flex gap-6 border-b border-neutral-300 text-sm font-semibold">
          <button
            className={`flex items-center gap-2 pb-2 ${activeTab === 'like' ? 'text-primary-300 border-b-2 border-primary-300' : 'text-neutral-400'}`}
            onClick={() => setActiveTab('like')}
          >
            <Image src="/icon/like.svg" alt="like" width={18} height={18} /> Like
          </button>
          <button
            className={`flex items-center gap-2 pb-2 ${activeTab === 'comment' ? 'text-primary-300 border-b-2 border-primary-300' : 'text-neutral-400'}`}
            onClick={() => setActiveTab('comment')}
          >
            <Image src="/icon/comment.svg" alt="comment" width={18} height={18} /> Comment
          </button>
        </div>

        <div className="mt-4 space-y-4">
          {activeTab === 'like' ? (
            <>
              <p className="text-lg font-bold text-neutral-950 md:text-lg text-sm">Like ({likes.length})</p>
              {likes.map((user) => (
                <div key={user.id} className="flex items-center gap-4">
                  <Image
                    src={user.avatarUrl || '/image/author.png'}
                    alt={user.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="text-sm font-semibold text-neutral-950">{user.name}</p>
                    <p className="text-sm text-neutral-500">{user.headline}</p>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              <p className="text-lg font-bold text-neutral-950 md:text-lg text-sm">Comment ({comments.length})</p>
              {comments.map((comment) => (
                <div key={comment.id} className="flex items-start gap-4">
                  <Image
                    src={comment.user.avatarUrl || '/image/author.png'}
                    alt={comment.user.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="text-sm font-semibold text-neutral-950">{comment.user.name}</p>
                    <p className="text-sm text-neutral-500">{comment.text}</p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
