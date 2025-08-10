import { NextRequest, NextResponse } from 'next/server';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { getSession } from '@auth0/nextjs-auth0';

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

function sanitizeFeedback(input: unknown): string {
  if (typeof input !== 'string') return '';
  // 制御文字の除去、正規化、HTMLタグの除去
  const withoutControl = input.replace(/[\u0000-\u001F\u007F]/g, '');
  const normalized = withoutControl.normalize('NFKC');
  const withoutTags = normalized.replace(/<[^>]*>/g, '');
  // 末尾前後の空白を除去し、長すぎる連続空白は1つに圧縮（改行は残す）
  const collapsedSpaces = withoutTags.replace(/[ \t\f\v]+/g, ' ').trim();
  return collapsedSpaces;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { quizId, message } = body || {};

    const content = sanitizeFeedback(message);

    if (!quizId || !content) {
      return NextResponse.json({ error: 'quizId と message は必須です' }, { status: 400 });
    }
    if (content.length > 1000) {
      return NextResponse.json({ error: 'message は 1000 文字以内にしてください' }, { status: 400 });
    }

    const session = await getSession();
    const userId: string | null = session?.user?.sub ?? null;

    const nowIso = new Date().toISOString();
    const rand = Math.random().toString(36).slice(2, 8);
    const userPart = userId ? userId : 'anonymous';
    const recordType = `feedback|v1|${userPart}|${Date.now()}|${rand}`;

    const item: Record<string, unknown> = {
      quiz_id: String(quizId),
      record_type: recordType,
      message: content,
      created_at: nowIso,
    };
    if (userId) {
      item.user_id = userId;
    }

    const putCommand = new PutCommand({
      TableName: 'quiz_informations',
      Item: item,
    });
    await ddbDocClient.send(putCommand);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[feedback] save error', error);
    return NextResponse.json({ error: '保存に失敗しました' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const quizId = searchParams.get('quizId');
    const limitParam = searchParams.get('limit');
    const limit = Math.min(Math.max(Number(limitParam ?? '20') || 20, 1), 100);

    if (!quizId) {
      return NextResponse.json({ error: 'quizId is required' }, { status: 400 });
    }

    const prefix = 'feedback|v1|';
    let items: any[] = [];
    let lastEvaluatedKey: Record<string, unknown> | undefined = undefined;

    while (items.length < limit) {
      const command = new QueryCommand({
        TableName: 'quiz_informations',
        KeyConditionExpression: 'quiz_id = :quizId AND begins_with(#rt, :prefix)',
        ExpressionAttributeNames: { '#rt': 'record_type' },
        ExpressionAttributeValues: { ':quizId': quizId, ':prefix': prefix },
        ExclusiveStartKey: lastEvaluatedKey as any,
        Limit: Math.min(100, limit - items.length),
      });
      const result = await ddbDocClient.send(command);
      items = items.concat(result.Items ?? []);
      lastEvaluatedKey = result.LastEvaluatedKey as any;
      if (!lastEvaluatedKey) break;
    }

    // created_at の降順で並び替えし、limit 件に絞る
    const messages = (items as any[])
      .map((it) => ({
        message: String(it.message ?? ''),
        created_at: typeof it.created_at === 'string' ? it.created_at : undefined,
        user_id: typeof it.user_id === 'string' ? it.user_id : undefined,
      }))
      .filter((m) => m.message)
      .sort((a, b) => (b.created_at ?? '').localeCompare(a.created_at ?? ''))
      .slice(0, limit);

    return NextResponse.json({ messages });
  } catch (error) {
    console.error('[feedback] list error', error);
    return NextResponse.json({ error: '取得に失敗しました' }, { status: 500 });
  }
}


