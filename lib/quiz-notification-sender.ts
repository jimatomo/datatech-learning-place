import webpush from "web-push"
import { getSubscribersForTags, reconstructPushSubscription, deleteNotificationSubscription } from '@/lib/notification-db'
import { transformQuizIdToUrl } from '@/contents/quiz'
import path from 'path'
import fs from 'fs'

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
  quizId: string
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

export async function sendQuizNotification(params: QuizNotificationRequest): Promise<QuizNotificationResult> {
  const { quizTitle, quizTags, quizDate, quizId } = params

  if (!quizTitle || !quizTags || !quizDate || !quizId) {
    throw new Error("quizTitle, quizTags, quizDate, quizId は必須です")
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
    return {
      success: true,
      message: "通知対象の購読者が見つかりませんでした",
      notificationsSent: 0,
      errors: 0,
      totalSubscribers: 0,
      eligibleSubscribers: 0,
      currentJSTTime: getJSTNow().toISOString()
    }
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
    return {
      success: true,
      message: "現在の時刻で通知対象の購読者が見つかりませんでした",
      notificationsSent: 0,
      errors: 0,
      totalSubscribers: subscribers.length,
      eligibleSubscribers: 0,
      currentJSTTime: getJSTNow().toISOString()
    }
  }

  let successCount = 0
  let errorCount = 0
  
  for (const subscriber of eligibleSubscribers) {
    try {
      // PushSubscriptionオブジェクトを再構築
      const pushSubscription = reconstructPushSubscription(subscriber)
      
      // 通知用のURLを生成
      const notificationUrl = transformQuizIdToUrl(quizId);
      console.log(`通知URL生成: quizId=${quizId}, generatedUrl=${notificationUrl}`);
      
      await webpush.sendNotification(
        pushSubscription,
        JSON.stringify({
          title: "クイズにチャレンジしましょう！",
          body: quizTitle,
          icon: "/icon-192x192.png",
          badge: "/icon-192x192.png",
          data: {
            url: notificationUrl,
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

  return {
    success: true,
    message: "クイズ通知を送信しました",
    notificationsSent: successCount,
    errors: errorCount,
    totalSubscribers: subscribers.length,
    eligibleSubscribers: eligibleSubscribers.length,
    currentJSTTime: getJSTNow().toISOString()
  }
}

// クイズファイルの内容を解析してメタデータを取得する関数
async function getQuizMetadata(filePath: string) {
  try {
    // ファイルパスからクイズIDを生成（既存のライブラリを使用）
    const fileName = path.basename(filePath, '.tsx')
    const filePathParts = filePath.split(path.sep)
    
    // パスから年、月、日を抽出
    // より堅牢な方法：quizディレクトリを探してその後の部分を取得
    const quizIndex = filePathParts.findIndex(part => part === 'quiz');
    if (quizIndex === -1) {
      console.error('quizディレクトリが見つかりません:', filePath);
      return null;
    }
    
    const year = filePathParts[quizIndex + 1];
    const month = filePathParts[quizIndex + 2];
    const day = fileName
    
    console.log('ファイルパス解析:', {
      filePath,
      fileName,
      filePathParts,
      year,
      month,
      day,
      pathLength: filePathParts.length
    });
    
    // 既存のgenerateQuizId関数のロジックに合わせてIDを生成
    // パスから日付部分を抽出してIDを生成
    const id = `Q${year}${month}${day}`
    
    console.log('生成されたID:', id);
    
    // ファイルの内容を読み込み
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    
    // 既存のQuizクラスの構造に合わせてメタデータを抽出
    const titleMatch = fileContent.match(/title:\s*['"`]([^'"`]+)['"`]/)
    const tagsMatch = fileContent.match(/tags:\s*\[([^\]]+)\]/)
    const createdAtMatch = fileContent.match(/created_at:\s*new\s+Date\(['"`]([^'"`]+)['"`]\)/)
    
    if (!titleMatch) {
      console.log(`クイズファイルのメタデータが不完全: ${filePath}`)
      return null
    }
    
    const title = titleMatch[1]
    const tags = tagsMatch ? tagsMatch[1].split(',').map(tag => tag.trim().replace(/['"`]/g, '')) : []
    const created_at = createdAtMatch ? new Date(createdAtMatch[1]) : new Date()
    
    return {
      id,
      title,
      tags,
      created_at,
      file_path: filePath
    }
  } catch (error) {
    console.error(`クイズファイルの読み込みエラー: ${filePath}`, error)
    return null
  }
}

// 今日作成されたクイズをチェックする関数
async function getTodaysQuizzes() {
  const today = getJSTNow() // JST基準で今日の日付を取得
  const year = today.getFullYear()
  const month = (today.getMonth() + 1).toString().padStart(2, '0')
  const day = today.getDate().toString().padStart(2, '0')
  
  console.log('今日の日付情報:', { year, month, day, today: today.toISOString() });
  
  const quizDir = path.join(process.cwd(), 'contents', 'quiz', year.toString(), month)
  const quizFilePath = path.join(quizDir, `${day}.tsx`)
  
  console.log('クイズファイルパス:', {
    quizDir,
    quizFilePath,
    cwd: process.cwd()
  });
  
  // ファイルが存在するかチェック
  if (!fs.existsSync(quizFilePath)) {
    console.log('クイズファイルが存在しません:', quizFilePath);
    return []
  }
  
  console.log('クイズファイルが見つかりました:', quizFilePath);
  
  try {
    // クイズメタデータを取得
    const metadata = await getQuizMetadata(quizFilePath)
    
    if (metadata) {
      console.log('取得されたメタデータ:', metadata);
      return [metadata]
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
    quizId: string
    success: boolean
    message: string
  }>
  currentJSTTime: string
}> {
  const jstNow = getJSTNow()
  console.log('日次クイズ通知スケジューリング開始:', {
    currentJSTTime: jstNow.toISOString(),
    currentJSTLocal: new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })
  })
  
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
      // 直接ライブラリ関数を呼び出し
      const result = await sendQuizNotification({
        quizTitle: quiz.title,
        quizTags: quiz.tags,
        quizDate: quiz.created_at.toISOString().split('T')[0],
        quizId: quiz.id
      })
      
      notificationResults.push({
        quizId: quiz.id,
        success: result.success,
        message: result.message
      })
      
    } catch (error) {
      console.error(`クイズ ${quiz.id} の通知送信エラー:`, error)
      notificationResults.push({
        quizId: quiz.id,
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
