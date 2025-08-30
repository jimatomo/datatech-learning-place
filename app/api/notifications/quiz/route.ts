import { NextResponse } from "next/server"
import { processDailyQuizNotifications } from '@/lib/quiz-notification-sender'

export async function POST() {
  try {
    // 主な処理をライブラリ関数に委譲
    const result = await processDailyQuizNotifications()
    
    if (result.success) {
      return NextResponse.json(result)
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "日次クイズ通知のスケジューリングに失敗しました",
        },
        { status: 500 }
      )
    }
    
  } catch (error) {
    console.error("日次クイズ通知スケジューリングエラー:", error)
    
    return NextResponse.json(
      {
        success: false,
        error: "日次クイズ通知のスケジューリングに失敗しました",
      },
      { status: 500 }
    )
  }
}