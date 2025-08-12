import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

export async function queryLikedQuizzes(userId: string) {
  try {
    const command = new QueryCommand({
      TableName: 'quiz_likes',
      IndexName: 'user_id-quiz_id-index', // GSIの名前
      KeyConditionExpression: 'user_id = :userId',
      ExpressionAttributeValues: {
        ':userId': userId,
      },
    });

    const result = await ddbDocClient.send(command);
    return result.Items || [];
  } catch (error) {
    console.error("Failed to get liked quizzes:", error);
    return [];
  }
}
