"use client"

import { useState } from "react"
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
  const open = typeof isOpen === "boolean" ? isOpen : internalOpen
  const setOpen = (v: boolean) => {
    if (onOpenChange) onOpenChange(v)
    else setInternalOpen(v)
  }

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
    } catch (e) {
      setSubmitted("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full mt-2">
      {!hideTrigger && (
        <div className="flex justify-end">
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
            <CardTitle className="text-base">フィードバック（モック）</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="feedback">気づき・改善提案などがあれば教えてください</Label>
              <Textarea
                id="feedback"
                placeholder="例: 選択肢の説明が分かりにくい、参考リンクが欲しい など"
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


