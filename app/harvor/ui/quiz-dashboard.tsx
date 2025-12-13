import { queryQuizResults } from '@/app/harvor/lib/query-quiz-results';
import { ChartAnswerdCount } from '@/app/harvor/ui/chart-answerd-count';
import { QuizFileList } from '@/app/quiz/ui/quiz-file-list';
import { getQuizFiles } from '@/app/quiz/lib/get-files';
import { getPathInfos } from '@/app/quiz/lib/get-path-info';
import BadgeList from '@/app/harvor/ui/badge_list';
import { auth0 } from '@/lib/auth0'
import { filterFutureDates } from '@/lib/date-utils';

export default async function QuizDashboard() {
  // クイズの最新の結果を取得
  const quizResults = await queryQuizResults();

  // 全問題の数を取得
  const quizCount = quizResults.length;

  // 正解数を取得
  const correctCount = quizResults.filter(result => result.is_correct).length;

  // 未正解のクイズを取得（3件）
  const not_correct_quizzes = quizResults.filter(result => !result.is_correct).slice(0, 1);

  // 最新のクイズを取得
  const latest_quizzes = await getQuizFiles({ dir: 'contents/quiz', limit_count: 7 });
  const session = await auth0.getSession();
  const userId = session?.user?.sub;
  const latest_quizzes_path_info = await getPathInfos(latest_quizzes, [], true, userId);
  // 将来日付のクイズを除外（JST基準で判定）
  const latest_quizzes_filtered = filterFutureDates(latest_quizzes_path_info);
  // 最新の日付だけに絞る
  const latest_quizzes_path_info_sorted = latest_quizzes_filtered.sort((a, b) => {
    if (!a.created_at || !b.created_at) return 0;
    return b.created_at.getTime() - a.created_at.getTime();
  });
  const latest_quizzes_path_info_sorted_limited = latest_quizzes_path_info_sorted.slice(0, 1);

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
