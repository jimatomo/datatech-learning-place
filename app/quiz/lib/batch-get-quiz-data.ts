import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, BatchGetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: 'ap-northeast-1' });
const ddbDocClient = DynamoDBDocumentClient.from(client);

// BatchGetItemの最大アイテム数（全テーブル合計で100が上限）
// 2テーブル同時取得のため、各テーブル50アイテムずつ
const BATCH_SIZE = 50;

export interface QuizResultItem {
  user_id: string;
  quiz_id: string;
  is_correct: string;
}

export interface QuizLikeItem {
  user_id: string;
  quiz_id: string;
  like: boolean;
}

export interface BatchQuizData {
  results: Map<string, QuizResultItem>;
  likes: Map<string, QuizLikeItem>;
}

/**
 * 複数のクイズの結果といいねを一括取得
 */
export async function batchGetQuizData(
  userId: string,
  quizIds: string[]
): Promise<BatchQuizData> {
  if (quizIds.length === 0) {
    return { results: new Map(), likes: new Map() };
  }

  const results = new Map<string, QuizResultItem>();
  const likes = new Map<string, QuizLikeItem>();

  // quizIdsをBATCH_SIZEごとに分割して処理
  for (let i = 0; i < quizIds.length; i += BATCH_SIZE) {
    const batchQuizIds = quizIds.slice(i, i + BATCH_SIZE);
    
    try {
      const response = await ddbDocClient.send(new BatchGetCommand({
        RequestItems: {
          'quiz_results': {
            Keys: batchQuizIds.map(quizId => ({
              user_id: userId,
              quiz_id: quizId
            }))
          },
          'quiz_likes': {
            Keys: batchQuizIds.map(quizId => ({
              user_id: userId,
              quiz_id: quizId
            }))
          }
        }
      }));

      // quiz_resultsの結果をMapに格納
      const quizResults = response.Responses?.['quiz_results'] || [];
      for (const item of quizResults) {
        results.set(item.quiz_id, item as QuizResultItem);
      }

      // quiz_likesの結果をMapに格納
      const quizLikes = response.Responses?.['quiz_likes'] || [];
      for (const item of quizLikes) {
        likes.set(item.quiz_id, item as QuizLikeItem);
      }

      // UnprocessedKeysがある場合は再試行（簡易実装）
      if (response.UnprocessedKeys && Object.keys(response.UnprocessedKeys).length > 0) {
        console.warn('Some keys were not processed in batch get');
      }
    } catch (error) {
      console.error("Failed to batch get quiz data:", error);
    }
  }

  return { results, likes };
}
