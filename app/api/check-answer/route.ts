import { NextResponse } from 'next/server'
import { getQuizById } from '@/app/quiz/lib/get-quid-by-id'
import { Quiz } from '@/contents/quiz'
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

export async function POST(request: Request) {
  const data = await request.json();
  
  // ここで data が null でないことを確認
  if (!data || !data.quizId || !data.selectedOptions) {
    return new Response(JSON.stringify({ error: '無効なデータ' }), { status: 400 });
  }

  const { quizId, selectedOptions, userEmail } = data;
  
  // DBやキャッシュから正解と解説を取得
  const quiz : Quiz = await getQuizById(quizId)

  const correctAnswers = quiz.getAnswers()

  // 正解かどうかチェック
  const isCorrect = correctAnswers.every((answer: number) => 
    selectedOptions.includes(answer)
  )

  // 回答結果をDynamoDBに保存（ログインしているユーザのみ）
  if (userEmail) {
    saveQuizResult(
      userEmail,
      quizId,
      isCorrect,
      selectedOptions
    ).catch(error => {
      console.error("Failed to save quiz result:", error);
    });
  }

  // 結果を返す
  return NextResponse.json({
    selectedOptions: data.selectedOptions,
    correctAnswers: correctAnswers,
    isCorrect,
    explanation: quiz.getExplanation(),
    explanationJsx: typeof quiz.getExplanationJsx === 'function' ? quiz.getExplanationJsx() : null
  })
} 

async function saveQuizResult(
  userEmail: string | null | undefined,
  quizId: string,
  isCorrect: boolean,
  selectedOptions: string[],
) {
  // DynamoDBに保存するデータを作成
  const params = {
    TableName: 'quiz_results',
    Item: {
      user_email: userEmail,
      quiz_id: quizId,
      is_correct: isCorrect.toString(),
      selected_options: selectedOptions.join(','),
      answered_at: new Date().toISOString()
    }
  };

  // TODO:DynamoDBに保存
  try {
    const data = await ddbDocClient.send(new PutCommand(params));
    console.log('result : ' + JSON.stringify(data));
  } catch (error) {
    console.error("Error saving quiz result:", error);
  }
}
