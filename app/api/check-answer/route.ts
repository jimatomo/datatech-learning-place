import { NextResponse } from 'next/server'
import { getQuizById } from '@/app/quiz/lib/get-quid-by-id'
import { Quiz } from '@/contents/quiz'

export async function POST(request: Request) {
  const data = await request.json();
  
  // ここで data が null でないことを確認
  if (!data || !data.quizId || !data.selectedOptions) {
    return new Response(JSON.stringify({ error: '無効なデータ' }), { status: 400 });
  }

  const { quizId, selectedOptions } = data;
  
  // DBやキャッシュから正解と解説を取得
  const quiz : Quiz = await getQuizById(quizId)

  // ロジックとして正しいかチェック
  const isCorrect = quiz.getAnswers().every((answer: number) => 
    selectedOptions.includes(answer)
  )

  console.log(`quizId: ${quizId}, selectedOptions: ${selectedOptions}, isCorrect: ${isCorrect}`)
  
  return NextResponse.json({
    isCorrect,
    explanation: quiz.getExplanation(),
    explanationJsx: typeof quiz.getExplanationJsx === 'function' ? quiz.getExplanationJsx() : null
  })
} 


