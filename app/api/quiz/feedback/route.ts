import { NextRequest, NextResponse } from 'next/server';

// モックAPI: 受け取った内容をログに出して200を返すだけ
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { quizId, message } = body || {};
    if (!quizId || !message || !String(message).trim()) {
      return NextResponse.json({ error: 'quizId と message は必須です' }, { status: 400 });
    }
    console.log('[mock-feedback]', { quizId, messageLength: String(message).length });
    // 将来的にここで DynamoDB に保存する
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'invalid request' }, { status: 400 });
  }
}


