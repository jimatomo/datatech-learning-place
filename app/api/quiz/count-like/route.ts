import { NextRequest, NextResponse } from 'next/server';

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, QueryCommand } from '@aws-sdk/lib-dynamodb';

export const dynamic = 'force-dynamic';

const client = new DynamoDBClient({ region: 'ap-northeast-1' });
const ddbDocClient = DynamoDBDocumentClient.from(client);

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const quizId = searchParams.get('quizId');

    if (!quizId) {
      return NextResponse.json(
        { error: 'quizId is required' },
        { status: 400 }
      );
    }

    const command = new QueryCommand({
      TableName: 'quiz_likes',
      KeyConditionExpression: 'quiz_id = :quizId',
      ExpressionAttributeValues: {
        ':quizId': quizId,
      },
    });
    const result = await ddbDocClient.send(command);
    const count = result.Items?.length || 0;

    return NextResponse.json({ count });

  } catch (error) {
    console.error('Error counting likes:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
