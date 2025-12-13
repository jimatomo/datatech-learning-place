import { auth0 } from "@/lib/auth0";

const ALLOWED_PATHS = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/callback",
  "/api/auth/profile",
  "/api/auth/access-token",
]);

async function handler(req) {
  const { pathname } = new URL(req.url);
  if (!ALLOWED_PATHS.has(pathname)) {
    return new Response("Not Found", { status: 404 });
  }

  // Auth0 SDK は GET 以外(例: HEAD)で NextResponse.next() を返すことがあり、
  // Next.js App Route では NextResponse.next() がサポートされず 500 になる。
  // そのため HEAD は GET と同等に処理して安全にリダイレクト/204 を返す。
  if (req.method === "HEAD") {
    const getReq = new Request(req.url, { method: "GET", headers: req.headers });
    return auth0.middleware(getReq);
  }

  if (req.method !== "GET" && req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  return auth0.middleware(req);
}

export const GET = handler;
export const POST = handler;
export const HEAD = handler;
