import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: 'ap-northeast-1' });
const ddbDocClient = DynamoDBDocumentClient.from(client);

import { getSession } from '@auth0/nextjs-auth0';

export async function queryLearningTrackers() {
  // ユーザー情報を取得
  const session = await getSession()
  const userId = session?.user?.sub

  // ユーザーの学習トラッカーを取得
  try {
    const result = await ddbDocClient.send(new GetCommand({
      TableName: 'learning_trackers',
      Key: {
      user_id: userId,
      record_type: 'daily_activity_count|v1'
    }
  }));

    return result;
  } catch (error) {
    console.error('Error querying learning trackers:', error);
    return null;
  }
}
