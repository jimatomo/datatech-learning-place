import path from 'path';
import { getQuizFiles } from '@/app/quiz/lib/get-files';
import { getPathInfos } from '@/app/quiz/lib/get-path-info';
import { getSession } from '@auth0/nextjs-auth0';

export async function queryQuizResults(
  limit_count: number = 1000
) {
  // クイズディレクトリのパスを取得
  const quiz_dir = path.join(process.cwd(), 'contents', 'quiz')

  // クイズの全体の数を取得
  const quizFiles = await getQuizFiles({ dir: quiz_dir, limit_count: limit_count });

  // ユーザー情報を取得
  const session = await getSession()
  const userId = session?.user?.sub

  // path infoを取得
  const pathInfos = await getPathInfos(quizFiles, [], true, userId);

  // 将来日付を除外
  const today = new Date()
  const quiz_results = pathInfos.filter(
    pathInfo => pathInfo.created_at?.getTime() && pathInfo.created_at.getTime() <= today.getTime()
  );

  return quiz_results;
}
