"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface QuizNavigationProps {
  previousQuizUrl: string;
  nextQuizUrl: string;
  folderId: string;
}

export function QuizNavigation({ previousQuizUrl, nextQuizUrl, folderId }: QuizNavigationProps) {
  // folderIdがundefinedでないことを確認
  const parent_path = folderId.split('/').slice(0, -1).join('/');

  return (
    <div className="w-full max-w-lg flex flex-row justify-between items-center">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={previousQuizUrl && previousQuizUrl !== '#' ? previousQuizUrl : '#'}>
              <Button variant="secondary" disabled={!previousQuizUrl || previousQuizUrl === '#'}>
                前の問題
              </Button>
            </Link>
          </TooltipTrigger>
          {(!previousQuizUrl || previousQuizUrl === '#') && (
            <TooltipContent>
              <p>前の問題はありません</p>
            </TooltipContent>
          )}
        </Tooltip>

        <Link href={`/quiz/${parent_path}`}>
          <Button variant="secondary">
            上に戻る
          </Button>
        </Link>

        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={nextQuizUrl && nextQuizUrl !== '#' ? nextQuizUrl : '#'}>
              <Button variant="secondary" disabled={!nextQuizUrl || nextQuizUrl === '#'}>
                次の問題
              </Button>
            </Link>
          </TooltipTrigger>
          {(!nextQuizUrl || nextQuizUrl === '#') && (
            <TooltipContent>
              <p>次の問題はありません</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </div>
  );
} 
