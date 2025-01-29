import { queryQuizResults } from '@/app/harvor/lib/query-quiz-results';
import { ChartAnswerdCount } from '@/app/harvor/ui/chart-answerd-count';
import { QuizFileList } from '@/app/quiz/ui/quiz-file-list';

export default async function QuizDashboard() {
  // クイズの最新の結果を取得
  const quizResults = await queryQuizResults();

  // 全問題の数を取得
  const quizCount = quizResults.length;

  // 正解数を取得
  const correctCount = quizResults.filter(result => result.is_correct).length;

  // 未正解のクイズを取得（3件）
  const not_correct_quizzes = quizResults.filter(result => !result.is_correct).slice(0, 1);

  return (
    <div>
      <div className="flex flex-col gap-4 pt-2 pb-4">
        <ChartAnswerdCount
          answered_count={Number(correctCount)}
        not_answered_count={Number(quizCount - correctCount)}
        />
      </div>
      <div>
        <h4 className="scroll-m-20 font-semibold tracking-tight">
          未チャレンジのクイズを Pick Up
        </h4>
        <QuizFileList pathInfos={not_correct_quizzes} currentPath={[]} />
      </div>
    </div>
  );
}
