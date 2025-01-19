import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

export async function getQuizLike(userId: string, quizId: string) {
  try {
    const result = await ddbDocClient.send(new GetCommand({
      TableName: 'quiz_likes',
      Key: {
        quiz_id: quizId,
        user_id: userId,
      }
    }));
    return result;
  } catch (error) {
    console.error("Failed to get quiz like:", error);
    return null;
  }
}
