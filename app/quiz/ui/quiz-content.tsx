import { Quiz, transformQuizIdToUrl } from "@/contents/quiz";
import Image from "next/image";
import { CircleHelp, Calendar, AlertCircle, BookOpen, User, File } from "lucide-react"
import { QuizForm } from "./quiz-form"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { QuizNavigation } from "@/app/quiz/ui/quiz-navigation"

// QuizContents コンポーネント
// クイズの内容をレンダリングする
export function QuizContent({ quiz, folderId }: { quiz: Quiz, folderId: string }) {
  const createdAt = quiz.getCreatedAt().toLocaleDateString('ja-JP', 
    { year: 'numeric', month: '2-digit', day: '2-digit' }
  ).split('/').join('.');
  const updatedAt = quiz.getUpdatedAt().toLocaleDateString('ja-JP', 
    { year: 'numeric', month: '2-digit', day: '2-digit' }
  ).split('/').join('.');

  const previousQuizUrl = transformQuizIdToUrl(quiz.getPreviousQuizId());
  const nextQuizUrl = transformQuizIdToUrl(quiz.getNextQuizId());

  return (
    <div>
      <div className="py-5 flex flex-col items-center w-full max-w-2xl mx-auto">
        <h2 className="scroll-m-20 border-b pb-2
          first:mt-0 whitespace-pre-wrap break-words
          text-lg font-semibold tracking-tight
          "
        >
          {quiz.getTitle()} [{quiz.getId()}]
        </h2>

        {/* メタデータエリア */}
        <div className="flex flex-row flex-wrap justify-start w-full max-w-2xl gap-2 py-2 sm:max-h-none max-h-[130px] overflow-y-auto">
          {/* タグ */}
          {quiz.getTags().map((tag, index) => (
            <Badge key={`tag-${index}`} variant="secondary">
              {tag}
            </Badge>
          ))}

          {/* 作成日と更新日 */}
          <div className="w-full max-w-2xl flex flex-row justify-start text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 mr-1" />
            {createdAt}{createdAt !== updatedAt && ` (updated: ${updatedAt})`}
          </div>

          {/* 作成者とファイルパス */}
          <div className="w-full max-w-2xl flex flex-row justify-start text-sm text-muted-foreground">
            <User className="w-4 h-4 mr-1" />
            {/* 作成者のURLがある場合はリンクを表示し、なければ名前のみ表示 */}
            {quiz.getAuthorUrl() ? (
              <a href={quiz.getAuthorUrl()} target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
                {quiz.getAuthor()}
              </a>
            ) : (
              <span>{quiz.getAuthor()}</span>
            )}
            <span className="ml-2 flex flex-row items-center">
              <File className="w-4 h-4 mr-1" />
              <a href={`https://github.com/jimatomo/dtsb-learning-place/blob/main/${quiz.getFilePath()}`} target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
                {quiz.getFilePath()}
              </a>
            </span>
          </div>
        </div>

        {/* 最終更新から1年経過したら警告を表示 */}
        {updatedAt && new Date(updatedAt) < new Date(new Date().setFullYear(new Date().getFullYear() - 1)) && (
          <Alert className="m-4 bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              このクイズは更新されてから1年以上経過しています。情報が古い可能性がありますので、ご注意ください。
            </AlertDescription>
          </Alert>
        )}

        {/* クイズの問題文エリア */}
        <div className="w-full max-w-xl">
          <CircleHelp className="mt-5 mb-2 w-full" size={40}/>
          <p className="text-center mb-5">
            {quiz.getQuestion()}
          </p>
          {quiz.getImages().map((image, index) => (
            <Image key={`image-${index}`} src={image} alt={`Image ${index + 1}`} width={100} height={100} />
          ))}
        </div>

        {/* クライアントサイドのフォームコンポーネント */}
        <QuizForm
          options={quiz.getOptions()}
          answers={quiz.getAnswers()}
          explanation={quiz.getExplanation()}
          id={quiz.getId()}
        />

        {/* 参考文献 */}
        <Accordion type="single" collapsible className="w-full max-w-lg px-4 py-10">
          <AccordionItem value={`references`}>
            <AccordionTrigger className="flex items-center">
              <BookOpen className="w-4 h-4 mr-2" />
              <span>参考文献</span>
            </AccordionTrigger>
            <AccordionContent>
              {quiz.getReferences().map((reference, index) => (
                <div key={`accordion-${index}`} className="text-center">
                  <a href={reference.url} target="_blank" rel="noopener noreferrer">
                    {reference.title}
                  </a>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* QuizNavigationコンポーネントを使用 */}
        <QuizNavigation previousQuizUrl={previousQuizUrl} nextQuizUrl={nextQuizUrl} folderId={folderId} />

      </div>
    </div>
  );
}
