"use client"

import { useEffect } from "react"

export function NotificationBadgeClearer() {
  useEffect(() => {
    // 通知ページにアクセスした際にバッジをクリア
    const clearBadge = async () => {
      try {
        if ('serviceWorker' in navigator) {
          const registration = await navigator.serviceWorker.ready
          if (registration.active) {
            registration.active.postMessage({ action: 'clearBadge' })
            console.log('通知ページアクセスによりバッジをクリアしました')
          }
        }
      } catch (error) {
        console.warn('バッジクリアに失敗:', error)
      }
    }

    clearBadge()
  }, [])

  return null // UIを表示しない
}
