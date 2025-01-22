import { NextRequest, NextResponse } from 'next/server';

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';

import { getSession } from '@auth0/nextjs-auth0';

const client = new DynamoDBClient({});
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

    const session = await getSession();
    const userId = session?.user?.sub;

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
