'use client'

import { useRouter, useSearchParams } from 'next/navigation'
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

  const handleValueChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('limit', value)
    router.push(`/quiz?${params.toString()}`)
  }

  return (
    <div className="flex items-center gap-2">
      <Select value={currentLimit} onValueChange={handleValueChange}>
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder="select limit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="7">7 days</SelectItem>
          <SelectItem value="14">14 days</SelectItem>
          <SelectItem value="30">30 days</SelectItem>
          <SelectItem value="60">60 days</SelectItem>
          <SelectItem value="90">90 days</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
} 
