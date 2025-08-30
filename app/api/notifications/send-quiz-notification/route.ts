import { NextResponse } from "next/server"
import { sendQuizNotification, QuizNotificationRequest } from '@/lib/quiz-notification-sender'

export async function POST(request: Request) {
  try {
    const body: QuizNotificationRequest = await request.json()

    const result = await sendQuizNotification(body)

    return NextResponse.json(result)
  } catch (error) {
    console.error("クイズ通知の送信エラー:", error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "クイズ通知の送信に失敗しました",
      },
      { status: 500 }
    )
  }
}