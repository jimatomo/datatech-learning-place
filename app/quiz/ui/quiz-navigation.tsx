import path from 'path'
import { getAllQuizFiles } from '@/app/quiz/lib/get-files'

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

export async function QuizNavigation({ previousQuizUrl, nextQuizUrl, folderId }: QuizNavigationProps) {
  // folderIdがundefinedでないことを確認
  const parent_path = folderId.split('/').slice(0, -1).join('/');
  
  // previousQuizUrlかnextQuizUrlが#の場合は、全てのクイズのパスを取得して前後のファイルを取得する
  if (previousQuizUrl === '#' || nextQuizUrl === '#') {
    // クイズディレクトリのパスを取得
    const quizDir = path.join(process.cwd(), 'contents', 'quiz')
    // クイズディレクトリ内の全てのクイズファイルを取得
    const quizFiles = await getAllQuizFiles(quizDir)

    // 自分のファイルのindexを取得
    const currentIndex = quizFiles.findIndex(file => file === folderId)
    // インデックスが最初でない場合は前のファイルの情報を取得
    if (currentIndex > 0 && previousQuizUrl === '#') {
      previousQuizUrl = `/quiz/${quizFiles[currentIndex - 1]}`
    }
    // インデックスが最後でない場合は次のファイルの情報を取得
    if (currentIndex < quizFiles.length - 1 && nextQuizUrl === '#') {
      nextQuizUrl = `/quiz/${quizFiles[currentIndex + 1]}`
    }
  }

  return (
    <div className="w-full max-w-lg flex flex-row justify-between items-center">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              {(!previousQuizUrl || previousQuizUrl === '#') ? (
                <Button variant="ghost" disabled>
                  <p>前の問題</p>
                </Button>
              ) : (
                <Link href={previousQuizUrl}>
                  <Button variant="ghost">
                    <p>前の問題</p>
                  </Button>
                </Link>
              )}
            </div>
          </TooltipTrigger>
          {(!previousQuizUrl || previousQuizUrl === '#') && (
            <TooltipContent>
              <p>記念すべき最初の問題です</p>
            </TooltipContent>
          )}
        </Tooltip>

        <Link href={`/quiz/${parent_path}`}>
          <Button variant="ghost">
            <p>上に戻る</p>
          </Button>
        </Link>

        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              {(!nextQuizUrl || nextQuizUrl === '#') ? (
                <Button variant="ghost" disabled>
                  <p>次の問題</p>
                </Button>
              ) : (
                <Link href={nextQuizUrl}>
                  <Button variant="ghost">
                    <p>次の問題</p>
                  </Button>
                </Link>
              )}
            </div>
          </TooltipTrigger>
          {(!nextQuizUrl || nextQuizUrl === '#') && (
            <TooltipContent>
              <p>作成中...</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </div>
  );
} 
