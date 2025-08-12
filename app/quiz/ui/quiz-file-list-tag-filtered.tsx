'use client'

import { useState, useEffect } from "react"

import { PathInfo } from '../lib/get-path-info'
import { QuizFileList } from './quiz-file-list'
import { ScrollArea } from "@/components/ui/scroll-area"
import { LimitSelector } from '@/app/quiz/ui/limit-selector'
import { tags } from "@/app/quiz/lib/tags"

import { ChevronsUpDown, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function QuizFileListTagFiltered({
  quizPathInfos,
  defaultLimit,
}: {
  quizPathInfos: PathInfo[],
  defaultLimit: string,
}) {
  
  // Comboboxで入力されたタグ
  const [inputTextTag, setInputTextTag] = useState<string>("")

  // フィルターされたクイズの情報
  const [filteredQuizPathInfos, setFilteredQuizPathInfos] = useState<PathInfo[]>(quizPathInfos)

  // Combobox用のstate
  const [open, setOpen] = useState(false)
  
  // 選択されたタグが変わったら、クイズの情報をフィルタリング
  useEffect(() => {
    setFilteredQuizPathInfos(
      quizPathInfos
        .filter((quizPathInfo) => {
          const inputTextTagCondition = inputTextTag ? quizPathInfo.tags?.includes(inputTextTag) : true;
          return inputTextTagCondition && quizPathInfo.created_at !== null
        })
        .sort((a, b) => b.created_at!.getTime() - a.created_at!.getTime())
    )
  }, [inputTextTag, quizPathInfos])

  return (
    <div>
      <div className="flex flex-row items-center justify-start mb-4 mx-2 gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="flex-1 sm:flex-initial sm:w-[350px] justify-between max-w-[350px]"
            >
              {inputTextTag
                ? tags.find((tag) => tag === inputTextTag)
                : "Search by tag..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[var(--radix-popover-trigger-width)] sm:w-[350px] p-0" side="bottom" align="start" avoidCollisions={false}>
            <Command className="max-h-[200px] sm:max-h-[400px]">
              <CommandInput placeholder="Search tag..." />
              <CommandEmpty>No tag found.</CommandEmpty>
              <CommandGroup className="max-h-[160px] sm:max-h-[320px] overflow-auto">
                {tags.map((tag) => (
                  <CommandItem
                    key={tag}
                    value={tag}
                    onSelect={(currentValue) => {
                      setInputTextTag(currentValue === inputTextTag ? "" : currentValue)
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        inputTextTag === tag ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {tag}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

        <LimitSelector defaultLimit={defaultLimit} />
      </div>

      <ScrollArea className="[&>[data-radix-scroll-area-viewport]]:max-h-[500px] px-2">
        <QuizFileList pathInfos={filteredQuizPathInfos} currentPath={[]} />
      </ScrollArea>
    </div>
  )
}

