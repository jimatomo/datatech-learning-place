'use client'

import { useEffect, useState } from "react"
import { useNotificationManager } from "@/app/notifications/lib/use-notification-manager"
import { Bell, Clock, Trash2, CheckCheck, Check } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface NotificationItem {
  id: string
  title: string
  body: string
  timestamp: number
  read: boolean
  url?: string
  quizId?: string
  icon?: string
}

// IndexedDB操作のヘルパー関数
const DB_NAME = 'NotificationHistoryDB'
const DB_VERSION = 1
const STORE_NAME = 'notifications'

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)
    
    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)
    
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' })
        store.createIndex('timestamp', 'timestamp', { unique: false })
      }
    }
  })
}

const getNotificationsFromIndexedDB = async (): Promise<NotificationItem[]> => {
  try {
    const db = await openDB()
    const transaction = db.transaction([STORE_NAME], 'readonly')
    const store = transaction.objectStore(STORE_NAME)
    const index = store.index('timestamp')
    
    return new Promise((resolve, reject) => {
      const request = index.openCursor(null, 'prev') // 新しい順にソート
      const notifications: NotificationItem[] = []
      
      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest).result
        if (cursor) {
          notifications.push(cursor.value)
          cursor.continue()
        } else {
          resolve(notifications)
        }
      }
      
      request.onerror = () => reject(request.error)
    })
  } catch (error) {
    console.error('IndexedDBからの通知取得エラー:', error)
    return []
  }
}


const updateNotificationInIndexedDB = async (id: string, updates: Partial<NotificationItem>): Promise<void> => {
  try {
    const db = await openDB()
    const transaction = db.transaction([STORE_NAME], 'readwrite')
    const store = transaction.objectStore(STORE_NAME)
    
    const getRequest = store.get(id)
    getRequest.onsuccess = () => {
      const notification = getRequest.result
      if (notification) {
        const updatedNotification = { ...notification, ...updates }
        store.put(updatedNotification)
      }
    }
  } catch (error) {
    console.error('IndexedDBの通知更新エラー:', error)
  }
}

const deleteNotificationFromIndexedDB = async (id: string): Promise<void> => {
  try {
    const db = await openDB()
    const transaction = db.transaction([STORE_NAME], 'readwrite')
    const store = transaction.objectStore(STORE_NAME)
    await store.delete(id)
  } catch (error) {
    console.error('IndexedDBからの通知削除エラー:', error)
  }
}

const clearAllNotificationsFromIndexedDB = async (): Promise<void> => {
  try {
    const db = await openDB()
    const transaction = db.transaction([STORE_NAME], 'readwrite')
    const store = transaction.objectStore(STORE_NAME)
    await store.clear()
  } catch (error) {
    console.error('IndexedDBの全通知削除エラー:', error)
  }
}

