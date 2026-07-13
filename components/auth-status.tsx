'use client'

import { useUser } from '@auth0/nextjs-auth0/client';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { trackLoginStarted } from '@/app/lib/frontend_event_api';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

const AUTH_DIALOG_DISMISS_KEY = 'auth-dialog-dismissed-at';
const DISMISS_DURATION_MS = 24 * 60 * 60 * 1000; // 24時間

function AuthStatusInner() {
  const { user, isLoading } = useUser();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [promptOpen, setPromptOpen] = useState(false);

  // 動作確認用: ?force_auth_prompt=1 で dismiss / ページ抑制を無視
  const forceShow = searchParams.get('force_auth_prompt') === '1';
  const pathSegments = pathname.split('/').filter(Boolean);
  const isTopLevelPage = pathSegments.length <= 1;
  const suppressOnThisPage =
    !forceShow && ((isTopLevelPage && pathname !== '/harvor') || pathname.startsWith('/global'));

  const isDismissedRecently = () => {
    if (forceShow) return false;
    if (typeof window === 'undefined') return false;

    const dismissedAt = localStorage.getItem(AUTH_DIALOG_DISMISS_KEY);
    if (!dismissedAt) return false;

    return Date.now() - parseInt(dismissedAt, 10) < DISMISS_DURATION_MS;
  };

  const handleDismiss = () => {
    setPromptOpen(false);
    localStorage.setItem(AUTH_DIALOG_DISMISS_KEY, Date.now().toString());
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isLoading || user || suppressOnThisPage || isDismissedRecently()) {
      setPromptOpen(false);
      return;
    }
    setPromptOpen(true);
  }, [isLoading, user, pathname, suppressOnThisPage, forceShow]);

  if (isLoading || !mounted) return null;

  if (user) return null;

  const loginUrl = `/api/auth/login?returnTo=${pathname}`;

  return (
    <div className="relative">
      {promptOpen && (
        <div
          className={cn(
            'z-50 w-max max-w-[calc(100vw-2rem)] pointer-events-none',
            // xl 未満: Sign in 直下（スポンサーは縦並びのため被らない）
            'absolute right-0 top-full mt-2',
            // xl 以上: ヘッダー内で Sign in の左横に置き、スポンサー列と被らないようにする
            'xl:right-full xl:top-1/2 xl:mt-0 xl:mr-2 xl:max-w-[min(24rem,calc(100vw-12rem))] xl:-translate-y-1/2'
          )}
          role="status"
          aria-live="polite"
        >
          {/* 上向き矢印（xl 未満） */}
          <div
            className="absolute -top-1.5 right-5 size-3 rotate-45 border-l border-t border-border bg-card dark:border-zinc-600 dark:bg-zinc-800 xl:hidden"
            aria-hidden
          />
          {/* 右向き矢印（xl 以上） */}
          <div
            className="absolute -right-1.5 top-1/2 hidden size-3 -translate-y-1/2 rotate-45 border-r border-t border-border bg-card dark:border-zinc-600 dark:bg-zinc-800 xl:block"
            aria-hidden
          />
          <div className="pointer-events-auto flex items-start gap-2 rounded-2xl border border-border bg-card p-2.5 pl-3 shadow-lg dark:border-zinc-600 dark:bg-zinc-800 dark:shadow-black/40">
            <div className="min-w-0 sm:min-w-max sm:shrink-0 pt-0.5">
              <p className="text-sm font-medium sm:whitespace-nowrap">学習状況を記録しよう</p>
              <p className="text-xs leading-relaxed text-muted-foreground sm:whitespace-nowrap">
                進捗を保存できます。
                <Link
                  href="/global/privacy"
                  onClick={handleDismiss}
                  className="ml-1 underline underline-offset-2 hover:text-foreground"
                >
                  プライバシーポリシー
                </Link>
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0 text-muted-foreground hover:text-foreground"
              onClick={handleDismiss}
              aria-label="閉じる"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      <a
        href={loginUrl}
        onClick={() => void trackLoginStarted({ source: 'header', path: pathname })}
        className={cn(
          'inline-flex items-center justify-center text-xs sm:text-sm rounded-md h-9 px-3 py-2 text-nowrap',
          'hover:bg-primary/75 bg-primary text-primary-foreground',
          promptOpen &&
            'relative z-10 ring-2 ring-primary/50 ring-offset-2 ring-offset-background dark:ring-offset-background'
        )}
      >
        Sign in
      </a>
    </div>
  );
}

export function AuthStatus() {
  return (
    <Suspense fallback={null}>
      <AuthStatusInner />
    </Suspense>
  );
}
