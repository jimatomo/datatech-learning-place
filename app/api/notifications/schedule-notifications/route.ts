import { NextResponse } from "next/server"

interface ScheduleNotificationRequest {
  quizData: {
    title: string
    tags: string[]
    date: string
    id: string
  }
}

export async function POST(request: Request) {
  try {
    const body: ScheduleNotificationRequest = await request.json()
    const { quizData } = body

    if (!quizData) {
      return NextResponse.json(
        { error: "quizData は必須です" },
        { status: 400 }
      )
    }

    // シンプルに即座に通知を送信
    console.log(`クイズ通知を送信します:`, {
      quiz: quizData,
      message: `「${quizData.title}」の通知を送信`
    })

    // 通知送信APIを呼び出し
    const notificationResponse = await fetch(
      `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/notifications/send-quiz-notification`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quizTitle: quizData.title,
          quizTags: quizData.tags,
          quizDate: quizData.date,
          quizId: quizData.id
        })
      }
    )
    
    const result = await notificationResponse.json()
    
    return NextResponse.json({
      success: result.success,
      message: result.message || "通知を送信しました",
      notificationsSent: result.notificationsSent,
      errors: result.errors,
      totalSubscribers: result.totalSubscribers
    })

  } catch (error) {
    console.error("通知送信エラー:", error)

    return NextResponse.json(
      {
        success: false,
        error: "通知の送信に失敗しました",
      },
      { status: 500 }
    )
  }
}

