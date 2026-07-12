'use client'

import React from 'react';
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useReward } from 'react-rewards';
import { Loader2 } from "lucide-react"
import { usePathname } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';
import { handleTrackEvent } from '@/app/lib/frontend_event_api';

interface QuizResultProps {
  quizId: string;
  answer_count: number;
  selectedOptions: number[];
  explanation?: string;
  explanationJsx?: React.ReactNode;
  onReset: () => void;
  onMarkAnswer: (correctAnswers: number[]) => void;
}

export function QuizResult({
  quizId,
  answer_count,
  selectedOptions,
  explanation,
  explanationJsx,
  onReset,
  onMarkAnswer,
}: QuizResultProps) {
  const pathname = usePathname();
  const { user } = useUser();
  const attemptCount = React.useRef(0);
  const [showResult, setShowResult] = useState(false)
  const [result, setResult] = useState<{
    isCorrect: boolean;
  } | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const { reward, isAnimating } = useReward('rewardId', 'confetti');

  const handleShowResult = async () => {
    const startedAt = performance.now();
    setIsLoading(true)
    try {
      const response = await fetch('/api/check-answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quizId,
          selectedOptions,
        }),
      });
      if (!response.ok) {
        throw new Error(`Failed to check answer: ${response.status}`);
      }
      const data = await response.json();
      setResult(data);
      setShowResult(true);
      attemptCount.current += 1;

      void handleTrackEvent({
        user_id: user?.sub?.toString() ?? '',
        path: pathname,
        event_name: 'quiz_completed',
        properties: {
          quiz_id: quizId,
          is_correct: data.isCorrect,
          attempt_number: attemptCount.current,
          selected_option_count: selectedOptions.length,
          response_time_ms: Math.round(performance.now() - startedAt),
        },
      });

      if (data.isCorrect) {
        reward();
      }

      onMarkAnswer(data.correctAnswers)

    } catch (error) {
      console.error('Error checking answer:', error);
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setShowResult(false)
    onReset()
  }

  return (
    <div className="w-full">
      <div className="w-full flex justify-center" id="rewardId">
        <Button 
          className="w-full max-w-xl mx-2 md:mx-4" 
          onClick={handleShowResult}
          disabled={selectedOptions.length !== answer_count || isAnimating || showResult || isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Checking...
            </>
          ) : (
            'Check Answer'
          )}
        </Button>
      </div>

      {showResult && result && (
        <div className="flex justify-center">
          <div className="mt-4 p-4 border rounded-lg w-full">
            <p className="font-bold mb-4 text-center">
              {result.isCorrect ? "🎉 正解です！" : "❌ 不正解です"}
            </p>
            { explanation ? (
              <p className="text-sm">
                {explanation}
              </p>
            ) : explanationJsx ? (
              explanationJsx
            ) : null}
            <div className="mt-4">
              <Button 
                className="w-full"
                variant="outline"
                onClick={handleReset}
              >
                Try Again
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 
