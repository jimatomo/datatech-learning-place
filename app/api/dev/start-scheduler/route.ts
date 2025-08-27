import { NextResponse } from "next/server"
import { getNotificationScheduler } from "@/lib/dev-notification-scheduler"

// 開発環境用：通知スケジューラーを手動で開始するAPI
export async function POST() {
  try {
    if (process.env.NODE_ENV !== 'development') {
      return NextResponse.json(
        { error: "このAPIは開発環境でのみ利用可能です" },
        { status: 403 }
      )
    }

    const scheduler = getNotificationScheduler()
    scheduler.startScheduler()

    return NextResponse.json({
      success: true,
      message: "開発環境用通知スケジューラーを開始しました"
    })

  } catch (error) {
    console.error("スケジューラー開始エラー:", error)
    return NextResponse.json(
      { error: "スケジューラーの開始に失敗しました" },
      { status: 500 }
    )
  }
}

// スケジューラーを停止
export async function DELETE() {
  try {
    if (process.env.NODE_ENV !== 'development') {
      return NextResponse.json(
        { error: "このAPIは開発環境でのみ利用可能です" },
        { status: 403 }
      )
    }

    const scheduler = getNotificationScheduler()
    scheduler.stopScheduler()

    return NextResponse.json({
      success: true,
      message: "開発環境用通知スケジューラーを停止しました"
    })

  } catch (error) {
    console.error("スケジューラー停止エラー:", error)
    return NextResponse.json(
      { error: "スケジューラーの停止に失敗しました" },
      { status: 500 }
    )
  }
}
