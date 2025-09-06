'use client'

import { useUser } from '@auth0/nextjs-auth0/client';
import { usePathname } from 'next/navigation';

export function AuthStatus() {
  const { user, isLoading } = useUser();
  const pathname = usePathname();

  if (isLoading) return null;

  if (!user) {
    const loginUrl = `/api/auth/login?returnTo=${pathname}`;
    return (
      <div>
        <a href={loginUrl}
          className="inline-flex items-center justify-center
            text-xs sm:text-sm rounded-md h-9 px-3 py-2 text-nowrap
            hover:bg-primary/75 bg-primary text-primary-foreground"
        >
          Sign in
        </a>
      </div>
    );
  }

  return null;
}
