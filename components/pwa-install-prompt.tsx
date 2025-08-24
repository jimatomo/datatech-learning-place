'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { X, Download, Smartphone } from 'lucide-react'

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [isMacOS, setIsMacOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    try {
      // iOS検知
      const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
      setIsIOS(iOS)

      // macOS検知
      const macOS = /Mac|Macintosh/.test(navigator.userAgent)
      setIsMacOS(macOS)

      // スタンドアロンモード（PWAとしてインストール済み）検知
      const standalone = window.matchMedia('(display-mode: standalone)').matches || 
                         'standalone' in window.navigator && (window.navigator as Navigator & { standalone?: boolean }).standalone === true

      setIsStandalone(standalone)

      // ブラウザ検知
      const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)
      const isChrome = /Chrome/.test(navigator.userAgent)
      const isEdge = /Edg/.test(navigator.userAgent)

      // ユーザーが以前にプロンプトを閉じたかどうかをチェック
      const promptDismissed = localStorage.getItem('pwa-prompt-dismissed')
      const promptDismissedDate = promptDismissed ? new Date(promptDismissed) : null
      const daysSinceDismissed = promptDismissedDate 
        ? Math.floor((Date.now() - promptDismissedDate.getTime()) / (1000 * 60 * 60 * 24))
        : null

      // 7日間経過していない場合は表示しない
      if (daysSinceDismissed !== null && daysSinceDismissed < 7) {
        return
      }

      // セッション中に一度解除された場合は表示しない
      const sessionDismissed = sessionStorage.getItem('pwa-prompt-session-dismissed')
      if (sessionDismissed) {
        return
      }

      // PWAとしてインストール済みの場合は表示しない
      if (standalone) {
        return
      }

      // beforeinstallprompt イベントリスナー（Chrome、Edge用）
      const handleBeforeInstallPrompt = (e: Event) => {
        e.preventDefault()
        const beforeInstallPromptEvent = e as BeforeInstallPromptEvent
        setDeferredPrompt(beforeInstallPromptEvent)
        setShowPrompt(true)
      }

      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

      // Safari用の表示ロジック（iOS Safari と macOS Safari）
      if ((iOS || macOS) && isSafari) {
        setShowPrompt(true)
      }

      // MacOS Chrome/Edge用のフォールバック機能
      if (macOS && (isChrome || isEdge) && !standalone) {
        // beforeinstallpromptが発生しない場合のフォールバック
        const fallbackTimer = setTimeout(() => {
          setShowPrompt(true)
        }, 2000)
        
        return () => {
          window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
          clearTimeout(fallbackTimer)
        }
      }

      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      }
    } catch (error) {
      console.error('PWA Install Prompt Error:', error)
    }
  }, [])

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      
      if (outcome === 'accepted') {
        setShowPrompt(false)
        setDeferredPrompt(null)
      }
    }
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    // 次回表示を7日後に設定
    localStorage.setItem('pwa-prompt-dismissed', new Date().toISOString())
    // セッション中は表示しない
    sessionStorage.setItem('pwa-prompt-session-dismissed', 'true')
  }

  // ハイドレーションエラーを防ぐため、マウント後のみレンダリング
  if (!mounted) {
    return null
  }

  // PWAとしてインストール済み、またはプロンプトを表示しない場合は何も表示しない
  if (isStandalone || !showPrompt) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm">
      <Card className="shadow-lg border-2 border-primary/20 bg-background/95 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">アプリをインストール</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-muted-foreground hover:text-foreground"
              onClick={handleDismiss}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          <CardDescription className="text-sm">
            アプリをホーム画面に追加して、より快適にご利用いただけます。
          </CardDescription>
          
          {isIOS ? (
            <div className="space-y-2">
              <Button 
                className="w-full text-sm" 
                size="sm"
                onClick={handleDismiss}
              >
                <Download className="h-4 w-4 mr-2" />
                手順を確認しました
              </Button>
              <p className="text-xs text-muted-foreground">
                Safari で「共有」→「ホーム画面に追加」をタップしてください
              </p>
            </div>
          ) : isMacOS && !deferredPrompt ? (
            <div className="space-y-2">
              <Button 
                className="w-full text-sm" 
                size="sm"
                onClick={handleDismiss}
              >
                <Download className="h-4 w-4 mr-2" />
                手順を確認しました
              </Button>
              <p className="text-xs text-muted-foreground">
                Safari で「Dock にアプリを追加」または Chrome でアドレスバーのインストールアイコンをクリックしてください
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <Button 
                className="w-full text-sm" 
                size="sm"
                onClick={handleInstallClick}
                disabled={!deferredPrompt}
              >
                <Download className="h-4 w-4 mr-2" />
                今すぐインストール
              </Button>
              <p className="text-xs text-muted-foreground">
                ワンクリックでアプリをインストールできます
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}