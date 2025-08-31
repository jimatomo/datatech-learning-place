import { getSession } from '@auth0/nextjs-auth0'
import { getNotificationSettingsPure } from '@/app/global/notifications/lib/notification-db'
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

  return (
    <NotificationSettingsClient 
      className={className} 
      initialSettings={settings}
      userId={userId}
      updateSettingsOnServer={updateNotificationSettingsAction}
    />
  )
}

