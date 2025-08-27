import { NextResponse } from "next/server"
import webpush from "web-push"
import { getSession } from '@auth0/nextjs-auth0'
import { getNotificationSubscription } from '@/lib/notification-db'

// VAPIDの設定
webpush.setVapidDetails(
  "mailto:support@datatech-learning-place.net",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
)

export async function POST(request: Request) {
  try {
    // ユーザー情報を取得
    const session = await getSession()
    const userId = session?.user?.sub

    if (!userId) {
      return NextResponse.json(
        { error: "認証が必要です" },
        { status: 401 }
      )
    }

    // リクエストボディからsubscriptionを取得
    const body = await request.json()
    const { subscription } = body

    if (!subscription) {
      return NextResponse.json(
        { error: "subscription が必要です" },
        { status: 400 }
      )
    }

    // まずDynamoDBから設定を確認（設定が保存されているかチェック）
    const subscriptionData = await getNotificationSubscription(userId)
    
    // DynamoDBに設定がない場合でも、リクエストで送信されたsubscriptionでテスト通知を送信
    if (!subscriptionData) {
      console.log("DynamoDBに設定がありませんが、リクエストのsubscriptionでテスト通知を送信します")
    } else if (!subscriptionData.enabled) {
      return NextResponse.json(
        { error: "通知設定が無効になっています" },
        { status: 400 }
      )
    }

    // JST（日本標準時）での現在時刻を取得
    const getJSTNow = (): Date => {
      const now = new Date();
      return new Date(now.getTime() + (9 * 60 * 60 * 1000));
    }
    
    const jstNow = getJSTNow()
    
    // テスト通知の送信
    await webpush.sendNotification(
      subscription,
      JSON.stringify({
        title: "📚 DTLP テスト通知",
        body: `通知設定が正常に動作しています！現在時刻: ${new Date().toLocaleTimeString('ja-JP', { timeZone: 'Asia/Tokyo' })}`,
        icon: "/icon-192x192.png",
        badge: "/icon-192x192.png",
        data: {
          url: "/",
          testTime: jstNow.toISOString()
        }
      })
    )

    return NextResponse.json({ 
      success: true,
      message: "テスト通知を送信しました"
    })
  } catch (error) {
    console.error("テスト通知の送信エラー:", error)

    const status =
      error instanceof webpush.WebPushError ? error.statusCode : 500

    return NextResponse.json(
      {
        success: false,
        error: "テスト通知の送信に失敗しました",
      },
      { status }
    )
  }
}

