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
  tryKey?: number;
}

export function QuizCheckboxGroup({ 
  options, 
  maxSelections, 
  onSelect, 
  selectedValues, //初期化する際に選択しておく値（リセット用に用意しておく）
  tryKey = 0
}: QuizCheckboxGroupProps) {
  // 選択した値を管理 
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(selectedValues)
  // ランダムに並び替えた選択肢を管理
  const [randomizedOptions, setRandomizedOptions] = useState<[string, string][]>([])

  // 選択肢をランダムに並び替える処理（0~1の乱数を生成して、0.5より小さい場合は前に、大きい場合は後ろに並び替える）
  useEffect(() => {
    setRandomizedOptions(Object.entries(options).sort(() => Math.random() - 0.5))
  }, [options, tryKey])

  // 選択肢を選択する処理
  const handleCheckboxChange = (key: number) => {
    setSelectedAnswers(prev => {
      // すでに選択されている場合は削除
      if (prev.includes(key)) {
        const newAnswers = prev.filter(item => item !== key);
        onSelect(newAnswers);
        return newAnswers;
      }
      
      // 最大選択数に達している場合は現状を維持
      if (maxSelections && prev.length >= maxSelections) {
        return prev;
      }

      // 新しい値を追加
      const newAnswers = [...prev, key];
      onSelect(newAnswers);
      return newAnswers;
    });
  }

  return (
    <div className="flex flex-col gap-3 w-full max-w-lg">
      {randomizedOptions.map(([key, value]) => (
        <div
          key={`options-${key}`}
          onClick={() => handleCheckboxChange(Number(key))}
          className={cn(
            "flex items-center gap-2 h-auto p-3 w-full",
            "border border-input rounded-md",
            "hover:bg-accent hover:text-accent-foreground",
            "cursor-pointer",
            selectedAnswers.includes(Number(key)) && "bg-secondary/50"
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
