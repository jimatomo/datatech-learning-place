// クイズ通知の送信を行うファイル
import webpush from "web-push"
import path from 'path'
import {
  getSubscribersForNotificationTime,
  filterSubscribersByTags,
  reconstructPushSubscription,
  updateNotificationSettings,
} from '@/app/notifications/lib/notification-db'
import { getQuizFiles } from '@/app/quiz/lib/get-files'
import { getPathInfos } from '@/app/quiz/lib/get-path-info'

// VAPIDの設定
webpush.setVapidDetails(
  "mailto:support@datatech-learning-place.net",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
)

export interface QuizNotificationRequest {
  quizTitle: string
  quizTags: string[]
  quizDate: string
  quizPath: string
}

export interface QuizNotificationResult {
  success: boolean
  message: string
  notificationsSent: number
  errors: number
  totalSubscribers: number
  eligibleSubscribers: number
  currentJSTTime: string
}

// JST（日本標準時）での現在時刻を取得
function getJSTNow(): Date {
  const now = new Date();
  // UTC+9時間でJSTに変換
  return new Date(now.getTime() + (9 * 60 * 60 * 1000));
}

// クイズ通知のリクエストを受け取り、クイズ通知を送信する処理を呼び出す関数
export async function sendQuizNotification(params: QuizNotificationRequest): Promise<QuizNotificationResult> {
  const { quizTitle, quizTags, quizDate, quizPath } = params

  if (!quizTitle || !quizTags || !quizDate || !quizPath) {
    throw new Error("quizTitle, quizTags, quizDate, quizPath は必須です")
  }

  // 現在の時刻に一番近い10分間隔の時間を生成する
  const currentTime = getJSTNow()
  const minutes = currentTime.getMinutes()
  const roundedMinutes = Math.round(minutes / 10) * 10

  const roundedTime = getJSTNow()
  roundedTime.setMinutes(roundedMinutes, 0, 0) // 秒とミリ秒を0にリセット
  
  // HH:mm形式で時間を生成
  const hours = roundedTime.getHours().toString().padStart(2, '0')
  const mins = roundedTime.getMinutes().toString().padStart(2, '0')
  const currentTime10Minutes = `${hours}:${mins}`

  // DynamoDBから対象の購読者を取得（時間をベースにクエリ）
  const subscribers = await getSubscribersForNotificationTime(currentTime10Minutes)
  
  if (subscribers.length === 0) {
    return {
      success: true,
      message: "通知対象の購読者が見つかりませんでした",
      notificationsSent: 0,
      errors: 0,
      totalSubscribers: subscribers.length,
      eligibleSubscribers: 0,
      currentJSTTime: getJSTNow().toISOString()
    }
  }

  // タグで絞り込みを行い、最終的な送信対象の購読者を決定
  const eligibleSubscribers = filterSubscribersByTags(subscribers, quizTags);

  if (eligibleSubscribers.length === 0) {
    return {
      success: true,
      message: "現在の時刻で通知対象の購読者が見つかりませんでした",
      notificationsSent: 0,
      errors: 0,
      totalSubscribers: subscribers.length,
      eligibleSubscribers: eligibleSubscribers.length,
      currentJSTTime: getJSTNow().toISOString()
    }
  }

  let successCount = 0
  let errorCount = 0
  
  for (const subscriber of eligibleSubscribers) {
    try {
      // PushSubscriptionオブジェクトを再構築
      const pushSubscription = reconstructPushSubscription(subscriber)

      // デバッグ用にログを出力
      console.log('📢 通知送信対象:', subscriber.user_id)
      
      await webpush.sendNotification(
        pushSubscription,
        JSON.stringify({
          title: "クイズにチャレンジしましょう！",
          body: quizTitle,
          icon: "/logo_square.png",
          badge: "/logo_square.png",
          data: {
            url: `/quiz/${quizPath}`,
            tags: quizTags,
            quizDate: quizDate,
            timestamp: getJSTNow().toISOString()
          }
        })
      )
      
      successCount++
      
    } catch (error) {
      errorCount++
      console.error(`個別通知送信エラー (${subscriber.user_id}):`, error)
      
      // 410 Gone エラーの場合は無効なサブスクリプションなので無効化を検討
      if (error instanceof webpush.WebPushError && error.statusCode === 410) {
        // 無効なサブスクリプションを無効化（削除ではなく既読扱い）
        try {
          // サブスクリプションを無効化（enabled: false）
          await updateNotificationSettings(subscriber.user_id, {
            enabled: false,
            selected_tags: subscriber.selected_tags,
            notification_time: subscriber.notification_time
          })
          console.log(`無効なサブスクリプションを無効化しました: ${subscriber.user_id}`)
        } catch (updateError) {
          console.error(`無効なサブスクリプション無効化エラー: ${subscriber.user_id}`, updateError)
        }
      }
    }
  }

  return {
    success: true,
    message: `クイズ通知を送信しました（タグ: ${quizTags.join(', ')}）`,
    notificationsSent: successCount,
    errors: errorCount,
    totalSubscribers: subscribers.length,
    eligibleSubscribers: eligibleSubscribers.length,
    currentJSTTime: getJSTNow().toISOString()
  }
}



