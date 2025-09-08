import { useEffect, useState } from "react"

// グローバルウィンドウオブジェクトの型拡張
declare global {
  interface Window {
    updateServiceWorker?: () => Promise<void>
  }
  interface ServiceWorkerRegistration {
    _updateListenerAdded?: boolean
  }
  interface Navigator {
    setAppBadge?: (contents?: number) => Promise<void>
    clearAppBadge?: () => Promise<void>
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
  const [badgeCount, setBadgeCount] = useState(0)
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

  // Service Workerの登録（最適化版）
  const registerServiceWorker = async () => {
    try {
      // 既存のService Workerをチェック
      const existingRegistration = await navigator.serviceWorker.getRegistration()
      let registration = existingRegistration
      
      if (!existingRegistration) {
        // カスタムService Workerを登録
        registration = await navigator.serviceWorker.register("/custom-sw.js", {
          scope: "/",
          updateViaCache: "none",
        })
      }
      
      if (!registration) {
        throw new Error('Service Worker の登録に失敗しました')
      }
      
      // Service Workerの更新をチェック（一度だけ設定）
      if (!registration._updateListenerAdded) {
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('新しいService Workerが利用可能です')
              }
            })
          }
        })
        registration._updateListenerAdded = true
      }
      
      // 手動更新機能を追加（グローバルに一度だけ設定）
      if (typeof window !== 'undefined' && !window.updateServiceWorker) {
        const updateServiceWorker = async () => {
          try {
            console.log('Service Workerを手動更新中...')
            await registration.update()
            
            if (registration.waiting) {
              registration.waiting.postMessage({ action: 'skipWaiting' })
              window.location.reload()
            }
            
            console.log('Service Workerの更新が完了しました')
          } catch (error) {
            console.error('Service Workerの更新に失敗:', error)
          }
        }
        
        window.updateServiceWorker = updateServiceWorker
      }
      
      // プッシュサブスクリプションの取得を非同期で実行
      setTimeout(async () => {
        try {
          const sub = await registration.pushManager.getSubscription()
          setSubscription(sub)
        } catch (error) {
          console.warn('プッシュサブスクリプションの取得に失敗:', error)
        }
      }, 100)
      
    } catch (error) {
      console.error('Service Worker登録エラー:', error)
      if (error instanceof Error) {
        setError(error.message)
      }
    }
  }

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true)
      // Service Workerの登録を遅延実行してUIブロックを防ぐ
      setTimeout(() => {
        registerServiceWorker()
      }, 0)
    }
  }, []) // 初回マウント時のみ実行

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

  // バッジをクリア
  const clearBadge = async () => {
    try {
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.ready
        if (registration.active) {
          registration.active.postMessage({ action: 'clearBadge' })
          setBadgeCount(0)
        }
      }
      
      // 直接Badge APIを使用する場合のフォールバック
      if ('clearAppBadge' in navigator) {
        await navigator.clearAppBadge?.()
      }
      
      return true
    } catch (error) {
      console.warn('バッジクリアに失敗:', error)
      return false
    }
  }

  // バッジ数を取得
  const getBadgeCount = async (): Promise<number> => {
    try {
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.ready
        if (registration.active) {
          return new Promise((resolve) => {
            const channel = new MessageChannel()
            channel.port1.onmessage = (event) => {
              const count = event.data.badgeCount || 0
              setBadgeCount(count)
              resolve(count)
            }
            registration.active!.postMessage({ action: 'getBadgeCount' }, [channel.port2])
          })
        }
      }
      return 0
    } catch (error) {
      console.warn('バッジ数取得に失敗:', error)
      return 0
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
      
      // バッジもクリア
      await clearBadge()
      
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



  // アプリがアクティブになった時にバッジを初期化
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // アプリがアクティブになったらバッジをクリア
        clearBadge()
      }
    }

    const handleFocus = () => {
      // ウィンドウがフォーカスされたらバッジをクリア
      clearBadge()
    }

    // 初回マウント時にバッジ数を取得
    if (isSupported) {
      getBadgeCount()
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('focus', handleFocus)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('focus', handleFocus)
    }
  }, [isSupported])

  return {
    isSupported,
    subscription,
    settings,
    error,
    badgeCount,
    setError,
    setSettings,
    setSubscription,
    subscribeToPush,
    unsubscribeFromPush,
    updateSettings,
    completeUnsubscribe,
    clearBadge,
    getBadgeCount,
  }
}
