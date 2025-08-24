import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: 'ap-northeast-1' });
const ddbDocClient = DynamoDBDocumentClient.from(client);

export async function getInitialCorrectRate(quizId: string) {
  try {
    const result = await ddbDocClient.send(new GetCommand({
      TableName: 'quiz_informations',
      Key: {
        quiz_id: quizId,
        record_type: 'first_answer_correct_rate'
      }
    }));

    return result;
  } catch (error) {
    console.error("Failed to get initial correct rate:", error);
    return null;
  }
}
