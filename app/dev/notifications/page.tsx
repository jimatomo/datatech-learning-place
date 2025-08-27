"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Play, Square, TestTube, Settings, Info } from "lucide-react"

export default function DevNotificationsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [schedulerRunning, setSchedulerRunning] = useState(false)

  const handleStartScheduler = async () => {
    setIsLoading(true)
    setError("")
    setMessage("")

    try {
      const response = await fetch('/api/dev/start-scheduler', {
        method: 'POST'
      })

      const result = await response.json()

      if (result.success) {
        setMessage(result.message)
        setSchedulerRunning(true)
      } else {
        setError(result.error || "スケジューラーの開始に失敗しました")
      }
    } catch {
      setError("ネットワークエラーが発生しました")
    } finally {
      setIsLoading(false)
    }
  }

  const handleStopScheduler = async () => {
    setIsLoading(true)
    setError("")
    setMessage("")

    try {
      const response = await fetch('/api/dev/start-scheduler', {
        method: 'DELETE'
      })

      const result = await response.json()

      if (result.success) {
        setMessage(result.message)
        setSchedulerRunning(false)
      } else {
        setError(result.error || "スケジューラーの停止に失敗しました")
      }
    } catch {
      setError("ネットワークエラーが発生しました")
    } finally {
      setIsLoading(false)
    }
  }

  const handleTestNotification = async () => {
    setIsLoading(true)
    setError("")
    setMessage("")

    try {
      const response = await fetch('/api/dev/test-notification', {
        method: 'POST'
      })

      const result = await response.json()

      if (result.success) {
        setMessage(`テスト通知を送信しました: ${result.notificationResult?.notificationsSent || 0}件`)
      } else {
        setError(result.error || "テスト通知の送信に失敗しました")
      }
    } catch {
      setError("ネットワークエラーが発生しました")
    } finally {
      setIsLoading(false)
    }
  }

  const handleManualSchedule = async () => {
    setIsLoading(true)
    setError("")
    setMessage("")

    try {
      const response = await fetch('/api/notifications/schedule-daily-quiz', {
        method: 'POST'
      })

      const result = await response.json()

      if (result.success) {
        if (result.quizzesFound > 0) {
          setMessage(`${result.quizzesFound}件のクイズ通知をスケジュールしました`)
        } else {
          setMessage("今日作成されたクイズはありません")
        }
      } else {
        setError(result.error || "手動スケジューリングに失敗しました")
      }
    } catch {
      setError("ネットワークエラーが発生しました")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Settings className="h-6 w-6" />
        <h1 className="text-2xl font-bold">開発環境 - 通知管理</h1>
        <Badge variant="secondary">DEV ONLY</Badge>
      </div>

      {/* 状態表示 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-4 w-4" />
            スケジューラー状態
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <span>自動スケジューラー:</span>
            <Badge variant={schedulerRunning ? "default" : "secondary"}>
              {schedulerRunning ? "実行中" : "停止中"}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {schedulerRunning 
              ? "毎分通知対象をチェックしています" 
              : "スケジューラーが停止しています"
            }
          </p>
        </CardContent>
      </Card>

      {/* メッセージ表示 */}
      {message && (
        <Alert>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* コントロールパネル */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* スケジューラー制御 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              自動スケジューラー
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              毎分自動で通知対象をチェックし、設定時刻になったユーザーに通知を送信します。
            </p>
            <div className="flex gap-2">
              <Button 
                onClick={handleStartScheduler}
                disabled={isLoading || schedulerRunning}
                variant="default"
                size="sm"
              >
                <Play className="h-4 w-4 mr-2" />
                開始
              </Button>
              <Button 
                onClick={handleStopScheduler}
                disabled={isLoading || !schedulerRunning}
                variant="outline"
                size="sm"
              >
                <Square className="h-4 w-4 mr-2" />
                停止
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 手動テスト */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TestTube className="h-4 w-4" />
              手動テスト
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              手動でテスト通知を送信したり、今日のクイズをチェックできます。
            </p>
            <div className="flex gap-2 flex-wrap">
              <Button 
                onClick={handleTestNotification}
                disabled={isLoading}
                variant="outline"
                size="sm"
              >
                <TestTube className="h-4 w-4 mr-2" />
                テスト通知
              </Button>
              <Button 
                onClick={handleManualSchedule}
                disabled={isLoading}
                variant="outline"
                size="sm"
              >
                手動スケジュール
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 使用方法 */}
      <Card>
        <CardHeader>
          <CardTitle>使用方法</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">1. 通知設定の確認</h4>
            <p className="text-sm text-muted-foreground">
              まず<a href="/global/notifications" className="underline">通知設定ページ</a>で通知を有効にし、タグと時刻を設定してください。
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">2. 自動スケジューラーの開始</h4>
            <p className="text-sm text-muted-foreground">
              「開始」ボタンを押すと、毎分通知対象をチェックします。設定時刻（±5分）になると自動で通知が送信されます。
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">3. テスト通知</h4>
            <p className="text-sm text-muted-foreground">
              「テスト通知」ボタンで即座に通知を送信して動作確認ができます。時刻チェックは行われません。
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">4. 注意事項</h4>
            <p className="text-sm text-muted-foreground">
              このページは開発環境でのみ利用可能です。本番環境では外部のcronジョブで通知をスケジュールします。
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
