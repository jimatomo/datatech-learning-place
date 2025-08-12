import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';
import { queryLikedQuizzes } from '@/app/harvor/lib/query-liked-quizzes';
import { getQuizFiles } from '@/app/quiz/lib/get-files';
import { getPathInfos } from '@/app/quiz/lib/get-path-info';
import { QuizFileList } from '@/app/quiz/ui/quiz-file-list';
import path from 'path';

export default async function SelfQuizPage() {
  // ユーザー認証チェック
  const session = await getSession();
  if (!session?.user?.sub) {
    redirect('/api/auth/login');
  }

  const userId = session.user.sub;

  // いいねしたクイズの一覧を取得
  const likedQuizzes = await queryLikedQuizzes(userId);

  // いいねしたクイズのIDリストを作成
  const likedQuizIds = likedQuizzes.map(item => item.quiz_id);

  if (likedQuizIds.length === 0) {
    return (
      <div>
        <h2 className="scroll-m-20 pb-2 text-lg font-bold tracking-tight">
          セルフ問題集
        </h2>
        <p className="text-muted-foreground mb-4">
          自分専用の問題集を作成・管理できます。
        </p>
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">いいねしたクイズ</h3>
          <p className="text-sm text-muted-foreground">
            まだいいねしたクイズがありません。クイズにいいねをして、お気に入りのクイズを保存しましょう。
          </p>
        </div>
      </div>
    );
  }

  // クイズファイルを取得
  const quiz_dir = path.join(process.cwd(), 'contents', 'quiz');
  const allQuizFiles = await getQuizFiles({ dir: quiz_dir });

  // いいねしたクイズのファイルパスを特定
  const likedQuizFiles = allQuizFiles.filter(file => {
    // ファイルパスからクイズIDを生成して比較
    const relativePath = file.replace(quiz_dir + '/', '').replace('.tsx', '');
    // YYYY/MM/DD形式をQYYYYMMDD形式に変換
    const quizId = 'Q' + relativePath.replace(/\//g, '');
    return likedQuizIds.includes(quizId);
  });

  // パス情報を取得
  const pathInfos = await getPathInfos(likedQuizFiles, [], true, userId);

  // いいねした日時でソート（最新順）
  const sortedPathInfos = pathInfos.sort((a, b) => {
    // pathからクイズIDを生成
    const aQuizId = a.path ? 'Q' + a.path.replace(/\//g, '') : '';
    const bQuizId = b.path ? 'Q' + b.path.replace(/\//g, '') : '';
    
    const aLikedQuiz = likedQuizzes.find(quiz => quiz.quiz_id === aQuizId);
    const bLikedQuiz = likedQuizzes.find(quiz => quiz.quiz_id === bQuizId);
    
    if (!aLikedQuiz?.updated_at || !bLikedQuiz?.updated_at) return 0;
    return new Date(bLikedQuiz.updated_at).getTime() - new Date(aLikedQuiz.updated_at).getTime();
  });

  return (
    <div>
      <h2 className="scroll-m-20 pb-2 text-lg font-bold tracking-tight">
        セルフ問題集
      </h2>
      <p className="text-sm text-muted-foreground pb-4">
        自分専用の問題集を作成・管理できます。
      </p>

      <div className="border rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">いいねしたクイズ</h3>
          <span className="text-sm text-muted-foreground">{likedQuizIds.length}問</span>
        </div>

        <div className="px-2">
          <QuizFileList pathInfos={sortedPathInfos} currentPath={[]} />
        </div>
      </div>
    </div>
  );
}