export function NotificationHistoryClient() {
  const { clearBadge } = useNotificationManager()
  const [notifications, setNotifications] = useState<NotificationItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // ページ読み込み時にバッジをクリア
  useEffect(() => {
    const clearBadgeOnLoad = async () => {
      try {
        await clearBadge()
        console.log('通知履歴ページでバッジをクリアしました')
      } catch (error) {
        console.error('バッジクリアに失敗:', error)
      }
    }
    
    clearBadgeOnLoad()
  }, [clearBadge])

  // 通知履歴を取得
  useEffect(() => {
    const loadNotifications = async () => {
      setIsLoading(true)
      
      try {
        const notifications = await getNotificationsFromIndexedDB()
        setNotifications(notifications)
      } catch (error) {
        console.error('通知履歴の取得に失敗:', error)
        setNotifications([])
      } finally {
        setIsLoading(false)
      }
    }
    
    loadNotifications()
  }, [])

  const markAsRead = async (id: string) => {
    try {
      await updateNotificationInIndexedDB(id, { read: true })
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === id 
            ? { ...notification, read: true }
            : notification
        )
      )
    } catch (error) {
      console.error('既読マークの更新に失敗:', error)
    }
  }

  const markAllAsRead = async () => {
    try {
      const unreadNotifications = notifications.filter(n => !n.read)
      for (const notification of unreadNotifications) {
        await updateNotificationInIndexedDB(notification.id, { read: true })
      }
      setNotifications(prev => 
        prev.map(notification => ({ ...notification, read: true }))
      )
    } catch (error) {
      console.error('全既読マークの更新に失敗:', error)
    }
  }

  const deleteNotification = async (id: string) => {
    try {
      await deleteNotificationFromIndexedDB(id)
      setNotifications(prev => prev.filter(notification => notification.id !== id))
    } catch (error) {
      console.error('通知の削除に失敗:', error)
    }
  }

  const clearAllNotifications = async () => {
    try {
      await clearAllNotificationsFromIndexedDB()
      setNotifications([])
    } catch (error) {
      console.error('全通知の削除に失敗:', error)
    }
  }

  const formatTimestamp = (timestamp: number) => {
    const now = Date.now()
    const diff = now - timestamp
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 60) {
      return `${minutes}分前`
    } else if (hours < 24) {
      return `${hours}時間前`
    } else {
      return `${days}日前`
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-3 bg-muted rounded w-full"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 統計情報 */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <div className="text-center p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="text-lg sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
            {notifications.length}
          </div>
          <div className="text-xs sm:text-sm text-muted-foreground">総通知数</div>
        </div>
        <div className="text-center p-3 sm:p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="text-lg sm:text-2xl font-bold text-green-600 dark:text-green-400">
            {notifications.filter(n => n.read).length}
          </div>
          <div className="text-xs sm:text-sm text-muted-foreground">既読</div>
        </div>
        <div className="text-center p-3 sm:p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
          <div className="text-lg sm:text-2xl font-bold text-orange-600 dark:text-orange-400">
            {notifications.filter(n => !n.read).length}
          </div>
          <div className="text-xs sm:text-sm text-muted-foreground">未読</div>
        </div>
      </div>

      {/* アクションボタン */}
      {notifications.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {notifications.filter(n => !n.read).length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={markAllAsRead}
              className="flex items-center gap-2"
            >
              <CheckCheck className="w-4 h-4" />
              すべて既読
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={clearAllNotifications}
            className="flex items-center gap-2 text-destructive hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
            すべて削除
          </Button>
        </div>
      )}

      {/* 通知一覧 */}
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">通知がありません</h3>
              <p className="text-muted-foreground">
                新しい通知が届くとここに表示されます。
              </p>
            </CardContent>
          </Card>
        ) : (
          notifications.map((notification) => (
            <Card 
              key={notification.id}
              className={`transition-all duration-200 hover:shadow-md ${
                !notification.read 
                  ? 'border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/10' 
                  : ''
              }`}
            >
              <CardHeader className="pb-3 p-3 sm:p-6 sm:pb-3">
                <div className="flex items-start justify-between gap-2 sm:gap-3">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-sm sm:text-base leading-tight mb-1">
                      {notification.title}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 text-xs pt-2">
                      <Clock className="w-3 h-3 flex-shrink-0" />
                      {formatTimestamp(notification.timestamp)}
                      {notification.read ? (
                        <Badge variant="outline" className="text-xs ml-2">
                          既読
                        </Badge>
                      ) : (
                        <Badge variant="default" className="text-xs ml-2">
                          未読
                        </Badge>
                      )}
                    </CardDescription>
                  </div>
                  
                  <div className="flex flex-col items-center gap-1 flex-shrink-0">
                    <div className="flex items-center gap-1">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                          className="h-6 w-6 sm:h-10 sm:w-10 p-0"
                          title="既読にする"
                        >
                          <Check className="w-5 h-5 sm:w-7 sm:h-7 dark:text-blue-300 text-blue-700" />
                        </Button>
                      )}
                      {notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            deleteNotification(notification.id)
                          }}
                          className="h-6 w-6 sm:h-10 sm:w-10 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                          title="通知を削除"
                        >
                          <Trash2 className="w-5 h-5 sm:w-7 sm:h-7" />
                        </Button>
                      )}
                    </div>
                    
                  </div>
                </div>
              </CardHeader>
              
              {(notification.url || notification.quizId) ? (
                <Link
                  href={notification.url || `/quiz/${notification.quizId}`}
                  onClick={() => {
                    if (!notification.read) {
                      markAsRead(notification.id)
                    }
                  }}
                  className="block"
                >
                  <CardContent className="pt-0 p-3 sm:p-6 sm:pt-0 hover:bg-muted/50 transition-colors cursor-pointer">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {notification.body}
                    </p>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-muted">
                      <span className="text-xs text-muted-foreground">クリックして詳細を表示</span>
                    </div>
                  </CardContent>
                </Link>
              ) : (
                <CardContent className="pt-0 p-3 sm:p-6 sm:pt-0">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {notification.body}
                  </p>
                </CardContent>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
