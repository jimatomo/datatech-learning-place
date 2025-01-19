'use client'

import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'
import { useUser } from '@auth0/nextjs-auth0/client'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface QuizLikeButtonProps {
  quizId: string
}

export default function QuizLikeButton({ quizId }: QuizLikeButtonProps) {
  const [liked, setLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const { user } = useUser()
  const userId = user?.sub ?? ''

  useEffect(() => {
    const fetchInitialData = async () => {
      if (!userId) return
      
      try {
        // いいねステータスの取得
        const statusResponse = await fetch(`/api/quiz/like?quizId=${quizId}&userId=${userId}`)
        const statusResult = await statusResponse.json()
        setLiked(statusResult.Item?.like ?? false)

        // いいね数の取得
        const countResponse = await fetch(`/api/quiz/count-like?quizId=${quizId}`)
        const countResult = await countResponse.json()
        setLikeCount(countResult.count)
      } catch (error) {
        console.error('データの取得に失敗しました:', error)
      }
    }

    fetchInitialData()
  }, [quizId, userId])

  const handleLikeClick = async () => {
    if (!user) return
    setIsLoading(true)
    
    // Optimistic Update
    const previousState = liked
    const previousCount = likeCount
    setLiked(!liked)
    setLikeCount(liked ? likeCount - 1 : likeCount + 1)
    
    try {
      const result = await fetch('/api/quiz/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          quizId, 
          userId: userId, 
          like: !liked 
        })
      })
      const data = await result.json()
      setLiked(data.like)
    } catch (error) {
      // エラー時は元の状態に戻す
      setLiked(previousState)
      setLikeCount(previousCount)
      console.error('いいねの更新に失敗しました:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative flex items-center justify-center">
      {!user ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                disabled={isLoading}
                className="flex items-center justify-center w-12 h-12
                  text-red-500 hover:text-red-500 rounded-full border-2
                  cursor-default"
              >
                <Heart className="fill-none" size={22} />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Please sign in</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <button
          onClick={handleLikeClick}
          disabled={isLoading}
          className={`flex items-center justify-center w-12 h-12 
            text-red-500 hover:text-red-500 rounded-full border-2
            hover:bg-red-500 hover:bg-opacity-10
            dark:hover:bg-secondary dark:hover:bg-opacity-10
            ${liked ? 'shadow-none' : 'shadow-md'}`}
        >
          <Heart
            size={22}
            className={`${
              liked ? 'fill-red-500' : 'fill-none'
            }`}
          />
        </button>
      )}
      <span className="absolute -right-6 text-sm text-muted-foreground">
        {likeCount}
      </span>
    </div>
  )
}
