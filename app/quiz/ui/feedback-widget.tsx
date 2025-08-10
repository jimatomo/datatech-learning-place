"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

type Props = {
  quizId: string
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
  hideTrigger?: boolean
}

export function FeedbackWidget({ quizId, isOpen, onOpenChange, hideTrigger }: Props) {
  const [feedback, setFeedback] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState<null | "success" | "error">(null)
  const [internalOpen, setInternalOpen] = useState(false)
  const [messages, setMessages] = useState<Array<{ message: string; created_at?: string; record_type?: string; can_delete?: boolean }>>([])
  const [isLoadingMessages, setIsLoadingMessages] = useState(false)
  const [deletingKey, setDeletingKey] = useState<string | null>(null)
  const open = typeof isOpen === "boolean" ? isOpen : internalOpen
  const setOpen = (v: boolean) => {
    if (onOpenChange) onOpenChange(v)
    else setInternalOpen(v)
  }

  async function fetchMessages(limit = 20) {
    try {
      setIsLoadingMessages(true)
      const res = await fetch(`/api/quiz/feedback?quizId=${encodeURIComponent(quizId)}&limit=${limit}`)
      const data = await res.json()
      setMessages(Array.isArray(data?.messages) ? data.messages : [])
    } catch {
      setMessages([])
    } finally {
      setIsLoadingMessages(false)
    }
  }

  async function handleDelete(recordType?: string) {
    if (!recordType) return
    // 確認ダイアログ（軽量）
    if (!confirm('このフィードバックを削除しますか？')) return
    try {
      setDeletingKey(recordType)
      const res = await fetch('/api/quiz/feedback', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quizId, recordType }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || 'failed')
      }
      // 再取得
      await fetchMessages()
    } catch (e) {
      alert('削除に失敗しました。権限があるか、しばらくしてから再試行してください。')
    } finally {
      setDeletingKey(null)
    }
  }

  useEffect(() => {
    if (open) fetchMessages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizId, open])

  async function handleSubmit() {
    if (!feedback.trim()) return
    setIsSubmitting(true)
    setSubmitted(null)
    try {
      const res = await fetch("/api/quiz/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quizId, message: feedback }),
      })
      if (!res.ok) throw new Error("failed")
      setSubmitted("success")
      setFeedback("")
      // 送信成功後はメッセージ一覧を再取得
      fetchMessages()
    } catch {
      setSubmitted("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full mt-2">
      {!hideTrigger && (
        <div className="flex justify-end items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="feedback-panel"
          >
            {open ? "フィードバックを閉じる" : "フィードバック"}
          </Button>
        </div>
      )}
      {open && (
        <Card id="feedback-panel" className="mt-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">フィードバック</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="feedback">気づき・改善提案などがあれば教えてください</Label>
              <Textarea
                id="feedback"
                placeholder="例: 選択肢の説明が分かりにくい、間違っている、リンクが切れている、など"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                maxLength={1000}
              />
              {submitted === "success" && (
                <p className="text-sm text-green-600">送信しました。ありがとうございます！</p>
              )}
              {submitted === "error" && (
                <p className="text-sm text-red-600">送信に失敗しました。時間をおいて再度お試しください。</p>
              )}
              <div className="pt-2">
                <p className="text-sm text-muted-foreground mb-1">直近のフィードバック</p>
                {isLoadingMessages ? (
                  <p className="text-sm text-muted-foreground">読み込み中...</p>
                ) : messages.length === 0 ? (
                  <p className="text-sm text-muted-foreground">まだフィードバックはありません</p>
                ) : (
                  <ul className="space-y-2">
                    {messages.map((m, idx) => {
                      const key = m.record_type ?? String(idx)
                      const canDelete = Boolean(m.can_delete && m.record_type)
                      const isDeleting = deletingKey === m.record_type
                      return (
                        <li key={key} className="text-sm border rounded p-2 bg-muted/30">
                          <div className="flex items-start justify-between gap-2">
                            <div className="whitespace-pre-wrap break-words flex-1">{m.message}</div>
                            {canDelete && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:text-red-700"
                                onClick={() => handleDelete(m.record_type)}
                                disabled={isDeleting}
                                aria-label="このフィードバックを削除"
                              >
                                {isDeleting ? '削除中…' : '削除'}
                              </Button>
                            )}
                          </div>
                          {m.created_at && (
                            <div className="text-xs text-muted-foreground mt-1">{new Date(m.created_at).toLocaleString()}</div>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-end gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setOpen(false)}
            >
              キャンセル
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting || !feedback.trim()} size="sm">
              {isSubmitting ? "送信中..." : "送信"}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}


