"use client"

import { useState, useEffect } from "react"
import { useNotificationManager, NotificationSettings } from "@/hooks/use-notification-manager"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Bell, Clock, Tag, AlertCircle, CheckCircle } from "lucide-react"
import { tags } from "@/app/quiz/lib/tags"

interface NotificationSettingsClientProps {
  className?: string
  initialSettings: NotificationSettings
  userId?: string
}

export function NotificationSettingsClient({ 
  className, 
  initialSettings, 
  userId 
}: NotificationSettingsClientProps) {
  const {
    isSupported,
    subscription,
    settings,
    error,
    setError,
    updateSettings,
    sendTestNotification,
  } = useNotificationManager({ initialSettings })

  const [isLoading, setIsLoading] = useState(false)
  const [testSuccess, setTestSuccess] = useState(false)
  
  // 初期設定を確実に適用
  const [currentSettings, setCurrentSettings] = useState<NotificationSettings>(() => {
    if (initialSettings && initialSettings.enabled !== undefined) {
      return initialSettings
    }
    return {
      enabled: false,
      selectedTags: [],
      notificationTime: "09:00"
    }
  })

  // 初期設定が変更された場合に現在の設定を更新
  useEffect(() => {
    if (initialSettings && (
      initialSettings.enabled !== currentSettings.enabled ||
      JSON.stringify(initialSettings.selectedTags) !== JSON.stringify(currentSettings.selectedTags) ||
      initialSettings.notificationTime !== currentSettings.notificationTime
    )) {
      setCurrentSettings(initialSettings)
    }
  }, [initialSettings])

  // useNotificationManagerの設定と同期を取る
  useEffect(() => {
    if (settings && (
      settings.enabled !== currentSettings.enabled || 
      JSON.stringify(settings.selectedTags) !== JSON.stringify(currentSettings.selectedTags) || 
      settings.notificationTime !== currentSettings.notificationTime
    )) {
      setCurrentSettings(settings)
    }
  }, [settings])

  // 時間の選択肢を生成（10分単位）
  const timeOptions = []
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 10) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      timeOptions.push(timeString)
    }
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
  
  const generalTags = tags.filter(tag => !weeklyTags.includes(tag))

  const handleToggle = async (enabled: boolean) => {
    setIsLoading(true)
    setError(null)
    
    const newSettings: NotificationSettings = {
      ...currentSettings,
      enabled
    }
    
    setCurrentSettings(newSettings)
    
    const success = await updateSettings(newSettings)
    if (!success) {
      // エラーの場合は元の状態に戻す
      setCurrentSettings(currentSettings)
      setIsLoading(false)
      return
    }
    
    setIsLoading(false)
  }

  const handleTagToggle = async (tag: string, checked: boolean) => {
    setIsLoading(true)
    setError(null)
    
    const currentTags = currentSettings.selectedTags || []
    let newTags: string[]
    if (checked) {
      newTags = [...currentTags, tag]
    } else {
      newTags = currentTags.filter(t => t !== tag)
    }
    
    const newSettings: NotificationSettings = {
      ...currentSettings,
      selectedTags: newTags
    }
    
    setCurrentSettings(newSettings)
    await updateSettings(newSettings)
    setIsLoading(false)
  }

  const handleTimeChange = async (time: string) => {
    setIsLoading(true)
    setError(null)
    
    const newSettings: NotificationSettings = {
      ...currentSettings,
      notificationTime: time
    }
    
    setCurrentSettings(newSettings)
    await updateSettings(newSettings)
    setIsLoading(false)
  }

  const handleTestNotification = async () => {
    setIsLoading(true)
    setError(null)
    setTestSuccess(false)
    
    const success = await sendTestNotification()
    if (success) {
      setTestSuccess(true)
      setTimeout(() => setTestSuccess(false), 3000)
    }
    
    setIsLoading(false)
  }

  const handleSelectAllTags = async () => {
    setIsLoading(true)
    setError(null)
    
    const newSettings: NotificationSettings = {
      ...currentSettings,
      selectedTags: [...tags]
    }
    
    setCurrentSettings(newSettings)
    await updateSettings(newSettings)
    setIsLoading(false)
  }

  const handleClearAllTags = async () => {
    setIsLoading(true)
    setError(null)
    
    const newSettings: NotificationSettings = {
      ...currentSettings,
      selectedTags: []
    }
    
    setCurrentSettings(newSettings)
    await updateSettings(newSettings)
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
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              お使いのブラウザはプッシュ通知をサポートしていません。
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

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

        {testSuccess && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>テスト通知を送信しました！</AlertDescription>
          </Alert>
        )}

        {/* 通知の有効/無効 */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">プッシュ通知</Label>
            <div className="text-sm text-muted-foreground">
              クイズ投稿時の通知を{currentSettings?.enabled ? '有効' : '無効'}にする
            </div>
          </div>
          <Switch
            checked={currentSettings?.enabled || false}
            onCheckedChange={handleToggle}
            disabled={isLoading}
          />
        </div>

        {currentSettings?.enabled && (
          <>
            {/* 通知時間設定 */}
            <div className="space-y-3">
              <Label className="text-base flex items-center gap-2">
                <Clock className="h-4 w-4" />
                通知時間
              </Label>
              <Select value={currentSettings?.notificationTime || "09:00"} onValueChange={handleTimeChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="通知時間を選択" />
                </SelectTrigger>
                <SelectContent>
                  {timeOptions.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                        checked={currentSettings?.selectedTags?.includes(tag) || false}
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

              {/* 一般タグ */}
              <div className="space-y-3">
                <div className="text-sm font-medium">一般タグ</div>
                <div className="grid grid-cols-1 gap-3 max-h-48 overflow-y-auto">
                  {generalTags.map((tag) => (
                    <div key={tag} className="flex items-center space-x-2">
                      <Checkbox
                        id={`general-tag-${tag}`}
                        checked={currentSettings?.selectedTags?.includes(tag) || false}
                        onCheckedChange={(checked) => handleTagToggle(tag, checked as boolean)}
                        disabled={isLoading}
                      />
                      <Label
                        htmlFor={`general-tag-${tag}`}
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

            {/* テスト通知 */}
            {subscription && (
              <div className="pt-4 border-t space-y-3">
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    onClick={handleTestNotification}
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading ? "送信中..." : "テスト通知を送信"}
                  </Button>
                  {testSuccess && (
                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>
                        テスト通知が送信されました！
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
