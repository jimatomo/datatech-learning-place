import withSerwist from "@serwist/next";
// 通知スケジューラーは本番環境ではrun.shで初期化されるため、これはローカル開発時のみコメントアウトする
// import { NotificationScheduler } from './app/notifications/lib/notification-scheduler.js';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  env: {
    // Auth0 SDK v4 (client) が参照するルートを、このアプリの /api/auth/* に合わせる
    NEXT_PUBLIC_PROFILE_ROUTE: '/api/auth/profile',
    NEXT_PUBLIC_ACCESS_TOKEN_ROUTE: '/api/auth/access-token',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'datatech-learning-place.net',
      },
    ],
  },
  // Server Actionsのセキュリティ設定
  experimental: {
    serverActions: {
      allowedOrigins: [
        'datatech-learning-place.net',
        'uccqrxjd84.execute-api.ap-northeast-1.amazonaws.com',
        // 環境変数から追加のオリジンを取得
        ...(process.env.SERVER_ACTIONS_ALLOWED_ORIGINS 
          ? process.env.SERVER_ACTIONS_ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
          : []
        )
      ],
    },
  },
};

// 注意: 通知スケジューラーの初期化は本番環境ではrun.shで行われるため、
// ここでは実行しない（開発環境でのみnext.config.mjsで実行される場合がある）
// if (typeof window === 'undefined') {
//   console.log('サーバー起動時の処理を実行中...')
//   new NotificationScheduler()
// }

const serwistConfig = withSerwist({
  // Serwist + Next は Turbopack 未対応のため、基本は production のみ有効化するのが安全
  disable: process.env.NODE_ENV !== "production",
  swSrc: "serwist/sw.ts",
  swDest: "public/sw.js",
  swUrl: "/sw.js",
  register: true,
  // public 配下を precache に含める（旧next-pwa相当）
  globPublicPatterns: ["**/*"],
});

export default serwistConfig(nextConfig);
