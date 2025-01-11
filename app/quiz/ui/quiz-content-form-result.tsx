'use client'

import React from 'react';
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useReward } from 'react-rewards';
import { Quiz } from '@/contents/quiz';
import { getQuizById } from '@/app/quiz/lib/get-quid-by-id';

interface QuizResultProps {
  quizId: string;
  answer_count: number;
  selectedOptions: number[];
  onReset: () => void;
}

export function QuizResult({
  quizId,
  answer_count,
  selectedOptions,
  onReset
}: QuizResultProps) {
  const [showResult, setShowResult] = useState(false)
  const [result, setResult] = useState<{
    isCorrect: boolean;
  } | null>(null)
  const [explanation, setExplanation] = useState<string | null>(null)
  const [explanationJsx, setExplanationJsx] = useState<React.ReactNode | null>(null)

  const { reward, isAnimating } = useReward('rewardId', 'confetti');

  const handleShowResult = async () => {
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
      console.log("selectedOptions:", data.selectedOptions.sort());
      console.log("correctAnswers:", data.correctAnswers.sort());
      setResult(data);
      setShowResult(true);

      const quiz : Quiz = await getQuizById(quizId)
      setExplanation(quiz.getExplanation() || null)
      setExplanationJsx(quiz.getExplanationJsx())

      
      if (data.isCorrect) {
        reward();
      }
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
      <div className="w-full flex justify-center">
        <Button 
          className="w-full max-w-lg mx-4" 
          onClick={handleShowResult}
          disabled={selectedOptions.length !== answer_count || isAnimating || showResult}
          id="rewardId"
        >
          Check Answer
        </Button>
      </div>

      {showResult && result && (
        <div className="flex justify-center">
          <div className="mt-4 p-4 border rounded-lg w-full">
            <p className="font-bold mb-2 text-center">
              {result.isCorrect ? "🎉 正解です！" : "❌ 不正解です"}
            </p>
            { explanation ? (
              <p className="mb-4 text-sm">
                {explanation}
              </p>
            ) : explanationJsx ? (
              explanationJsx
            ) : null}
            <div>
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
