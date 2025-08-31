'use server'

import { getSession } from '@auth0/nextjs-auth0'
import { 
  saveNotificationSubscription,
  updateNotificationSettings,
  deleteNotificationSubscription
} from './notification-db'

export interface NotificationActionRequest {
  enabled: boolean;
  selectedTags: string[];
  notificationTime: string;
  subscription?: {
    endpoint: string;
    keys: {
      p256dh: string;
      auth: string;
    };
  };
  action: 'update' | 'subscribe' | 'unsubscribe';
}

export interface NotificationActionResponse {
  success: boolean;
  error?: string;
}

export async function updateNotificationSettingsAction(request: NotificationActionRequest): Promise<NotificationActionResponse> {
  console.log('=== サーバーアクション開始 ===')
  console.log('リクエストデータ:', JSON.stringify(request, null, 2))
  
  try {
    console.log('サーバーアクション開始:', { action: request.action, hasSubscription: !!request.subscription })
    
    // セッションからユーザーIDを取得
    console.log('セッション取得開始')
    const session = await getSession()
    console.log('セッション取得完了:', { hasSession: !!session, userSub: session?.user?.sub })
    
    const userId = session?.user?.sub
    
    if (!userId) {
      console.error('認証エラー: userIdがありません')
      const errorResponse = { success: false, error: "認証が必要です" }
      console.log('エラーレスポンス:', errorResponse)
      return errorResponse
    }

    console.log('ユーザーID:', userId)

    const dbSettings = {
      enabled: request.enabled,
      selected_tags: request.selectedTags,
      notification_time: request.notificationTime
    }

    console.log('DB設定:', dbSettings)

    let success = false

    switch (request.action) {
      case 'subscribe':
        if (request.subscription) {
          console.log('購読処理開始')
          // 新規購読
          success = await saveNotificationSubscription(
            userId,
            request.subscription,
            dbSettings
          )
          console.log('購読処理結果:', success)
        } else {
          console.error('購読情報がありません')
          const errorResponse = { success: false, error: "購読情報がありません" }
          console.log('エラーレスポンス:', errorResponse)
          return errorResponse
        }
        break

      case 'unsubscribe':
        console.log('購読解除処理開始')
        // 購読解除
        success = await deleteNotificationSubscription(userId)
        console.log('購読解除処理結果:', success)
        break

      case 'update':
      default:
        console.log('設定更新処理開始')
        // 設定更新
        success = await updateNotificationSettings(userId, dbSettings)
        console.log('設定更新処理結果:', success)
        break
    }
    
    if (!success) {
      const errorMessage = `通知設定の${request.action === 'subscribe' ? '購読' : request.action === 'unsubscribe' ? '解除' : '更新'}に失敗しました`
      console.error(errorMessage)
      const errorResponse = { success: false, error: errorMessage }
      console.log('エラーレスポンス:', errorResponse)
      return errorResponse
    }

    console.log('処理成功')
    const successResponse = { success: true }
    console.log('成功レスポンス:', successResponse)
    return successResponse
  } catch (error) {
    console.error("通知設定の処理エラー:", error)
    const errorResponse = { 
      success: false, 
      error: `通知設定の処理に失敗しました: ${error instanceof Error ? error.message : '不明なエラー'}` 
    }
    console.log('例外エラーレスポンス:', errorResponse)
    return errorResponse
  } finally {
    console.log('=== サーバーアクション終了 ===')
  }
}
