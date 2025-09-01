"use client"

import { useState } from "react"
import { useNotificationManager, NotificationSettings } from "@/app/global/notifications/lib/use-notification-manager"
import { NotificationActionRequest, NotificationActionResponse } from "@/app/global/notifications/lib/notification-actions"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Bell, Clock, Tag, AlertCircle, Smartphone } from "lucide-react"

interface NotificationSettingsClientProps {
  className?: string
  initialSettings: NotificationSettings
  userId?: string
  updateSettingsOnServer: (settings: NotificationActionRequest) => Promise<NotificationActionResponse>
}

export function NotificationSettingsClient({ 
  className, 
  initialSettings, 
  userId,
  updateSettingsOnServer
}: NotificationSettingsClientProps) {
  const {
    isSupported,
    subscription,
    settings,
    error,
    setError,
    setSettings,
    setSubscription,

  } = useNotificationManager({ initialSettings })

  const [isLoading, setIsLoading] = useState(false)



  // 時間と分の選択肢を生成
  const hourOptions = Array.from({ length: 24 }, (_, i) => ({
    value: i.toString().padStart(2, '0'),
    label: i.toString().padStart(2, '0')
  }))

  const minuteOptions = Array.from({ length: 6 }, (_, i) => ({
    value: (i * 10).toString().padStart(2, '0'),
    label: (i * 10).toString().padStart(2, '0')
  }))

  // 現在の通知時間を時間と分に分解
  const getCurrentTimeParts = () => {
    const currentTime = settings?.notificationTime || "09:00"
    const [hour, minute] = currentTime.split(':')
    return { hour, minute }
  }

  // 曜日別タグと一般タグを分離
  const weeklyTags = [
    "Snowflake Basic",
    "Snowflake Advanced", 
    "Data Modeling",
    "Infrastructure",
    "Data Application",
    "Data Management",
    "Datatech News"
  ]

  // サーバーサイドでの設定更新処理
  const handleSettingsUpdate = async (newSettings: NotificationSettings, action: 'update' | 'subscribe' | 'unsubscribe' = 'update', subscription?: PushSubscription) => {
    try {
      // サーバーサイドで設定を更新
      const requestData = {
        ...newSettings,
        action,
        subscription: subscription ? {
          endpoint: subscription.endpoint,
          keys: {
            p256dh: btoa(String.fromCharCode(...new Uint8Array(subscription.getKey('p256dh')!))),
            auth: btoa(String.fromCharCode(...new Uint8Array(subscription.getKey('auth')!)))
          }
        } : undefined
      }
      
      let result
      try {
        result = await updateSettingsOnServer(requestData)
      } catch (callError) {
        console.error('サーバーアクション呼び出しエラー:', callError)
        throw callError
      }
      
      // resultがundefinedの場合の処理
      if (!result) {
        console.error('サーバーから応答がありません')
        setError("サーバーからの応答がありません")
        return false
      }
      
      if (!result.success) {
        setError(result.error || "設定の更新に失敗しました")
        return false
      }
      
      // 成功時はuseNotificationManagerの状態を更新
      setSettings({ ...newSettings })
      
      // エラーをクリア
      setError(null)
      
      return true
    } catch (error) {
      console.error('設定更新エラー:', error)
      setError(`設定の更新に失敗しました: ${error instanceof Error ? error.message : '不明なエラー'}`)
      return false
    }
  }

  const handleToggle = async (enabled: boolean) => {
    setIsLoading(true)
    setError(null)
    
    const newSettings: NotificationSettings = {
      ...settings,
      enabled
    }
    
    // 通知設定が無い状態で初回に通知を有効にする場合は、subscribeアクションを使用
    const action = enabled && (!settings.enabled && settings.selectedTags.length === 0) ? 'subscribe' : 'update'
    
    // subscribeアクションの場合は、現在のsubscriptionまたは新しく作成する
    let currentSubscription = subscription
    if (action === 'subscribe' && !currentSubscription) {
      try {
        // 通知許可を要求
        const permission = await Notification.requestPermission()
        if (permission !== "granted") {
          setError("通知の許可が得られませんでした")
          setIsLoading(false)
          return
        }
        
        // Service Workerの準備
        const registration = await navigator.serviceWorker.ready
        
        // VAPID公開キーの存在チェック
        const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
        if (!vapidPublicKey) {
          throw new Error('VAPID公開キーが設定されていません')
        }

        // VAPID公開キーを安全にデコード
        let applicationServerKey: Uint8Array
        try {
          // Base64URLからBase64に変換（必要に応じて）
          const base64Key = vapidPublicKey.replace(/-/g, '+').replace(/_/g, '/')
          const binaryString = atob(base64Key)
          applicationServerKey = new Uint8Array(binaryString.split('').map(char => char.charCodeAt(0)))
        } catch (decodeError) {
          console.error('VAPID公開キーのデコードエラー:', decodeError)
          throw new Error('VAPID公開キーの形式が正しくありません')
        }

        // 新しい購読を作成
        currentSubscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey,
        })
        
        // useNotificationManagerの状態も更新
        setSubscription(currentSubscription)
      } catch (error) {
        console.error('購読作成エラー:', error)
        setError("通知の購読に失敗しました")
        setIsLoading(false)
        return
      }
    }
    
    const success = await handleSettingsUpdate(newSettings, action, currentSubscription || undefined)
    if (!success) {
      setIsLoading(false)
      return
    }
    
    setIsLoading(false)
  }

  const handleTagToggle = async (tag: string, checked: boolean) => {
    setIsLoading(true)
    setError(null)
    
    const currentTags = settings.selectedTags || []
    let newTags: string[]
    if (checked) {
      newTags = [...currentTags, tag]
    } else {
      newTags = currentTags.filter(t => t !== tag)
    }
    
    const newSettings: NotificationSettings = {
      ...settings,
      selectedTags: newTags
    }
    
    await handleSettingsUpdate(newSettings)
    setIsLoading(false)
  }

  const handleTimeChange = async (type: 'hour' | 'minute', value: string) => {
    setIsLoading(true)
    setError(null)
    
    const currentParts = getCurrentTimeParts()
    const newTime = type === 'hour' 
      ? `${value}:${currentParts.minute}`
      : `${currentParts.hour}:${value}`
    
    const newSettings: NotificationSettings = {
      ...settings,
      notificationTime: newTime
    }
    
    await handleSettingsUpdate(newSettings)
    setIsLoading(false)
  }

  const handleSelectAllTags = async () => {
    setIsLoading(true)
    setError(null)
    
    const newSettings: NotificationSettings = {
      ...settings,
      selectedTags: [...weeklyTags]
    }
    
    await handleSettingsUpdate(newSettings)
    setIsLoading(false)
  }

  const handleClearAllTags = async () => {
    setIsLoading(true)
    setError(null)
    
    const newSettings: NotificationSettings = {
      ...settings,
      selectedTags: []
    }
    
    await handleSettingsUpdate(newSettings)
    setIsLoading(false)
  }

  if (!userId) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-md">
            <Bell className="h-4 w-4" />
            プッシュ通知の設定
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              通知設定を利用するにはログインが必要です。
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  if (!isSupported) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-md">
            <Bell className="h-4 w-4" />
            プッシュ通知の設定
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
            <Smartphone className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            <AlertDescription className="text-orange-800 dark:text-orange-200">
              <div className="space-y-2">
                <div className="font-medium">通知機能を利用するには</div>
                <div className="text-sm">
                  このブラウザでは通知機能がサポートされていません。より良い体験のために、このページをアプリとしてインストールすることをお勧めします。
                </div>
                <div className="text-sm font-medium">
                  手順：ブラウザのメニューから「ホーム画面に追加」または「アプリとしてインストール」を選択
                </div>
              </div>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  const currentTimeParts = getCurrentTimeParts()

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-md">
          <Bell className="h-4 w-4" />
          プッシュ通知の設定
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* 通知の有効/無効 */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">プッシュ通知</Label>
            <div className="text-sm text-muted-foreground">
              クイズ投稿時の通知を{settings?.enabled ? '有効' : '無効'}にする
            </div>
          </div>
          <Switch
            checked={settings?.enabled || false}
            onCheckedChange={handleToggle}
            disabled={isLoading}
          />
        </div>

        {settings?.enabled && (
          <>

            {/* 通知時間設定 */}
            <div className="space-y-3">
              <Label className="text-base flex items-center gap-2">
                <Clock className="h-4 w-4" />
                通知時間
              </Label>
              <div className="flex items-center gap-1">
                <Select 
                  value={currentTimeParts.hour} 
                  onValueChange={(value) => handleTimeChange('hour', value)}
                >
                  <SelectTrigger className="w-20">
                    <SelectValue placeholder="00" />
                  </SelectTrigger>
                  <SelectContent>
                    {hourOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span className="text-lg font-medium">:</span>
                <Select 
                  value={currentTimeParts.minute} 
                  onValueChange={(value) => handleTimeChange('minute', value)}
                >
                  <SelectTrigger className="w-20">
                    <SelectValue placeholder="00" />
                  </SelectTrigger>
                  <SelectContent>
                    {minuteOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="text-sm text-muted-foreground">
                選択した時間にクイズ投稿の通知が送信されます
              </div>
            </div>

            {/* タグ選択 */}
            <div className="space-y-3">
              <Label className="text-base flex items-center gap-2">
                <Tag className="h-4 w-4" />
                通知するタグ
              </Label>
              
              <div className="flex gap-2 mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSelectAllTags}
                  disabled={isLoading}
                >
                  全て選択
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearAllTags}
                  disabled={isLoading}
                >
                  全て解除
                </Button>
              </div>

              {/* 曜日別タグ */}
              <div className="space-y-3">
                <div className="text-sm font-medium">曜日別タグ</div>
                <div className="grid grid-cols-1 gap-3">
                  {weeklyTags.map((tag) => (
                    <div key={tag} className="flex items-center space-x-2">
                      <Checkbox
                        id={`weekly-tag-${tag}`}
                        checked={settings?.selectedTags?.includes(tag) || false}
                        onCheckedChange={(checked) => handleTagToggle(tag, checked as boolean)}
                        disabled={isLoading}
                      />
                      <Label
                        htmlFor={`weekly-tag-${tag}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {tag}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                選択したタグが含まれるクイズが投稿されたときに通知が送信されます
              </div>
            </div>

          </>
        )}
      </CardContent>
    </Card>
  )
}
