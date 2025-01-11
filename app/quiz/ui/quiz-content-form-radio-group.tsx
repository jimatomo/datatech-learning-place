'use client'

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface QuizRadioGroupProps {
  options: { [key: number]: string };
  onSelect: (value: number) => void;
  selectedValue: number[] | null;
  tryKey?: number;
}

export function QuizRadioGroup({ 
  options, 
  onSelect, 
  selectedValue,
  tryKey = 0
}: QuizRadioGroupProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>(selectedValue?.[0]?.toString() ?? '')
  const [randomizedOptions, setRandomizedOptions] = useState<[string, string][]>([])

  useEffect(() => {
    setRandomizedOptions(Object.entries(options).sort(() => Math.random() - 0.5))
  }, [options, tryKey])

  const handleSelect = (value: string) => {
    setSelectedAnswer(value);
    onSelect(Number(value));
  };

  return (
    <RadioGroup value={selectedAnswer} onValueChange={handleSelect} className="flex flex-col gap-3 w-full max-w-lg">
      {randomizedOptions.map(([key, value]) => (
        <div
          key={key}
          className={cn(
            "flex items-center space-x-2 h-auto p-3 w-full border rounded-md",
            "hover:bg-accent hover:text-accent-foreground",
            selectedAnswer === key && "bg-secondary/50",
            "cursor-pointer"
          )}
          onClick={() => handleSelect(key)}
        >
          <RadioGroupItem value={key} id={key} className="ml-2" />
          <Label htmlFor={key} className="cursor-pointer whitespace-pre-wrap leading-tight sm:text-sm text-xs flex-1">
            {value}
          </Label>
        </div>
      ))}
    </RadioGroup>
  )
} 
