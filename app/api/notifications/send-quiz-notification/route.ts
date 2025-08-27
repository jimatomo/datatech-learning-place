import { NextResponse } from "next/server"
import webpush from "web-push"
import { getSubscribersForTags, reconstructPushSubscription, deleteNotificationSubscription } from '@/lib/notification-db'

// VAPIDの設定
webpush.setVapidDetails(
  "mailto:support@datatech-learning-place.net",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
)

interface NotificationRequest {
  quizTitle: string
  quizTags: string[]
  quizDate: string
  quizId: string
}

// JST（日本標準時）での現在時刻を取得
function getJSTNow(): Date {
  const now = new Date();
  // UTC+9時間でJSTに変換
  return new Date(now.getTime() + (9 * 60 * 60 * 1000));
}

// 通知時刻をチェックする関数
function shouldSendNotificationNow(notificationTime: string): boolean {
  const now = getJSTNow();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  const [targetHour, targetMinute] = notificationTime.split(':').map(Number);
  
  // 現在時刻が設定時刻と一致するかチェック（±5分の許容範囲）
  const currentTimeInMinutes = currentHour * 60 + currentMinute;
  const targetTimeInMinutes = targetHour * 60 + targetMinute;
  const timeDifference = Math.abs(currentTimeInMinutes - targetTimeInMinutes);
  
  return timeDifference <= 5; // 5分以内なら送信可能
}

export async function POST(request: Request) {
  try {
    const body: NotificationRequest = await request.json()
    const { quizTitle, quizTags, quizDate, quizId } = body

    if (!quizTitle || !quizTags || !quizDate || !quizId) {
      return NextResponse.json(
        { error: "quizTitle, quizTags, quizDate, quizId は必須です" },
        { status: 400 }
      )
    }

    console.log("クイズ通知を送信します:", {
      title: quizTitle,
      tags: quizTags,
      date: quizDate,
      id: quizId,
      currentJSTTime: getJSTNow().toISOString()
    })

    // DynamoDBから対象の購読者を取得
    const subscribers = await getSubscribersForTags(quizTags)
    
    if (subscribers.length === 0) {
      return NextResponse.json({ 
        success: true,
        message: "通知対象の購読者が見つかりませんでした",
        notificationsSent: 0
      })
    }

    // 時刻チェックを行い、送信対象の購読者をフィルタリング
    const eligibleSubscribers = subscribers.filter(subscriber => {
      const shouldSend = shouldSendNotificationNow(subscriber.notification_time);
      if (!shouldSend) {
        console.log(`時刻外のため通知をスキップ: ${subscriber.user_id}, 設定時刻: ${subscriber.notification_time}, 現在時刻: ${new Date().toLocaleTimeString('ja-JP', { timeZone: 'Asia/Tokyo' })}`);
      }
      return shouldSend;
    });

    if (eligibleSubscribers.length === 0) {
      return NextResponse.json({ 
        success: true,
        message: "現在の時刻で通知対象の購読者が見つかりませんでした",
        notificationsSent: 0,
        totalSubscribers: subscribers.length,
        currentJSTTime: getJSTNow().toISOString()
      })
    }

    let successCount = 0
    let errorCount = 0
    
    for (const subscriber of eligibleSubscribers) {
      try {
        // PushSubscriptionオブジェクトを再構築
        const pushSubscription = reconstructPushSubscription(subscriber)
        
        await webpush.sendNotification(
          pushSubscription,
          JSON.stringify({
            title: "📚 新しいクイズが投稿されました",
            body: `${quizTitle} - タグ: ${quizTags.join(", ")}`,
            icon: "/icon-192x192.png",
            badge: "/icon-192x192.png",
            data: {
              url: `/quiz/${quizId}`,
              quizId: quizId,
              tags: quizTags
            }
          })
        )
        
        successCount++
        console.log(`通知送信成功: ${subscriber.user_id}`)
        
      } catch (error) {
        errorCount++
        console.error(`個別通知送信エラー (${subscriber.user_id}):`, error)
        
        // 410 Gone エラーの場合は無効なサブスクリプションなので削除を検討
        if (error instanceof webpush.WebPushError && error.statusCode === 410) {
          console.log(`無効なサブスクリプションを検出: ${subscriber.user_id}`)
          // 無効なサブスクリプションをDynamoDBから削除
          try {
            const deleteSuccess = await deleteNotificationSubscription(subscriber.user_id)
            if (deleteSuccess) {
              console.log(`無効なサブスクリプション削除完了: ${subscriber.user_id}`)
            }
          } catch (deleteError) {
            console.error(`無効なサブスクリプション削除エラー: ${subscriber.user_id}`, deleteError)
          }
        }
      }
    }

    return NextResponse.json({ 
      success: true,
      message: "クイズ通知を送信しました",
      notificationsSent: successCount,
      errors: errorCount,
      totalSubscribers: subscribers.length,
      eligibleSubscribers: eligibleSubscribers.length,
      currentJSTTime: getJSTNow().toISOString()
    })
  } catch (error) {
    console.error("クイズ通知の送信エラー:", error)

    return NextResponse.json(
      {
        success: false,
        error: "クイズ通知の送信に失敗しました",
      },
      { status: 500 }
    )
  }
}

