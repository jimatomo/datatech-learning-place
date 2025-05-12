'use client'

import { useUser } from '@auth0/nextjs-auth0/client';

export function AuthStatus() {
  const { user, isLoading } = useUser();

  if (isLoading) return null;

  if (!user) {
    return (
      <div>
        <a href="/api/auth/login"
          className="inline-flex items-center justify-center
            text-sm rounded-md h-9 px-3 py-2
            hover:bg-primary/75 bg-primary text-primary-foreground"
        >
          Sign in
        </a>
      </div>
    );
  }

  return null;
}
