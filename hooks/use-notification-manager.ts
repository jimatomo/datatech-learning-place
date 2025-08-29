import { useEffect, useState } from "react"

export interface NotificationSettings {
  enabled: boolean
  selectedTags: string[]
  notificationTime: string // HH:MM format
}

interface UseNotificationManagerProps {
  initialSettings?: NotificationSettings
}

export function useNotificationManager({ initialSettings }: UseNotificationManagerProps = {}) {
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
      console.log('useNotificationManager - 初期設定を適用:', initialSettings)
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
  }

  // 通知の購読
  const subscribeToPush = async () => {
    try {
      // 通知許可を要求
      const permission = await Notification.requestPermission()
      if (permission !== "granted") {
        throw new Error("通知の許可が得られませんでした")
      }

      const registration = await navigator.serviceWorker.ready

      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
        ),
      })
      setSubscription(sub)

      // サーバーにサブスクリプション情報を送信
      await fetch("/api/notifications/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subscription: sub,
          settings: settings
        }),
      })

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

      // サーバーからサブスクリプション情報を削除
      await fetch("/api/notifications/unsubscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subscription: subscription
        }),
      })

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
      
      // 購読中の場合は設定をサーバーに更新
      if (subscription && newSettings.enabled) {
        const response = await fetch("/api/notifications/update-settings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subscription: subscription,
            settings: newSettings
          }),
        })
        
        if (!response.ok) {
          // サーバーに設定がない場合は、新規登録として扱う
          if (response.status === 404 || response.status === 500) {
            console.log("サーバーに設定がないため、新規登録します")
            const subscribeResponse = await fetch("/api/notifications/subscribe", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                subscription: subscription,
                settings: newSettings
              }),
            })
            
            if (!subscribeResponse.ok) {
              throw new Error("設定の保存に失敗しました")
            }
          } else {
            throw new Error("設定の更新に失敗しました")
          }
        }
      }
      
      return true
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      }
      return false
    }
  }

  // テスト通知の送信
  const sendTestNotification = async () => {
    try {
      if (!subscription) {
        throw new Error("通知の購読が必要です")
      }

      const response = await fetch("/api/notifications/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subscription: subscription,
        }),
      })

      if (!response.ok) {
        const result = await response.json()
        throw new Error(result.error || "テスト通知の送信に失敗しました")
      }

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
    subscribeToPush,
    unsubscribeFromPush,
    updateSettings,
    sendTestNotification,
  }
}
