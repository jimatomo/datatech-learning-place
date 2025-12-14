import { queryQuizResults } from '@/app/harvor/lib/query-quiz-results';
import { ChartAnswerdCount } from '@/app/harvor/ui/chart-answerd-count';
import { QuizFileList } from '@/app/quiz/ui/quiz-file-list';
import BadgeList from '@/app/harvor/ui/badge_list';

export default async function QuizDashboard() {
  // クイズの最新の結果を取得（全クイズ情報を含む）
  const quizResults = await queryQuizResults();

  // 全問題の数を取得
  const quizCount = quizResults.length;

  // 正解数を取得
  const correctCount = quizResults.filter(result => result.is_correct).length;

  // 未正解のクイズを取得（1件）
  const not_correct_quizzes = quizResults.filter(result => !result.is_correct).slice(0, 1);

  // 最新のクイズを取得（queryQuizResultsで取得済みのデータを再利用）
  // 日付でソートして最新の1件を取得
  const latest_quizzes_path_info_sorted_limited = [...quizResults]
    .sort((a, b) => {
      if (!a.created_at || !b.created_at) return 0;
      return b.created_at.getTime() - a.created_at.getTime();
    })
    .slice(0, 1);

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 pt-2 pb-4">
        <div>
          <ChartAnswerdCount
            answered_count={Number(correctCount)}
            not_answered_count={Number(quizCount - correctCount)}
          />
        </div>
        <BadgeList correctAnswers={Number(correctCount)} />
      </div>
      <div>
        <h4 className="scroll-m-20 font-semibold tracking-tight">
          最新のクイズ
        </h4>
        <QuizFileList pathInfos={latest_quizzes_path_info_sorted_limited} currentPath={[]} />
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
