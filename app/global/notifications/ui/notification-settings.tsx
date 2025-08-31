import { getSession } from '@auth0/nextjs-auth0'
import { 
  getNotificationSettingsPure, 
  updateNotificationSettings, 
  saveNotificationSubscription,
  deleteNotificationSubscription
} from '@/app/global/notifications/lib/notification-db'
import { NotificationSettingsClient } from './notification-settings-client'

interface NotificationSettingsProps {
  className?: string
}

export async function NotificationSettingsComponent({ className }: NotificationSettingsProps) {
  // サーバーサイドでユーザー情報と通知設定を取得
  const session = await getSession()
  const userId = session?.user?.sub

  let settings = {
    enabled: false,
    selectedTags: [] as string[],
    notificationTime: "09:00"
  }

  if (userId) {
    try {
      console.log('通知設定取得開始:', { userId })
      const result = await getNotificationSettingsPure(userId)
      console.log('通知設定取得結果:', result)
      
      if (result && result.hasSubscription && result.settings) {
        settings = {
          enabled: result.settings.enabled,
          selectedTags: result.settings.selectedTags,
          notificationTime: result.settings.notificationTime
        }
        console.log('通知設定を適用:', settings)
      } else {
        console.log('通知設定が存在しないため、デフォルト値を使用')
      }
      // 通知設定が存在しない場合は、デフォルト値を使用（enabled: false, selectedTags: [], notificationTime: "09:00"）
    } catch (error) {
      console.error('通知設定の取得エラー:', error)
    }
  } else {
    console.log('ユーザーIDが取得できませんでした')
  }

  // サーバーサイドでの通知設定更新処理（統合版）
  async function updateSettingsOnServer(newSettings: {
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
  }) {
    'use server'
    
    console.log('サーバーアクション開始:', { userId, action: newSettings.action, hasSubscription: !!newSettings.subscription })
    
    if (!userId) {
      console.error('認証エラー: userIdがありません')
      return { success: false, error: "認証が必要です" }
    }

    try {
      const dbSettings = {
        enabled: newSettings.enabled,
        selected_tags: newSettings.selectedTags,
        notification_time: newSettings.notificationTime
      }

      console.log('DB設定:', dbSettings)

      let success = false

      switch (newSettings.action) {
        case 'subscribe':
          if (newSettings.subscription) {
            console.log('購読処理開始')
            // 新規購読
            success = await saveNotificationSubscription(
              userId,
              newSettings.subscription,
              dbSettings
            )
            console.log('購読処理結果:', success)
          } else {
            console.error('購読情報がありません')
            return { success: false, error: "購読情報がありません" }
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
        const errorMessage = `通知設定の${newSettings.action === 'subscribe' ? '購読' : newSettings.action === 'unsubscribe' ? '解除' : '更新'}に失敗しました`
        console.error(errorMessage)
        return { 
          success: false, 
          error: errorMessage
        }
      }

      console.log('処理成功')
      return { success: true }
    } catch (error) {
      console.error("通知設定の処理エラー:", error)
      return { 
        success: false, 
        error: `通知設定の処理に失敗しました: ${error instanceof Error ? error.message : '不明なエラー'}` 
      }
    }
  }

  return (
    <NotificationSettingsClient 
      className={className} 
      initialSettings={settings}
      userId={userId}
      updateSettingsOnServer={updateSettingsOnServer}
    />
  )
}

