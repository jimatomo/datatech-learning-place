import { useEffect, useState } from "react"

// グローバルウィンドウオブジェクトの型拡張
declare global {
  interface Window {
    updateServiceWorker?: () => Promise<void>
  }
}

export interface NotificationSettings {
  enabled: boolean
  selectedTags: string[]
  notificationTime: string // HH:MM format
}

interface UseNotificationManagerProps {
  initialSettings?: NotificationSettings
  updateSettingsOnServer?: (settings: NotificationSettings & {
    subscription?: {
      endpoint: string;
      keys: {
        p256dh: string;
        auth: string;
      };
    };
    action: 'update' | 'subscribe' | 'unsubscribe';
  }) => Promise<{ success: boolean; error?: string }>
}

export function useNotificationManager({ initialSettings, updateSettingsOnServer }: UseNotificationManagerProps = {}) {
  const [isSupported, setIsSupported] = useState(false)
  const [subscription, setSubscription] = useState<PushSubscription | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [settings, setSettings] = useState<NotificationSettings>(
    initialSettings || {
      enabled: false,
      selectedTags: [],
      notificationTime: "09:00"
    }
  )

  // 初期設定が変更された場合に状態を更新
  useEffect(() => {
    if (initialSettings) {
      setSettings(initialSettings)
    }
  }, [initialSettings])

  // Service Workerの登録
  const registerServiceWorker = async () => {
    try {
      // カスタムService Workerを登録
      const registration = await navigator.serviceWorker.register("/custom-sw.js", {
        scope: "/",
        updateViaCache: "none",
      })
      
      // Service Workerの更新をチェック
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // 新しいService Workerが利用可能
              console.log('新しいService Workerが利用可能です')
            }
          })
        }
      })
      
      // 手動更新機能を追加
      const updateServiceWorker = async () => {
        try {
          console.log('Service Workerを手動更新中...')
          
          // 強制的にキャッシュをバイパスして更新
          await registration.update()
          
          // 更新後、ページをリロードして新しいService Workerを有効化
          if (registration.waiting) {
            registration.waiting.postMessage({ action: 'skipWaiting' })
            window.location.reload()
          }
          
          console.log('Service Workerの更新が完了しました')
        } catch (error) {
          console.error('Service Workerの更新に失敗:', error)
        }
      }
      
      // グローバルに更新関数を公開（デバッグ用）
      if (typeof window !== 'undefined') {
        window.updateServiceWorker = updateServiceWorker
      }
      
      const sub = await registration.pushManager.getSubscription()
      setSubscription(sub)
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      }
    }
  }

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true)
      registerServiceWorker()
    }
  }, [])

  // 設定を状態に保存（サーバー同期は各API呼び出しで行う）
  const saveSettings = (newSettings: NotificationSettings) => {
    setSettings(newSettings)
  }

  // Base64文字列をUint8Arrayに変換
  function urlBase64ToUint8Array(base64String: string) {
    try {
      const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
      const base64 = (base64String + padding)
        .replace(/-/g, "+")
        .replace(/_/g, "/")

      const rawData = window.atob(base64)
      const outputArray = new Uint8Array(rawData.length)

      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i)
      }
      return outputArray
    } catch (error) {
      console.error('VAPID公開キーのデコードエラー:', error)
      throw new Error('VAPID公開キーの形式が正しくありません')
    }
  }

  // 通知の購読
  const subscribeToPush = async () => {
    try {
      // 通知許可を要求（ブラウザの共通機能）
      const permission = await Notification.requestPermission()
      if (permission !== "granted") {
        throw new Error("通知の許可が得られませんでした")
      }

      // VAPID公開キーの存在チェック
      const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
      if (!vapidPublicKey) {
        throw new Error('VAPID公開キーが設定されていません')
      }

      // Service Worker の準備
      const registration = await navigator.serviceWorker.ready

      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
      })
      setSubscription(sub)

      // サーバーサイドでの処理に統一するため、ここでは状態のみ更新
      // 実際のデータベース操作はサーバーコンポーネントで行う
      if (updateSettingsOnServer) {
        await updateSettingsOnServer({
          ...settings,
          action: 'subscribe',
          subscription: {
            endpoint: sub.endpoint,
            keys: {
              p256dh: btoa(String.fromCharCode(...new Uint8Array(sub.getKey('p256dh')!))),
              auth: btoa(String.fromCharCode(...new Uint8Array(sub.getKey('auth')!)))
            }
          }
        })
      }

      return true
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      }
      return false
    }
  }

  // 通知の購読解除
  const unsubscribeFromPush = async () => {
    try {
      if (!subscription) return

      // サーバーサイドでの処理に統一するため、ここでは状態のみ更新
      // 実際のデータベース操作はサーバーコンポーネントで行う
      if (updateSettingsOnServer) {
        await updateSettingsOnServer({
          ...settings,
          action: 'unsubscribe'
        })
      }

      await subscription.unsubscribe()
      setSubscription(null)
      
      // 設定も無効化
      saveSettings({ ...settings, enabled: false })
      
      return true
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      }
      return false
    }
  }

  // 設定の更新
  const updateSettings = async (newSettings: NotificationSettings) => {
    try {
      saveSettings(newSettings)
      
      // 通知が有効で購読していない場合は購読
      if (newSettings.enabled && !subscription) {
        const subscribeSuccess = await subscribeToPush()
        if (!subscribeSuccess) {
          return false
        }
      }
      
      // 通知が無効で購読している場合は解除
      if (!newSettings.enabled && subscription) {
        const unsubscribeSuccess = await unsubscribeFromPush()
        if (!unsubscribeSuccess) {
          return false
        }
      }
      
      // サーバーサイドでの処理に統一するため、ここでは状態のみ更新
      // 実際のデータベース操作はサーバーコンポーネントで行う
      if (updateSettingsOnServer && subscription && newSettings.enabled) {
        await updateSettingsOnServer({
          ...newSettings,
          action: 'update',
          subscription: {
            endpoint: subscription.endpoint,
            keys: {
              p256dh: btoa(String.fromCharCode(...new Uint8Array(subscription.getKey('p256dh')!))),
              auth: btoa(String.fromCharCode(...new Uint8Array(subscription.getKey('auth')!)))
            }
          }
        })
      }
      
      return true
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      }
      return false
    }
  }

  // 完全なunsubscribe（設定とレコードを完全削除）
  const completeUnsubscribe = async () => {
    try {
      // 現在のPush購読を解除
      if (subscription) {
        await subscription.unsubscribe()
        setSubscription(null)
      }
      
      // サーバーサイドで完全削除
      if (updateSettingsOnServer) {
        await updateSettingsOnServer({
          enabled: false,
          selectedTags: [],
          notificationTime: "09:00",
          action: 'unsubscribe'
        })
      }
      
      // クライアント側の状態をデフォルトにリセット
      setSettings({
        enabled: false,
        selectedTags: [],
        notificationTime: "09:00"
      })
      
      setError(null)
      return true
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      }
      return false
    }
  }



  return {
    isSupported,
    subscription,
    settings,
    error,
    setError,
    setSettings,
    setSubscription,
    subscribeToPush,
    unsubscribeFromPush,
    updateSettings,
    completeUnsubscribe,
  }
}
