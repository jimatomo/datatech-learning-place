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
      const result = await getNotificationSettingsPure(userId)
      
      if (result && result.hasSubscription && result.settings) {
        settings = {
          enabled: result.settings.enabled,
          selectedTags: result.settings.selectedTags,
          notificationTime: result.settings.notificationTime
        }
      }
      // 通知設定が存在しない場合は、デフォルト値を使用（enabled: false, selectedTags: [], notificationTime: "09:00"）
    } catch (error) {
      console.error('通知設定の取得エラー:', error)
    }
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
    
    if (!userId) {
      return { success: false, error: "認証が必要です" }
    }

    try {
      const dbSettings = {
        enabled: newSettings.enabled,
        selected_tags: newSettings.selectedTags,
        notification_time: newSettings.notificationTime
      }

      let success = false

      switch (newSettings.action) {
        case 'subscribe':
          if (newSettings.subscription) {
            // 新規購読
            success = await saveNotificationSubscription(
              userId,
              newSettings.subscription,
              dbSettings
            )
          }
          break

        case 'unsubscribe':
          // 購読解除
          success = await deleteNotificationSubscription(userId)
          break

        case 'update':
        default:
          // 設定更新
          success = await updateNotificationSettings(userId, dbSettings)
          break
      }
      
      if (!success) {
        return { 
          success: false, 
          error: `通知設定の${newSettings.action === 'subscribe' ? '購読' : newSettings.action === 'unsubscribe' ? '解除' : '更新'}に失敗しました` 
        }
      }

      return { success: true }
    } catch (error) {
      console.error("通知設定の処理エラー:", error)
      return { 
        success: false, 
        error: "通知設定の処理に失敗しました" 
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

