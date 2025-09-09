"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function NotificationBell() {
  const [unreadCount, setUnreadCount] = useState(0)
  const [mounted, setMounted] = useState(false)

  // クライアントサイドでのみ実行
  useEffect(() => {
    setMounted(true)
    
    // 未読通知数を取得
    const getBadgeCount = async (): Promise<number> => {
      try {
        if ('serviceWorker' in navigator) {
          const registration = await navigator.serviceWorker.ready
          if (registration.active) {
            return new Promise((resolve) => {
              const channel = new MessageChannel()
              channel.port1.onmessage = (event) => {
                const count = event.data.badgeCount || 0
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

    // 初期読み込み時に未読数を取得
    getBadgeCount().then(setUnreadCount)

    // Service Workerからのメッセージを監視（バッジ数更新）
    if ('serviceWorker' in navigator) {
      const handleMessage = (event: MessageEvent) => {
        if (event.data && event.data.type === 'BADGE_UPDATE') {
          setUnreadCount(event.data.count || 0)
        }
      }
      
      navigator.serviceWorker.addEventListener('message', handleMessage)
      
      return () => {
        navigator.serviceWorker.removeEventListener('message', handleMessage)
      }
    }
  }, [])

  // ページ表示時とフォーカス時にバッジ数を更新
  useEffect(() => {
    const updateBadgeCount = async () => {
      if ('serviceWorker' in navigator) {
        try {
          const registration = await navigator.serviceWorker.ready
          if (registration.active) {
            const channel = new MessageChannel()
            channel.port1.onmessage = (event) => {
              const count = event.data.badgeCount || 0
              setUnreadCount(count)
            }
            registration.active.postMessage({ action: 'getBadgeCount' }, [channel.port2])
          }
        } catch (error) {
          console.warn('バッジ数更新に失敗:', error)
        }
      }
    }

    // ページフォーカス時に更新
    const handleFocus = () => updateBadgeCount()
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        updateBadgeCount()
      }
    }

    window.addEventListener('focus', handleFocus)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('focus', handleFocus)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Link href="/notifications" className="relative">
      <Button variant="ghost" size="sm" className="relative">
        <Bell className="h-[1.2rem] w-[1.2rem]" />
        {unreadCount > 0 && (
          <Badge 
            variant="destructive" 
            className={cn(
              "absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs",
              "min-w-[1.25rem] rounded-full"
            )}
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </Badge>
        )}
      </Button>
    </Link>
  )
}
