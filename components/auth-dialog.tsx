'use client'

import { useUser } from '@auth0/nextjs-auth0/client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { usePathname } from 'next/navigation';

export function AuthDialog() {
  const { user, isLoading } = useUser();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !user) {
      setOpen(true);
    }
  }, [isLoading, user]);

  if (isLoading) return null;

  if (!user) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>サインインをして学習状況を保存しましょう！</DialogTitle>
            <DialogDescription>
              クイズの解答状況などの学習状況を保存するにはサインイン（無料）が必要です。
              <Link href="/global/terms" onClick={() => setOpen(false)} className="underline text-blue-500">プライバシーポリシーはこちら</Link>
            </DialogDescription>
          </DialogHeader>
          <Button asChild>
            <a href={`/api/auth/login?returnTo=${pathname}`}>サインインする</a>
          </Button>
        </DialogContent>
      </Dialog>
    );
  }

  return null;
}
