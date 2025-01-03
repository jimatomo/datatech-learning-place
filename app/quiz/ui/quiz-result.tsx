'use client'

import { Button } from "@/components/ui/button"
import { useState } from "react"

interface QuizResultProps {
  answers: number[];
  explanation: string;
  selectedOptions: number[];
  onReset: () => void;
}

export function QuizResult({
  answers,
  explanation,
  selectedOptions,
  onReset
}: QuizResultProps) {
  const [showResult, setShowResult] = useState(false)
  const isCorrect = answers.every((answer: number) => selectedOptions.includes(answer))

  const handleReset = () => {
    setShowResult(false)
    onReset()
  }

  return (
    <div className="w-full">
      <div className="w-full flex justify-center">
        <Button 
          className="w-full max-w-lg mx-4" 
          onClick={() => setShowResult(true)}
          disabled={selectedOptions.length !== answers.length}
        >
          Check Answer
        </Button>
      </div>

      {showResult && (
        <div className="flex justify-center">
          <div className="mt-4 p-4 border rounded-lg w-full">
            <p className="font-bold mb-2 text-center">
              {isCorrect ? "🎉 正解です！" : "❌ 不正解です"}
            </p>
            <p className="mb-4 text-center">
              {explanation}
            </p>
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
