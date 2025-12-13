import { NextRequest, NextResponse } from 'next/server';

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';

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

    const session = await auth0.getSession();
    const userId = session?.user?.sub;

    // ユーザーがログインしていない場合は、空の結果を返して終了
    if (!userId) {
      return NextResponse.json({ Item: null });
    }

    const command = new GetCommand({
      TableName: 'quiz_results',
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
