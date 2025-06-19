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
import { handleTrackEvent } from '@/app/lib/frontend_event_api';
import { getClientInfo } from '@/app/lib/client_info';

export function AuthDialog() {
  const { user, isLoading } = useUser();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const handleLoginClick = async () => {
    const clientInfo = getClientInfo();
    await handleTrackEvent({
      user_id: 'guest',
      event_name: 'click_login_dialog_button',
      path: pathname,
      properties: clientInfo,
    });
  };

  useEffect(() => {
    if (!isLoading && !user && pathname !== '/') {
      setOpen(true);
    }
  }, [isLoading, user, pathname]);

  if (isLoading) return null;

  if (!user) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>学習状況を記録しよう</DialogTitle>
            <DialogDescription>
              クイズの解答状況などの学習状況を記録するにはサインインが必要です。<br />
              <Link href="/global/terms" onClick={() => setOpen(false)} className="underline text-blue-500">プライバシーポリシーはこちら</Link>
            </DialogDescription>
          </DialogHeader>
          <Button asChild>
            <a href={`/api/auth/login?returnTo=${pathname}`} onClick={handleLoginClick}>サインイン（無料）</a>
          </Button>
        </DialogContent>
      </Dialog>
    );
  }

  return null;
}
