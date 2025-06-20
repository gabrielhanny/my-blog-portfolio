
'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';

interface DeleteDialogProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  onDelete: () => void;
  postId?: number;
}

export default function DeleteDialog({
  open,
  onOpenChange,
  onDelete,
}: DeleteDialogProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await onDelete();
    setLoading(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[345px] sm:w-[537px] p-6 sm:p-8">
        <DialogHeader>
          <div className="relative">
            <DialogTitle className="text-md sm:text-xl font-bold text-neutral-950">
              Delete
            </DialogTitle>
            <DialogClose asChild>
  <button className="absolute right-6 top-6 text-neutral-500 hover:text-neutral-950">

  </button>
</DialogClose>

          </div>
          <DialogDescription className="pt-4 text-sm sm:text-md text-neutral-600">
            Are you sure to delete?
          </DialogDescription>
        </DialogHeader>

        <div className="pt-6 flex justify-end gap-4">
          <button
            onClick={() => onOpenChange(false)}
            className="text-sm font-semibold text-neutral-950"
          >
            Cancel
          </button>
          <Button
            onClick={handleDelete}
            disabled={loading}
            className="bg-[#EE1D52] hover:bg-[#d71b49] text-neutral-25 w-[156px] sm:w-[171px] h-[40px] sm:h-[48px] text-sm font-semibold"
          >
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
