'use client'

import { useState, useEffect } from "react"

import { PathInfo } from '../lib/get-path-info'
import { QuizFileList } from './quiz-file-list'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LimitSelector } from '@/app/quiz/ui/limit-selector'
export default function QuizFileListTagFiltered({
  quizPathInfos,
  defaultLimit,
}: {
  quizPathInfos: PathInfo[],
  defaultLimit: string,
}) {
  // タグのリストに追加する値（将来的にグローバルに管理したい）
  const tags = [
    'Snowflake',
    'Snowflake Basic',
    'Snowflake Advanced',
    'Data Modeling',
    'Infrastructure',
    'Data Application',
    'Data Management',
    'Datatech News',
  ]

  // 選択されたタグ
  const [selectedTag, setSelectedTag] = useState<string>("")

  // フィルターされたクイズの情報
  const [filteredQuizPathInfos, setFilteredQuizPathInfos] = useState<PathInfo[]>(quizPathInfos)

  // 選択されたタグが変わったら、クイズの情報をフィルタリング
  useEffect(() => {
    setFilteredQuizPathInfos(
      quizPathInfos
        .filter((quizPathInfo) => 
          quizPathInfo.tags?.includes(selectedTag) && quizPathInfo.created_at !== null
        )
        .sort((a, b) => b.created_at!.getTime() - a.created_at!.getTime())
    )
  }, [selectedTag, quizPathInfos])

  return (
    <div>
      <div className="flex flex-row items-center justify-start mb-4 mx-2 gap-2">
        <Select onValueChange={(value) => setSelectedTag(value)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select a tag"/>
        </SelectTrigger>
        <SelectContent>
          {tags.map((tag) => (
            <SelectItem key={tag} value={tag}>{tag}</SelectItem>
          ))}
          </SelectContent>
        </Select>

        <LimitSelector defaultLimit={defaultLimit} />
      </div>

      <ScrollArea className="[&>[data-radix-scroll-area-viewport]]:max-h-[500px] px-2">
        <QuizFileList pathInfos={filteredQuizPathInfos} currentPath={[]} />
      </ScrollArea>
    </div>
  )
}

