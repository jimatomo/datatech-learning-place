"use client"

import { useState } from "react"
import QuizLikeButton from '@/app/quiz/ui/quiz-like-button'
import { XShareButton } from '@/components/x-share-button'
import { FeedbackWidget } from "@/app/quiz/ui/feedback-widget"
import { MessageSquare } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Badge } from '@/components/ui/badge'

type Props = {
  quizId: string
  quizTitle: string
  selfQuizUrl: string
}

export function QuizWidgetsClient({ quizId, quizTitle, selfQuizUrl }: Props) {
  const [open, setOpen] = useState(false)
  return (
    <div className="w-full">
      <div className="flex flex-row w-full max-w-2xl items-center pb-2 mx-auto">
        <div className="flex-1 flex items-center gap-2 justify-start">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className={`flex items-center justify-center w-12 h-12 rounded-full border-2 hover:bg-blue-500 hover:bg-opacity-10 text-blue-500 ${open ? 'shadow-none' : 'shadow-md'}`}
                  onClick={() => setOpen((v) => !v)}
                  aria-label={open ? 'フィードバックを閉じる' : 'フィードバックを開く'}
                  aria-expanded={open}
                  aria-controls="feedback-panel"
                  title={open ? 'フィードバックを閉じる' : 'フィードバック'}
                >
                  <MessageSquare size={22} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>フィードバック（モック）</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Badge variant="secondary">Mock</Badge>
        </div>
        <div className="flex-1 flex justify-center">
          <QuizLikeButton quizId={quizId} />
        </div>
        <div className="flex-1 flex justify-end">
          <XShareButton
            title={`${quizTitle} | DTLP Quiz`}
            url={`https://datatech-learning-place.net${selfQuizUrl}`} />
        </div>
      </div>
      <div className="w-full max-w-2xl mx-auto">
        <FeedbackWidget quizId={quizId} isOpen={open} onOpenChange={setOpen} hideTrigger />
      </div>
    </div>
  )
}


