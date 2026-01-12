"use client"

import { useEffect } from "react"
import { getUsableServiceWorkerRegistration } from "@/app/notifications/lib/service-worker"

export function NotificationBadgeClearer() {
  useEffect(() => {
    // 通知ページにアクセスした際にバッジをクリア
    const clearBadge = async () => {
      try {
        if ('serviceWorker' in navigator) {
          const registration = await getUsableServiceWorkerRegistration({ timeoutMs: 30000, swUrl: "/sw.js", scope: "/" })
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
