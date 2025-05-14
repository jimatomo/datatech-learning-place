import { handleAuth, handleLogin, handleCallback } from '@auth0/nextjs-auth0';

// Auth0のハンドラーを設定
const handler = handleAuth({
  login: async (req) => {
    // URLSearchParamsを使用してクエリパラメータを取得
    const url = new URL(req.url);
    const returnTo = url.searchParams.get('returnTo') || '/';
    
    // handleLoginを使用してログイン処理を行い、リダイレクト先を指定
    return handleLogin(req, {
      returnTo
    });
  },
  callback: async (req) => {
    // コールバック処理を行い、リダイレクト先を指定
    const res = await handleCallback(req, {
      redirectUri: `${process.env.AUTH0_BASE_URL}/api/auth/callback/auth0`,
      afterCallback: (req, session) => {
        return session;
      }
    });
    
    return res;
  }
});

// GETリクエストのハンドラーを設定
export const GET = handler;
// POSTリクエストのハンドラーも設定（必要に応じて）
export const POST = handler; 