// 今日作成されたクイズをチェックする関数
async function getTodaysQuizzes() {
  const today = getJSTNow() // JST基準で今日の日付を取得
  const year = today.getFullYear()
  const month = (today.getMonth() + 1).toString().padStart(2, '0')
  const day = today.getDate().toString().padStart(2, '0')
  
  // console.log('今日の日付情報:', { year, month, day, today: today.toISOString() });
  
  // クイズディレクトリのパスを取得 (contents/quiz)
  const quizDir = path.join(process.cwd(), 'contents', 'quiz')
  
  // getQuizFilesを使用してファイル名ソートで最新の14件のクイズファイルを取得
  const quizFiles = await getQuizFiles({
    dir: quizDir,
    limit_count: 14
  })
  
  try {
    // getPathInfosを使用してクイズのメタデータを取得
    const pathInfos = await getPathInfos(quizFiles, [], true, null)
    
    if (pathInfos.length > 0) {
      // created_atが今日の日付になっているクイズを取得
      const todayQuizInfo = pathInfos.filter(info => info.created_at && info.created_at.toISOString().split('T')[0] === `${year}-${month}-${day}`)
      
      // console.log('取得されたメタデータ:', todayQuizInfo);
      return todayQuizInfo
    }
  } catch (error) {
    console.error('クイズメタデータの取得エラー:', error)
  }
  
  return []
}

// 日次クイズ通知のメイン処理
export async function processDailyQuizNotifications(): Promise<{
  success: boolean
  message: string
  quizzesFound: number
  notificationResults: Array<{
    quizPath: string
    success: boolean
    message: string
  }>
  currentJSTTime: string
}> {
  const jstNow = getJSTNow()
  // console.log('日次クイズ通知スケジューリング開始:', {
  //   currentJSTTime: jstNow.toISOString(),
  //   currentJSTLocal: new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })
  // })
  
  // 今日作成されたクイズを取得
  const todaysQuizzes = await getTodaysQuizzes()
  
  if (todaysQuizzes.length === 0) {
    return {
      success: true,
      message: "今日作成されたクイズはありません",
      quizzesFound: 0,
      notificationResults: [],
      currentJSTTime: jstNow.toISOString()
    }
  }
  
  // 各クイズについて通知をスケジュール
  const notificationResults = []
  
  for (const quiz of todaysQuizzes) {
    try {
      // クイズ通知対象を取得し、クイズ通知を送信する関数を呼び出す
      const result = await sendQuizNotification({
        quizTitle: quiz.title,
        quizTags: quiz.tags,
        quizDate: quiz.created_at?.toISOString().split('T')[0] || '',
        quizPath: quiz.path
      })
      
      notificationResults.push({
        quizPath: quiz.path,
        success: result.success,
        message: result.message,
        notificationsSent: result.notificationsSent,
        errors: result.errors,
        totalSubscribers: result.totalSubscribers,
        eligibleSubscribers: result.eligibleSubscribers,
        currentJSTTime: result.currentJSTTime
      })
      
    } catch (error) {
      console.error(`クイズ ${quiz.path} の通知送信エラー:`, error)
      notificationResults.push({
        quizPath: quiz.path,
        success: false,
        message: "通知送信に失敗しました"
      })
    }
  }
  
  return {
    success: true,
    message: "日次クイズ通知のスケジューリングが完了しました",
    quizzesFound: todaysQuizzes.length,
    notificationResults: notificationResults,
    currentJSTTime: getJSTNow().toISOString()
  }
}
