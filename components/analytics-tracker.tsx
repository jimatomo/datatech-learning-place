'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';

import { consumeLoginAttempt, handleTrackEvent } from '@/app/lib/frontend_event_api';

const LOGIN_ATTEMPT_MAX_AGE_MS = 60 * 60 * 1000;

export function AnalyticsTracker() {
  const pathname = usePathname();
  const { user, isLoading } = useUser();
  const lastTrackedPath = useRef<string | null>(null);
  const loginChecked = useRef(false);

  useEffect(() => {
    if (isLoading || lastTrackedPath.current === pathname) return;

    const previousPath = lastTrackedPath.current;
    lastTrackedPath.current = pathname;
    const searchParams = new URLSearchParams(window.location.search);
    const referrer = (() => {
      if (previousPath || !document.referrer) return null;

      try {
        const url = new URL(document.referrer);
        return `${url.origin}${url.pathname}`;
      } catch {
        return null;
      }
    })();

    void handleTrackEvent({
      user_id: user?.sub?.toString() ?? '',
      path: pathname,
      event_name: 'page_view',
      properties: {
        page_title: document.title,
        previous_path: previousPath,
        referrer,
        utm_source: searchParams.get('utm_source'),
        utm_medium: searchParams.get('utm_medium'),
        utm_campaign: searchParams.get('utm_campaign'),
      },
    });
  }, [isLoading, pathname, user]);

  useEffect(() => {
    if (isLoading || loginChecked.current) return;
    loginChecked.current = true;

    if (!user?.sub) return;

    const attempt = consumeLoginAttempt();
    if (!attempt) return;

    const startedAt = Date.parse(attempt.startedAt);
    const durationMs = Date.now() - startedAt;
    if (!Number.isFinite(startedAt) || durationMs > LOGIN_ATTEMPT_MAX_AGE_MS) return;

    void handleTrackEvent({
      user_id: user.sub.toString(),
      path: pathname,
      event_name: 'login_succeeded',
      properties: {
        source: attempt.source,
        return_path: attempt.path,
        login_started_at: attempt.startedAt,
        login_duration_ms: durationMs,
      },
    });
  }, [isLoading, pathname, user]);

  return null;
}
