import { queryQuizResults } from '@/app/harvor/lib/query-quiz-results';
import { ChartAnswerdCount } from '@/app/harvor/ui/chart-answerd-count';

export default async function QuizDashboard() {
  // クイズの最新の結果を取得
  const quizResults = await queryQuizResults();

  // 全問題の数を取得
  const quizCount = quizResults.length;

  // 正解数を取得
  const correctCount = quizResults.filter(result => result.is_correct).length;

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <ChartAnswerdCount
        answered_count={Number(correctCount)}
        not_answered_count={Number(quizCount - correctCount)}
      />
    </div>
  );
}
