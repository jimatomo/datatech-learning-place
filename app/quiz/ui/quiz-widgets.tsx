import QuizLikeButton from '@/app/quiz/ui/quiz-like-button';
import { XShareButton } from '@/components/x-share-button';
import { Quiz } from "@/contents/quiz";

// ウィジェット用の新しいコンポーネント
export function QuizWidgets({ quiz, selfQuizUrl }: { quiz: Quiz, selfQuizUrl: string }) {
  return (
    <div className="flex flex-row w-full max-w-2xl items-center pb-4">
      <div className="flex-1" />
      <div className="flex-1 flex justify-center">
        <QuizLikeButton quizId={quiz.getId()} />
      </div>
      <div className="flex-1 flex justify-end">
        <XShareButton
          title={`${quiz.getTitle()} | DTLP Quiz`}
          url={`https://datatech-learning-place.com${selfQuizUrl}`} />
      </div>
    </div>
  );
}
