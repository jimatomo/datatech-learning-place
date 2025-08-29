import { getSession } from '@auth0/nextjs-auth0'
import { getNotificationSettingsPure } from '@/lib/notification-db'
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

  return (
    <NotificationSettingsClient 
      className={className} 
      initialSettings={settings}
      userId={userId}
    />
  )
}

