import { NextResponse } from 'next/server';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { getSession } from '@auth0/nextjs-auth0';

export const dynamic = 'force-dynamic';

const client = new DynamoDBClient({ region: 'ap-northeast-1' });
const ddbDocClient = DynamoDBDocumentClient.from(client);

export async function GET() {
  try {
    // セッションからユーザーIDを取得
    const session = await getSession();
    const userId = session?.user?.sub;

    if (!userId) {
      return NextResponse.json(
        { error: '認証が必要です' },
        { status: 401 }
      );
    }

    // GSIを使ってuser_idでクエリ
    const command = new QueryCommand({
      TableName: 'quiz_likes',
      IndexName: 'user_id-quiz_id-index', // GSIの名前
      KeyConditionExpression: 'user_id = :userId',
      ExpressionAttributeValues: {
        ':userId': userId,
      },
    });

    const result = await ddbDocClient.send(command);
    const likedQuizzes = result.Items || [];

    return NextResponse.json({ 
      quizzes: likedQuizzes.map(item => ({
        quiz_id: item.quiz_id,
        updated_at: item.updated_at
      }))
    });

  } catch (error) {
    console.error('Error fetching liked quizzes:', error);
    return NextResponse.json(
      { error: 'いいねしたクイズの取得に失敗しました' },
      { status: 500 }
    );
  }
}
