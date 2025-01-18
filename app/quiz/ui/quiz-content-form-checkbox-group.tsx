'use client'

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface QuizCheckboxGroupProps {
  options: { [key: number]: string };
  maxSelections: number;
  onSelect: (values: number[]) => void;
  selectedValues: number[];
  correctAnswers: number[];
  tryKey?: number;
}

export function QuizCheckboxGroup({ 
  options, 
  maxSelections, 
  onSelect, 
  selectedValues, //初期化する際に選択しておく値（リセット用に用意しておく）
  correctAnswers,
  tryKey = 0
}: QuizCheckboxGroupProps) {
  // 選択した値を管理 
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(selectedValues)
  // ランダムに並び替えた選択肢を管理
  const [randomizedOptions, setRandomizedOptions] = useState<[string, string][]>([])

  // 選択肢をランダムに並び替える処理（0~1の乱数を生成して、0.5より小さい場合は前に、大きい場合は後ろに並び替える）
  useEffect(() => {
    setRandomizedOptions(Object.entries(options).sort(() => Math.random() - 0.5))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tryKey])

  // selectedValues が変更された時に状態を更新
  useEffect(() => {
    setSelectedAnswers(selectedValues);
  }, [selectedValues]);

  // 選択肢を選択する処理
  const handleCheckboxChange = (key: number) => {
    const newSelectedAnswers = selectedAnswers.includes(key)
      ? selectedAnswers.filter(item => item !== key)
      : maxSelections && selectedAnswers.length >= maxSelections
        ? selectedAnswers
        : [...selectedAnswers, key];
    
    setSelectedAnswers(newSelectedAnswers);
    onSelect(newSelectedAnswers);
  }

  return (
    <div className="flex flex-col gap-3 w-full max-w-lg">
      {randomizedOptions.map(([key, value]) => (
        <div
          key={`options-${key}`}
          onClick={() => handleCheckboxChange(Number(key))}
          className={cn(
            "flex items-center gap-2 h-auto p-3 w-full",
            "border border-input rounded-md shadow-md",
            "hover:bg-accent hover:text-accent-foreground",
            "cursor-pointer",
            selectedAnswers.includes(Number(key)) && "bg-secondary/50 shadow-none",
            correctAnswers.includes(Number(key)) && "bg-emerald-100 dark:bg-emerald-950 hover:bg-emerald-200 dark:hover:bg-emerald-900",
          )}
        >
          <Checkbox
            id={`checkbox-${key}`}
            checked={selectedAnswers.includes(Number(key))}
            onCheckedChange={() => handleCheckboxChange(Number(key))}
          />
          <Label htmlFor={`checkbox-label-${key}`} className="cursor-pointer whitespace-pre-wrap leading-tight sm:text-sm text-xs flex-1">{value}</Label>
        </div>
      ))}
    </div>
  )
} 
