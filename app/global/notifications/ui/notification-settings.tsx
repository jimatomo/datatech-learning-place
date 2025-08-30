import { getSession } from '@auth0/nextjs-auth0'
import { getNotificationSettingsPure, updateNotificationSettings } from '@/lib/notification-db'
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
    } catch (error) {
      console.error('通知設定の取得エラー:', error)
    }
  }

  // サーバーサイドでの通知設定更新処理
  async function updateSettingsOnServer(newSettings: {
    enabled: boolean;
    selectedTags: string[];
    notificationTime: string;
  }) {
    'use server'
    
    if (!userId) {
      return { success: false, error: "認証が必要です" }
    }

    try {
      // DynamoDBの設定を更新
      const dbSettings = {
        enabled: newSettings.enabled,
        selected_tags: newSettings.selectedTags,
        notification_time: newSettings.notificationTime
      }
      
      const success = await updateNotificationSettings(userId, dbSettings)
      
      if (!success) {
        return { success: false, error: "通知設定の更新に失敗しました" }
      }

      return { success: true }
    } catch (error) {
      console.error("通知設定の更新エラー:", error)
      return { success: false, error: "通知設定の更新に失敗しました" }
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

