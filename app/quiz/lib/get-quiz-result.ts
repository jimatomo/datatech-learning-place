import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: 'ap-northeast-1' });
const ddbDocClient = DynamoDBDocumentClient.from(client);

export async function getQuizResult(userId: string, quizId: string) {
  try {
    const result = await ddbDocClient.send(new GetCommand({
      TableName: 'quiz_results',
      Key: { user_id: userId, quiz_id: quizId }
    }));
    return result;
  } catch (error) {
    console.error("Failed to get quiz result:", error);
    return null;
  }
}
