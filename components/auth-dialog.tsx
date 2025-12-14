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

const AUTH_DIALOG_DISMISS_KEY = 'auth-dialog-dismissed-at';
const DISMISS_DURATION_MS = 24 * 60 * 60 * 1000; // 24時間

export function AuthDialog() {
  const { user, isLoading } = useUser();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);
  const isTopLevelPage = pathSegments.length <= 1; // '/', '/quiz', '/text', '/global', '/harvor' など
  const suppressOnThisPage = (isTopLevelPage && pathname !== '/harvor') || pathname.startsWith('/global');

  // ダイアログが24時間以内に閉じられたかチェック
  const isDismissedRecently = () => {
    if (typeof window === 'undefined') return false;
    
    const dismissedAt = localStorage.getItem(AUTH_DIALOG_DISMISS_KEY);
    if (!dismissedAt) return false;
    
    const dismissedTime = parseInt(dismissedAt, 10);
    const now = Date.now();
    return (now - dismissedTime) < DISMISS_DURATION_MS;
  };

  const handleLoginClick = async () => {
    const clientInfo = getClientInfo();
    await handleTrackEvent({
      user_id: 'guest',
      event_name: 'click_login_dialog_button',
      path: pathname,
      properties: clientInfo,
    });
  };

  const handleDialogClose = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      // ダイアログを閉じる時に現在時刻を記録
      localStorage.setItem(AUTH_DIALOG_DISMISS_KEY, Date.now().toString());
    }
  };

  useEffect(() => {
    if (!isLoading && !user && !suppressOnThisPage && !isDismissedRecently()) {
      setOpen(true);
    }
  }, [isLoading, user, pathname, suppressOnThisPage]);

  if (isLoading) return null;

  if (!user) {
    return (
      <Dialog open={open} onOpenChange={handleDialogClose}>
        <DialogContent>
          <DialogHeader className="mx-2">
            <DialogTitle>学習状況を記録しよう</DialogTitle>
            <DialogDescription>
              クイズの解答状況などの学習状況を記録するにはサインインが必要です。<br />
              <Link href="/global/privacy" onClick={() => handleDialogClose(false)} className="underline text-blue-500">プライバシーポリシーはこちら</Link>
            </DialogDescription>
          </DialogHeader>
          <Button asChild className="mx-2">
            <a href={`/api/auth/login?returnTo=${pathname}`} onClick={handleLoginClick}>サインイン（無料）</a>
          </Button>
        </DialogContent>
      </Dialog>
    );
  }

  return null;
}
