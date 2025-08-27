import { NextResponse } from "next/server"
import { getSession } from '@auth0/nextjs-auth0'
import { deleteNotificationSubscription } from '@/lib/notification-db'

export async function POST() {
  try {
    // ユーザー情報を取得
    const session = await getSession()
    const userId = session?.user?.sub

    if (!userId) {
      return NextResponse.json(
        { error: "認証が必要です" },
        { status: 400 }
      )
    }


    // DynamoDBから削除
    const success = await deleteNotificationSubscription(userId)

    if (!success) {
      return NextResponse.json(
        { error: "通知設定の削除に失敗しました" },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true,
      message: "通知の解除が完了しました"
    })
  } catch (error) {
    console.error("プッシュ通知の解除エラー:", error)

    return NextResponse.json(
      {
        success: false,
        error: "通知の解除に失敗しました",
      },
      { status: 500 }
    )
  }
}

