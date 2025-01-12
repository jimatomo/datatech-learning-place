import { Quiz, transformQuizIdToUrl } from "@/contents/quiz";
import { CircleHelp, Calendar, AlertCircle, BookOpen, User, File } from "lucide-react"
import { QuizForm } from "@/app/quiz/ui/quiz-content-form"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { QuizNavigation } from "@/app/quiz/ui/quiz-content-navigation"
import { ScrollArea } from "@/components/ui/scroll-area"
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card"
import { LinkCardWithoutLink } from "@/components/ui/link-card"
import { fetchOGPs, OgpObjects } from "@/components/actions/fetchOGPs"
import Link from "next/link"

type Reference = {
  title: string;
  url: string;
  ogps?: OgpObjects;
}

async function getReferenceOgps(references: Reference[]) {
  return Promise.all(references.map(async (reference: Reference) => {
    const res = await fetchOGPs(reference.url);
    return { ...reference, ogps: res.ogps };
  }));
}

// QuizContents コンポーネント
// クイズの内容をレンダリングする
export async function QuizContent({ quiz, folderId }: { quiz: Quiz, folderId: string }) {
  const createdAt = quiz.getCreatedAt().toLocaleDateString('ja-JP', 
    { year: 'numeric', month: '2-digit', day: '2-digit' }
  ).split('/').join('.');
  const updatedAt = quiz.getUpdatedAt().toLocaleDateString('ja-JP', 
    { year: 'numeric', month: '2-digit', day: '2-digit' }
  ).split('/').join('.');

  // 前のクイズと次のクイズのURLを取得
  const previousQuizUrl = transformQuizIdToUrl(quiz.getPreviousQuizId());
  const nextQuizUrl = transformQuizIdToUrl(quiz.getNextQuizId());

  const references = quiz.getReferences();
  const referenceOgps = await getReferenceOgps(references);

  return (
    <div>
      <div className="py-5 flex flex-col items-center w-full max-w-2xl mx-auto rounded-xl px-2 shadow-md bg-neutral-50 dark:bg-neutral-900">
        <h2 className="scroll-m-20 border-b pb-2
          first:mt-0 whitespace-pre-wrap break-words
          text-lg font-semibold tracking-tight
          "
        >
          {quiz.getTitle()} [{quiz.getId()}]
        </h2>

        {/* メタデータエリア */}
        <ScrollArea className="w-full [&>[data-radix-scroll-area-viewport]]:max-h-[130px]">
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
                {quiz.getAuthorUrl() ? (
                  <a href={quiz.getAuthorUrl()} target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
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
        </ScrollArea>

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
          <CircleHelp className="my-5 w-full" size={40}/>
          <div className="text-center mb-5">
            {/* 問題文が文字列かHTMLかJSXかで分岐 */}
            {quiz.getQuestion() ? (
              quiz.getQuestion()
            ) : quiz.getQuestionJsx() ? (
              quiz.getQuestionJsx()
            ) : (
              <p>問題文がありません</p>
            )}
          </div>
        </div>

        {/* クライアントサイドのフォームコンポーネント */}
        <QuizForm
          options={quiz.getOptions()}
          answers={quiz.getAnswers()}
          quizId={quiz.getId()}
        />

        {/* 参考文献 */}
        <Accordion type="single" collapsible className="w-full max-w-lg px-4 py-10">
          <AccordionItem value={`references`}>
            <AccordionTrigger className="flex items-center">
              <BookOpen className="w-4 h-4 mr-2" />
              <span>参考文献</span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col items-center w-full gap-2">
                {referenceOgps.map((reference: Reference, index: number) => (
                  <HoverCard key={`hover-${index}`}>
                    <HoverCardTrigger asChild>
                      <div className="w-fit">
                        <Link href={reference.url} rel="noopener noreferrer" target="_blank"
                        className="underline hover:text-primary text-muted-foreground">
                          {reference.title}
                        </Link>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-full">
                      <div className="flex justify-center">
                        <LinkCardWithoutLink url={reference.url} ogps={reference.ogps} />
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* QuizNavigationコンポーネントを使用 */}
        <QuizNavigation previousQuizUrl={previousQuizUrl} nextQuizUrl={nextQuizUrl} folderId={folderId} />

      </div>
    </div>
  );
}
