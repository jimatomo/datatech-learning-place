'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function LimitSelector({ defaultLimit }: { defaultLimit: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentLimit = searchParams.get('limit') || defaultLimit
  const [isNavigating, setIsNavigating] = useState(false)
  const [targetLimit, setTargetLimit] = useState<string | null>(null)

  const handleValueChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('limit', value)
    setTargetLimit(value)
    setIsNavigating(true)
    router.push(`/quiz?${params.toString()}`)
  }

  useEffect(() => {
    if (targetLimit && currentLimit === targetLimit) {
      setIsNavigating(false)
      setTargetLimit(null)
    }
  }, [currentLimit, targetLimit])

  return (
    <div className="flex items-center gap-2" aria-busy={isNavigating} aria-live="polite">
      <Select value={currentLimit} onValueChange={handleValueChange}>
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="select limit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="7">7 days</SelectItem>
          <SelectItem value="14">14 days</SelectItem>
          <SelectItem value="30">30 days</SelectItem>
          <SelectItem value="60">60 days</SelectItem>
          <SelectItem value="90">90 days</SelectItem>
          <SelectItem value="180">180 days</SelectItem>
          <SelectItem value="365">365 days</SelectItem>
        </SelectContent>
      </Select>
      {isNavigating && (
        <div className="ml-1 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" aria-label="更新中" />
      )}
    </div>
  )
} 
