import path from 'path';
import { getQuizFiles } from '@/app/quiz/lib/get-files';
import { getPathInfos } from '@/app/quiz/lib/get-path-info';
import { auth0 } from '@/lib/auth0'
import { filterFutureDates } from '@/lib/date-utils';

export async function queryQuizResults(
  limit_count: number = 1000
) {
  // クイズディレクトリのパスを取得
  const quiz_dir = path.join(process.cwd(), 'contents', 'quiz')

  // クイズの全体の数を取得
  const quizFiles = await getQuizFiles({ dir: quiz_dir, limit_count: limit_count });

  // ユーザー情報を取得
  const session = await auth0.getSession()
  const userId = session?.user?.sub

  // path infoを取得
  const pathInfos = await getPathInfos(quizFiles, [], true, userId);

  // 将来日付を除外（JST基準で判定）
  const quiz_results = filterFutureDates(pathInfos);

  return quiz_results;
}
