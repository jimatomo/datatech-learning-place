import { NextRequest, NextResponse } from 'next/server';

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, PutCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { auth0 } from '@/lib/auth0'

export const dynamic = 'force-dynamic';

const client = new DynamoDBClient({ region: 'ap-northeast-1' });
const ddbDocClient = DynamoDBDocumentClient.from(client);

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const quizId = searchParams.get('quizId');

    if (!quizId) {
      return NextResponse.json(
        { error: 'クイズIDは必須です' },
        { status: 400 }
      );
    }

    // userId は外部入力から受け取らず、セッションの sub を唯一の識別子として使用する
    const session = await auth0.getSession();
    const userId = session?.user?.sub;
    if (!userId) {
      // 未ログイン時は「いいねなし」として返す（クライアント側の扱いを簡単にする）
      return NextResponse.json({ Item: null });
    }

    const command = new GetCommand({
      TableName: 'quiz_likes',
      Key: {
        user_id: userId,
        quiz_id: quizId
      }
    });
    const result = await ddbDocClient.send(command);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'いいね状態の取得に失敗しました' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { quizId, like } = await request.json();

    if (!quizId) {
      return NextResponse.json(
        { error: 'クイズIDは必須です' },
        { status: 400 }
      );
    }

    const session = await auth0.getSession();
    const userId = session?.user?.sub;
    if (!userId) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    }

    // 既存のいいねレコードを確認
    const getCommand = new GetCommand({
      TableName: 'quiz_likes',
      Key: {
        user_id: userId,
        quiz_id: quizId
      }
    });
    const existingLike = await ddbDocClient.send(getCommand);

    // いいねを解除する場合（既存のレコードが存在する場合）
    if (existingLike.Item && !like) {
      const deleteCommand = new DeleteCommand({
        TableName: 'quiz_likes',
        Key: {
          user_id: userId,
          quiz_id: quizId
        }
      });
      await ddbDocClient.send(deleteCommand);
      return NextResponse.json({ like: false });
    }

    // いいねを追加する場合
    const putCommand = new PutCommand({
      TableName: 'quiz_likes',
      Item: {
        user_id: userId,
        quiz_id: quizId,
        like: Boolean(like),
        updated_at: new Date().toISOString()
      }
    });
    await ddbDocClient.send(putCommand);
    return NextResponse.json({ like: Boolean(like) });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'いいねの更新に失敗しました' },
      { status: 500 }
    );
  }
} 
