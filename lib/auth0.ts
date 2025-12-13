import { Auth0Client } from "@auth0/nextjs-auth0/server";

/**
 * Auth0 SDK v4 用のサーバー側クライアント。
 * 既存の `/api/auth/*` ルートを維持しつつ、v3系の環境変数も極力互換で扱う。
 */
export const auth0 = new Auth0Client({
  appBaseUrl: process.env.APP_BASE_URL ?? process.env.AUTH0_BASE_URL,
  domain:
    process.env.AUTH0_DOMAIN ??
    process.env.AUTH0_ISSUER_BASE_URL?.replace(/^https?:\/\//, ""),
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  secret: process.env.AUTH0_SECRET,
  // Google等のソーシャルログインでは、OIDC logout だけだとIdP側セッションが残り
  // すぐ再ログインされることがあるため、federated logout が効く v2/logout を優先する。
  logoutStrategy: "v2",
  // 環境変数(AUTH0_COOKIE_PATH等)でcookie pathが変わっていると、
  // /api/auth/logout の Set-Cookie でセッションCookieが消えず「ログアウトできない」症状になる。
  // 明示的に "/" に固定して、作成・削除の両方を一致させる。
  session: {
    cookie: {
      // SDK v4用の新しいクッキー名。古いappSessionは middleware.ts で削除する。
      name: "__session",
      path: "/",
    },
  },
  transactionCookie: {
    path: "/",
  },
  // 未ログイン時に /api/auth/profile を 401 ではなく 204(No Content) にする。
  // Auth0 v4のuseUser()は204を「未ログイン」として扱うが、401はError("Unauthorized")になる。
  noContentProfileResponseWhenUnauthenticated: true,
  routes: {
    login: "/api/auth/login",
    logout: "/api/auth/logout",
    callback: "/api/auth/callback",
  },
});


