import { Quiz, transformQuizIdToUrl } from "@/contents/quiz";
import { CircleHelp, AlertCircle } from "lucide-react"
import { QuizForm } from "@/app/quiz/ui/quiz-content-form"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { QuizNavigation } from "@/app/quiz/ui/quiz-content-navigation"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getSession } from '@auth0/nextjs-auth0';
import { QuizIcon } from '@/app/quiz/ui/quiz-icon';
import { QuizWidgets } from '@/app/quiz/ui/quiz-widgets';
import { Suspense } from 'react';
import { QuizReferences } from '@/app/quiz/ui/quiz-references';
import { QuizMetadata } from "@/app/quiz/ui/quiz-metadata";

// 新しいコンポーネントを追加
async function UserDependentContent({ quiz }: { quiz: Quiz }) {
  const user = await getSession();
  const userId = user?.user?.sub;

  return (
    <>
      <Suspense fallback={<CircleHelp className="my-5 w-full" size={40}/>}>
        <QuizIcon quiz={quiz} userId={userId} />
      </Suspense>

      {/* クイズの問題文エリア */}
      <div className="w-full max-w-xl">
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

      <QuizForm
        options={quiz.getOptions()}
        answers={quiz.getAnswers()}
        quizId={quiz.getId()}
        userId={userId}
      />
    </>
  );
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

  // 自分のURLを生成
  const selfQuizUrl = transformQuizIdToUrl(quiz.getId());

  // 前のクイズと次のクイズのURLを取得
  const previousQuizUrl = transformQuizIdToUrl(quiz.getPreviousQuizId());
  const nextQuizUrl = transformQuizIdToUrl(quiz.getNextQuizId());

  const references = quiz.getReferences();

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
          <QuizMetadata quiz={quiz} createdAt={createdAt} updatedAt={updatedAt} />
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

        {/* ユーザー依存のコンテンツを Suspense でラップ */}
        <Suspense fallback={<div>Loading user content...</div>}>
          <UserDependentContent quiz={quiz} />
        </Suspense>

        {/* 参考文献 */}
        <Suspense fallback={<div>loading References...</div>}>
          <QuizReferences references={references} />
        </Suspense>

        {/* ウィジェット部分を Suspense でラップ */}
        <Suspense>
          <QuizWidgets quiz={quiz} selfQuizUrl={selfQuizUrl} />
        </Suspense>

        {/* QuizNavigationコンポーネントを使用 */}
        <QuizNavigation previousQuizUrl={previousQuizUrl} nextQuizUrl={nextQuizUrl} folderId={folderId} />

      </div>
    </div>
  );
}
