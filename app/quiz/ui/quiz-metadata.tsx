import { Badge } from "@/components/ui/badge";
import { Calendar, User, File, ChartPie } from "lucide-react";
import { getInitialCorrectRate } from "@/app/quiz/lib/get-initial-correct-rate";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface QuizMetadataProps {
  quiz: {
    getTags: () => string[];
    getAuthorUrl: () => string | null;
    getAuthor: () => string;
    getFilePath: () => string;
    getId: () => string;
  };
  createdAt: string;
  updatedAt: string;
}

export async function QuizMetadata({ quiz, createdAt, updatedAt }: QuizMetadataProps) {
  const authorUrl = quiz.getAuthorUrl() ?? undefined;
  const initialCorrectRate = await getInitialCorrectRate(quiz.getId());

  const firstCorrectRate = Math.round((initialCorrectRate?.Item?.first_correct_rate ?? 0) * 1000) / 10;
  const answeredCount = initialCorrectRate?.Item?.answered_count;
  const updateAt = initialCorrectRate?.Item?.update_at ? 
    new Date(initialCorrectRate.Item.update_at)
      .toLocaleString('ja-JP', { 
        timeZone: 'Asia/Tokyo',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
      .replace(/\//g, '.') : undefined;

  return (
    <div className="flex flex-col w-full gap-2 py-2">
      {/* タグ */}
      <div className="flex flex-row flex-wrap gap-2">
        {quiz.getTags().map((tag, index) => (
          <Badge key={`tag-${index}`} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>

      {/* 作成日と更新日 */}
      <div className="w-full flex flex-row justify-start text-sm text-muted-foreground">
        <Calendar className="w-4 h-4 mr-1" />
        {createdAt}{createdAt !== updatedAt && ` (updated: ${updatedAt})`}
      </div>

      {/* 作成者とファイルパス */}
      <div className="w-full flex flex-row flex-wrap justify-start text-sm text-muted-foreground gap-2">
        <span className="flex items-center">
          <User className="w-4 h-4 mr-1" />
          {authorUrl ? (
            <a href={authorUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
              {quiz.getAuthor()}
            </a>
          ) : (
            <span>{quiz.getAuthor()}</span>
          )}
        </span>
        <span className="flex items-center break-all">
          <File className="w-4 h-4 mr-1 flex-shrink-0" />
          <a href={`https://github.com/jimatomo/dtsb-learning-place/blob/main/${quiz.getFilePath()}`} target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
            {quiz.getFilePath()}
          </a>
        </span>
      </div>

      {/* 初回正答率 */}
      <div className="w-full flex flex-row flex-wrap justify-start text-sm text-muted-foreground gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <span className="flex items-center">
                <ChartPie className="w-4 h-4 mr-1 cursor-default" />
                <span className="cursor-default">
                  {firstCorrectRate ? `${firstCorrectRate}% (${answeredCount}) ${updateAt}` : 'データがまだありません'}
                </span>
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>初回正答率% (回答者数) 集計日時</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
} 
