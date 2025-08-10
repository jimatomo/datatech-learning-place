import { Quiz } from "@/contents/quiz";
import { QuizWidgetsClient } from "@/app/quiz/ui/quiz-widgets.client";

// Server Wrapper: Classインスタンスを直渡しせず、プリミティブに変換してClientへ
export function QuizWidgets({ quiz, selfQuizUrl }: { quiz: Quiz, selfQuizUrl: string }) {
  const quizId = quiz.getId();
  const quizTitle = quiz.getTitle();
  return (
    <QuizWidgetsClient
      quizId={quizId}
      quizTitle={quizTitle}
      selfQuizUrl={selfQuizUrl}
    />
  );
}
