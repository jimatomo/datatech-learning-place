import { getSession } from '@auth0/nextjs-auth0'
import { getNotificationSettings } from '@/app/global/notifications/lib/notification-db'
import { updateNotificationSettingsAction } from '@/app/global/notifications/lib/notification-actions'
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
      const result = await getNotificationSettings(userId)
      
      if (result.success && result.hasSubscription && result.settings) {
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

  return (
    <NotificationSettingsClient 
      className={className} 
      initialSettings={settings}
      userId={userId}
      updateSettingsOnServer={updateNotificationSettingsAction}
    />
  )
}

