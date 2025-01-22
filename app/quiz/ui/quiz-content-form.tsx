'use client';

import { useState } from 'react';
import { QuizRadioGroup } from "@/app/quiz/ui/quiz-content-form-radio-group";
import { QuizCheckboxGroup } from "@/app/quiz/ui/quiz-content-form-checkbox-group";
import { QuizResult } from "@/app/quiz/ui/quiz-content-form-result";

export interface QuizFormProps {
  options: { [key: number]: string };
  answers: number[];
  quizId: string;
}

export function QuizForm({ options, answers, quizId }: QuizFormProps) {
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [key, setKey] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState<number[]>([]);
  const handleSelect = (values: number | number[]) => {
    if (Array.isArray(values)) {
      setSelectedOptions(values);
    } else {
      setSelectedOptions([values]);
    }
  };

  const handleMarkAnswer = (correctAnswers: number[]) => {
    setCorrectAnswers(correctAnswers);
  };

  const handleReset = () => {
    setSelectedOptions([]);
    setCorrectAnswers([]);
    setKey(prev => prev + 1);
  };

  return (
    <div role="form" className="w-full max-w-xl">
      <div className="py-4 flex flex-col items-center">
        {answers.length === 1 ? (
          <QuizRadioGroup 
            key={key}
            options={options} 
            onSelect={(value) => handleSelect(Number(value))}
            selectedValue={selectedOptions}
            correctAnswers={correctAnswers}
          />
        ) : (
          <QuizCheckboxGroup 
            key={key}
            options={options} 
            maxSelections={answers.length}
            onSelect={(values) => handleSelect(values.map(Number))}
            selectedValues={selectedOptions}
            correctAnswers={correctAnswers}
          />
        )}
        <p className="text-sm text-muted-foreground my-4 w-full max-w-lg text-right">
          (select {answers.length} option{answers.length > 1 ? 's' : ''})
        </p>
      </div>
      <QuizResult
        quizId={quizId}
        answer_count={answers.length}
        selectedOptions={selectedOptions}
        onReset={handleReset}
        onMarkAnswer={handleMarkAnswer}
      />
    </div>
  );
} 
