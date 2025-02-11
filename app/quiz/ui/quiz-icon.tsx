'use client'

import { CircleCheckBig, CircleHelp } from "lucide-react";
import { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

// ユーザが精化しているかどうかで表示を変えるアイコン
export function QuizIcon({ quizId }: { quizId: string }) {
  const [isCorrect, setIsCorrect] = useState(false)
  const { user } = useUser()
  const userId = user?.sub ?? ''

  // ログイン済みユーザーの場合のみクイズ結果を取得
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // クイズ結果の取得
        const statusResponse = await fetch(`/api/quiz/get-result?quizId=${quizId}`)
        const statusResult = await statusResponse.json()
        setIsCorrect(statusResult.Item?.is_correct ?? false)

      } catch (error) {
        console.error('データの取得に失敗しました:', error)
      }
    }

    fetchInitialData()
  }, [userId, quizId])

  return (
    <>
      {isCorrect && isCorrect?.toString() === "true" ? (
        <CircleCheckBig className="my-5 w-full text-emerald-500" size={40}/>
      ) : (
        <CircleHelp className="my-5 w-full" size={40}/>
      )}
    </>
  );
}
