'use client'

import React from 'react';
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useReward } from 'react-rewards';
import { Quiz } from '@/contents/quiz';
import { getQuizById } from '@/app/quiz/lib/get-quid-by-id';
import { Loader2 } from "lucide-react"

interface QuizResultProps {
  quizId: string;
  answer_count: number;
  selectedOptions: number[];
  onReset: () => void;
  onMarkAnswer: (correctAnswers: number[]) => void;
}

export function QuizResult({
  quizId,
  answer_count,
  selectedOptions,
  onReset,
  onMarkAnswer,
}: QuizResultProps) {
  const [showResult, setShowResult] = useState(false)
  const [result, setResult] = useState<{
    isCorrect: boolean;
  } | null>(null)
  const [explanation, setExplanation] = useState<string | null>(null)
  const [explanationJsx, setExplanationJsx] = useState<React.ReactNode | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const { reward, isAnimating } = useReward('rewardId', 'confetti');

  const handleShowResult = async () => {
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
      const data = await response.json();
      setResult(data);
      setShowResult(true);
      setIsLoading(false)

      if (data.isCorrect) {
        reward();
      }

      const quiz : Quiz = await getQuizById(quizId)
      setExplanation(quiz.getExplanation() || null)
      setExplanationJsx(quiz.getExplanationJsx())

      onMarkAnswer(data.correctAnswers)

    } catch (error) {
      console.error('Error checking answer:', error);
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
          className="w-full max-w-lg mx-4" 
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
