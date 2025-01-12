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

export default function QuizFileListTagFiltered({
  quizPathInfos,
}: {
  quizPathInfos: PathInfo[],
}) {
  // タグのリストに追加する値（将来的にグローバルに管理したい）
  const tags = [
    'Snowflake', 'dbt', 'SQL', 'AWS', 'Terraform', 'Analytics', 'Engineering', 'AI'
  ]

  // 選択されたタグ
  const [selectedTag, setSelectedTag] = useState<string>("")

  // フィルターされたクイズの情報
  const [filteredQuizPathInfos, setFilteredQuizPathInfos] = useState<PathInfo[]>(quizPathInfos)

  // 選択されたタグが変わったら、クイズの情報をフィルタリング
  useEffect(() => {
    setFilteredQuizPathInfos(
      quizPathInfos.filter((quizPathInfo) => 
        quizPathInfo.tags?.includes(selectedTag)
      )
    )
  }, [selectedTag, quizPathInfos])

  // TODO: フィルターする期間を設定できるようにする

  return (
    <div>
      <Select onValueChange={(value) => setSelectedTag(value)}>
        <SelectTrigger className="w-[140px] mb-4 mx-2">
          <SelectValue placeholder="Select a tag"/>
        </SelectTrigger>
        <SelectContent>
          {tags.map((tag) => (
            <SelectItem key={tag} value={tag}>{tag}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <ScrollArea className="[&>[data-radix-scroll-area-viewport]]:max-h-[500px] px-2">
        <QuizFileList pathInfos={filteredQuizPathInfos} currentPath={[]} />
      </ScrollArea>
    </div>
  )
}

