import { Badge } from "@/components/ui/badge";
import { Calendar, User, File } from "lucide-react";

interface QuizMetadataProps {
  quiz: {
    getTags: () => string[];
    getAuthorUrl: () => string | null;
    getAuthor: () => string;
    getFilePath: () => string;
  };
  createdAt: string;
  updatedAt: string;
}

export function QuizMetadata({ quiz, createdAt, updatedAt }: QuizMetadataProps) {
  const authorUrl = quiz.getAuthorUrl() ?? undefined;

  return (
    <div className="flex flex-col w-full max-w-2xl gap-2 py-2">
      {/* タグ */}
      <div className="flex flex-row flex-wrap gap-2">
        {quiz.getTags().map((tag, index) => (
          <Badge key={`tag-${index}`} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>

      {/* 作成日と更新日 */}
      <div className="w-full max-w-2xl flex flex-row justify-start text-sm text-muted-foreground">
        <Calendar className="w-4 h-4 mr-1" />
        {createdAt}{createdAt !== updatedAt && ` (updated: ${updatedAt})`}
      </div>

      {/* 作成者とファイルパス */}
      <div className="w-full max-w-2xl flex flex-row flex-wrap justify-start text-sm text-muted-foreground gap-2">
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
    </div>
  );
} 
