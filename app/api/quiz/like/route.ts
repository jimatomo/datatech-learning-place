import { NextRequest, NextResponse } from 'next/server';

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, PutCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';

export const dynamic = 'force-dynamic';

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const quizId = searchParams.get('quizId');
    const userId = searchParams.get('userId');

    if (!quizId || !userId) {
      return NextResponse.json(
        { error: 'クイズIDとユーザーIDは必須です' },
        { status: 400 }
      );
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
    const { quizId, userId, like } = await request.json();

    if (!quizId || !userId) {
      return NextResponse.json(
        { error: 'クイズIDとユーザーIDは必須です' },
        { status: 400 }
      );
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
        like: like,
        updated_at: new Date().toISOString()
      }
    });
    await ddbDocClient.send(putCommand);
    return NextResponse.json({ like: like });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'いいねの更新に失敗しました' },
      { status: 500 }
    );
  }
} 
